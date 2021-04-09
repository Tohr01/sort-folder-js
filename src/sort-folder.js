const config = require('./config.json');
const {
    existsSync,
    lstatSync,
    readdir,
    mkdir,
    renameSync
} = require('fs');
const {
    join,
    extname
} = require('path');

var folderList = new Array();

var args = process.argv.slice(2);
if (args.length === 0) {
    console.log('No argument given.');
    process.exitCode = 1;
} else {
    var fldrPath = args[0];

    if (existsSync(fldrPath)) {
        if (!lstatSync(fldrPath).isDirectory()) {
            console.log('Path is not a directory.');
            process.exitCode = 1;
        } else {
            initOthersFolder();
            const configFldr = Object.keys(config.folder);
            for (var i = 0; i < configFldr.length; i++) {
                const attr = configFldr[i];
                folderList.push(attr);
                if (existsSync(join(fldrPath, attr))) {
                    console.log('\x1b[35m%s\x1b[0m', `Folder '${attr}' exists at: '${fldrPath}'`);
                } else {
                    mkdir(join(fldrPath, attr), () => {
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
    readdir(targetFldr, (err, files) => {
        if (err) {
            console.log(err);
            process.exitCode = 1;
        }
        for (var i = 0; i < files.length; i++) {
            const filePath = join(targetFldr, files[i])
            if (lstatSync(filePath).isFile()) {
                const suffix = extname(files[i]).slice('1').toLowerCase();
                for (var a = 0; a < Object.keys(config.folder).length; a++) {
                    if (config.folder[Object.keys(config.folder)[a]].includes(suffix)) {
                        renameSync(filePath, join(targetFldr, Object.keys(config.folder)[a], files[i]));
                        break;
                    } else {
                        if (a === Object.keys(config.folder).length - 1) {
                            if (config.moveUndetectedFilesToFolder.enable && !config.moveUndetectedFilesToFolder.blacklist.includes(suffix)) {
                                renameSync(filePath, join(targetFldr, config.moveUndetectedFilesToFolder.nameOfFolder, files[i]));
                            }
                        }
                    }
                }
            } else if (lstatSync(filePath).isDirectory()) {
                if (config.moveUndetectedFilesToFolder.enable) {
                    if (config.moveUndetectedFilesToFolder.moveFolders) {
                        if (!(folderList.includes(files[i]))) {
                            if (!(files[i] === config.moveUndetectedFilesToFolder.nameOfFolder)) {
                                renameSync(filePath, join(targetFldr, config.moveUndetectedFilesToFolder.nameOfFolder, files[i]));
                            }
                        }
                    }
                }
            }
            if (i === files.length - 1) {
                console.log('\x1b[34m%s\x1b[0m', 'Operation finished');
            }
        }
    });
}

function initOthersFolder() {
    const undetectedFldrName = config.moveUndetectedFilesToFolder.nameOfFolder;
    if (config.moveUndetectedFilesToFolder.enable) {
        if (existsSync(join(fldrPath, undetectedFldrName))) {
            console.log('\x1b[35m%s\x1b[0m', `Folder '${undetectedFldrName}' exists at: '${fldrPath}'`);
        } else {
            mkdir(join(fldrPath, undetectedFldrName), () => {
                console.log('\x1b[32m%s\x1b[0m', `Folder '${undetectedFldrName}' created at: '${fldrPath}'`);
            });
        }
    }
}