const config = require('./config.json');
const fs = require('fs');
const path = require('path');

var args = process.argv.slice(2);
if (args.length === 0) {
    console.log('No argument given.');
    process.exitCode = 1;
} else {
    var fldrPath = args[0];

    if (fs.existsSync(fldrPath)) {
        if (!fs.lstatSync(fldrPath).isDirectory()) {
            console.log('Path is not a directory');
            process.exitCode = 1;
        } else {
            const configFldr = Object.keys(config.folder);
            for (var i = 0; i < configFldr.length; i++) {
                const attr = configFldr[i];
                if (fs.existsSync(path.join(fldrPath, attr))) {
                    console.log('\x1b[35m%s\x1b[0m', `Folder '${attr}' exists at: '${fldrPath}'`);
                } else {
                    fs.mkdir(path.join(fldrPath, attr), () => {
                        console.log('\x1b[32m%s\x1b[0m', `Folder '${attr}' created at: '${fldrPath}'`);
                    });
                }
                if (i === configFldr.length - 1) {
                    moveFiles(fldrPath);
                }
            }
        }
    } else {
        console.log('Path does not exist.');
        process.exitCode = 1;
    }
}

function moveFiles(targetFldr) {
    fs.readdir(targetFldr, (err, files) => {
        if (err) {
            console.log(err);
            process.exitCode = 1;
        }
        for (var i = 0; i < files.length; i++) {
            const filePath = path.join(targetFldr, files[i]);
            if (fs.lstatSync(filePath).isFile()) {
                const suffix = path.extname(files[i]).slice('1').toLowerCase();
                for (var a = 0; a < Object.keys(config.folder).length; a++) {
                    if (config.folder[Object.keys(config.folder)[a]].includes(suffix)) {
                        console.log(path.join(targetFldr, Object.keys(config.folder)[a]));
                        fs.renameSync(filePath, path.join(targetFldr, Object.keys(config.folder)[a], files[i]));
                    }
                }
            }
            if (i === files.length - 1) {
                console.log('\x1b[34m%s\x1b[0m', 'Operation finished');
            }
        }
    });
}
