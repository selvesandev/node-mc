const fs = require('fs');
const files = fs.readdirSync('./');//list of all the files in current directry.
console.log(files);


//Synchronous
fs.readdir('./', function (err, files) {
    console.log(files);
    //only one of the value will have value if there is a error the files will be null is there is not the err will be null
});