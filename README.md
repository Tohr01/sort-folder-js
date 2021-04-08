# Info
Sorts files with suffixes (declared in config.json) to declared folders

# OS
1. macOS (Tested)
2. Linux

# Requirements

1. Node-js
2. sort-folder.js has to be in the same folder as the config.json and package.json file

# Execution
1. Fire up terminal
2. Change directory to ~/sort-folder-js/src
```
cd [Path to directory src]
```
3. Execute script
```
node sort-folder.js [Path to directory]
```

# Config
1. Open config.json
2. In the "folder" object add a key (e.g. test) and the fitting file extentions (e.g. ["jpg"]) 