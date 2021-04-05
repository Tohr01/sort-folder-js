var config = require('./config.json');
const fs = require('fs');

var args = process.argv.slice(2);
if (args.length === 0) {
    console.log('No argument given.');
    process.exitCode = 1;
} else {
    var path = args[0];

    if (fs.existsSync(path)) {
        console.log('Path exists');
        var folder
        for (var attr in config.folder) {
            console.log(attr);
        }
    } else {
        console.log('Path does not exist');
        process.exitCode = 1;
    }
}