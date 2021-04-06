# Info
Sorts files with suffixes (declared in config.json) to declared folders

# OS
1. macOS (Tested) / Linux / Unix
2. Windows

# Requirements

1. Node-js
2. cleanup-folder.js has to be in the same folder as the config.json and package.json file
# Execution

```
node cleanup-folder.js [Path to directory]
```

# Config
1. Open config.json
2. In the "folder" object add a key (e.g. test) and the fitting file extentions (e.g. ["jpg"]) 