// program to read contents of a text file using fs
const fs = require('fs');

fs.readFile('a.txt', 'utf8', (err, data) => {
    if (err) {
        console.error(err);
        return;
    }
    console.log(data);
});