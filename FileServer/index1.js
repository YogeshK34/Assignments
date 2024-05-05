const fs = require('fs');
const express = require('express');
const path = require('path');

// creating an instance of express
const app = express();

//to read the contents of the file directory
app.get("/files", function (req, res) {
    // join the path segment into a single path
    const directoryPath = path.join(__dirname, 'files');
    //to read the directory
    fs.readdir(directoryPath, function (err, files) {
        if (err) {
            console.error('Error reading directory:', err);
            res.status(500).send('Internal Server Error');
            return;
        }
        res.status(200).json(files);
    });
})


// to create a GET request to read the contents of a given file

app.get('/files/:filename', (req, res) => {
    const fileName = req.params.filename;
    const filePath = path.join(__dirname, 'files', fileName);
    fs.readFile(filePath, 'utf8', function(err, data) {
        if (err) {
            console.error('Error reading file:', err);
            res.status(404).send('File not found');
            return;
        }
        res.status(200).send(data);
    });
});

app.use((req, res) => {
    res.status(404).send('Not Found');
});

// create a app.listen to run the above code on a port
app.listen(3000, function () {
    console.log("Server is running on port 3000");
})  
