const express = require("express");
const fs = require('fs');
const app = express();
const path = require ("path");

app.get('/files', (req, res) => {
    const directoryPath = path.join(__dirname, 'files');
    fs.readdir(directoryPath, (err, files) => {
        if (err) {
            console.error('Error reading directory:', err);
            res.status(500).send('Internal Server Error');
            return;
        }
        res.json(files);
    });
});

app.listen(3001, function () {
    console.log("Server is running on port 3001");
});
