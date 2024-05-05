const fs = require('fs');
const express = require('express');
const path = require('path');

const app = express();

// Serve static files in the 'files' directory
app.use('/files', express.static(path.join(__dirname, 'files')));

// Read the contents of the file directory
app.get("/files", function (req, res) {
    const directoryPath = path.join(__dirname, 'files');
    fs.readdir(directoryPath, function (err, files) {
        if (err) {
            console.error('Error reading directory:', err);
            res.status(500).send('Internal Server Error');
            return;
        }
        res.status(200).json(files);
    });
});

// Serve individual files including images
app.get('/files/:filename', (req, res) => {
    const fileName = req.params.filename;
    const filePath = path.join(__dirname, 'files', fileName);
    fs.readFile(filePath, (err, data) => {
        if (err) {
            console.error('Error reading file:', err);
            res.status(404).send('File not found');
            return;
        }
        // Set the correct content type based on the file extension
        const contentType = getContentType(fileName);
        res.set('Content-Type', contentType);
        res.status(200).send(data);
    });
});

function getContentType(fileName) {
    const ext = path.extname(fileName);
    switch (ext) {
        case '.png':
            return 'image/png';
        case '.jpg':
        case '.jpeg':
            return 'image/jpeg';
        case '.gif':
            return 'image/gif';
        default:
            return 'application/octet-stream';
    }
}

app.use((req, res) => {
    res.status(404).send('Not Found');
});

app.listen(3000, () => {
    console.log("Server is running on port 3000");
});
