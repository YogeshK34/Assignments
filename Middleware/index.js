const express = require('express');
const app = express();

function userMiddleware(req, res, next) {
    const username = req.headers.username;
    const password = req.headers.password;
    if (username !== 'yogeshk34' || password !== '49238123') {
        res.status(404).json({
            message: "Invalid username or password"
        });
    } else {
        next();
    }
}

function kidneyMiddleware(req, res, next) {
    const kidneyID = req.query.kidneyID;
    if (kidneyID !== '1' && kidneyID !== '2') {
        res.status(404).json({
            message: "Invalid Input"
        });
    } else {
        next();
    }
}

app.use(userMiddleware, kidneyMiddleware)

app.get("/health-checkup", function(req, res) {
    res.send("You're heart is healthy");
});

app.get("/kidney-check", function(req, res) {
    res.send("Your kidney is healthy");
});

// app.use(userMiddleware)

// app.get("/heart-check", userMiddleware, function(req, res) {
//     res.send("You're heart is healthy");
// });

app.listen(3000, function() {
    console.log("Server is running on port 3000");
});
