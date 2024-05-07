const express = require('express');
const app = express();
const zod = require('zod');

const userSchema = zod.object({
    username: zod.string().min(3), // Minimum 3 characters for username
    password: zod.string().min(6), // Minimum 6 characters for password
});

function userMiddleware(req, res, next) {
    const { username, password } = req.headers;
    const result = userSchema.safeParse({ username, password });
    if (result.success) {
        next();
    } else {
        res.status(404).json({ message: 'Invalid username or password' });
    }
}

app.use(userMiddleware);

app.get('/health-checkup', function(req, res) {
    res.send("You're heart is healthy");
});

app.get('/kidney-check', function(req, res) {
    res.send('Your kidney is healthy');
});

app.listen(3000, function() {
    console.log('Server is running on port 3000');
});
