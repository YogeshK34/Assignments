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


// to add a new user database
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


// to read the user database 
app.get("/users", async function (req, res) {
    try {
        const users = await User.find();
        res.json(users);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Server Error" });
    }
});

// to update a user
app.put("/users/:username", async function (req, res) {
    const username = req.params.username;
    const updatedFields = req.body;

    try {
        const user = await User.findOneAndUpdate({ email: username }, updatedFields, { new: true });
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        res.json(user);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Server Error" });
    }
});


//to delete a user
app.delete("/users/:username", async function (req, res) {
    const username = req.params.username;

    try {
        const user = await User.findOneAndDelete({ email: username });
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        res.json({ message: "User deleted successfully" });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Server Error" });
    }
});




app.listen(3001, () => {
    console.log("Server is running on port 3001");
});

