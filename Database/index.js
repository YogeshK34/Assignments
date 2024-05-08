const express = require("express");
const mongoose = require("mongoose");
const app = express();

app.use(express.json());

mongoose.connect("mongodb+srv://khutwadyogesh34:VblYaNNri2LzK8JV@cluster0.z28rmbf.mongodb.net/")
const User = mongoose.model('Users', {
    name: String,
    email: String,
    password: String
});

app.post("/signup", async function (req, res) {
    const username = req.body.username;
    const password = req.body.password;
    const name = req.body.name;

    const existingUser = await User.findOne({ email: username });

    if (existingUser) {
        return res.status(400).send("Username already exists!");
    }

    const user = new User({
        name: name,
        email: username,
        password: password
    });

    await user.save();

    res.json({
        "message": "User created successfully"
    });
});


app.listen(3001, () => {
    console.log("Server is running on port 3001");
});

