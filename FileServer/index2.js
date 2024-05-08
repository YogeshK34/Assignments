const express = require("express");
const jwt = require("jsonwebtoken");
const jwtPassword = "123456";

const app = express();

app.use(express.json());

const ALL_USERS = [
    {
        username: "walter@gmail.com",
        password: "123",
        name: "walter white",
    },
    {
        username: "jesse@gmail.com",
        password: "123321",
        name: "jesse pinkman",
    },
    {
        username: "saul@gmail.com",
        password: "123321",
        name: "saul goodman",
    },
];

function userExists(username, password) {
    let userExists = false;
    for (let i = 0; i < ALL_USERS.length; i++) {
        if (ALL_USERS[i].username === username && ALL_USERS[i].password === password) {
            userExists = true;
            break; // Exit the loop early if user is found
        }
    }
    return userExists;
}

app.post("/signin", function (req, res) {
    const username = req.body.username;
    const password = req.body.password;

    if (!userExists(username, password)) {
        return res.status(403).json({
            msg: "User doesnt exist in our in memory db",
        });
    }

    var token = jwt.sign({ username: username }, "shhhhh");
    return res.json({
        token,
    });
});

app.get("/users", function (req, res) {
    const token = req.headers.authorization;
    try {
        const decoded = jwt.verify(token, jwtPassword);
        const username = decoded.username;
        const otherUsers = ALL_USERS.filter(user => user.username !== username);
        res.json({
            users: otherUsers
        });
    } catch (err) {
        return res.status(403).json({
            msg: "Invalid token",
        });
    }
});


app.listen(3000, () => {
    console.log("Server is running on port 3000");
});
base