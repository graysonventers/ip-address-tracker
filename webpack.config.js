const path = require('path');
module.exports = {
    "mode": "none",
    "entry": "./src/script.js",
    "output": {
        "path": __dirname + '/dist',
        "filename": "bundle.js"
    },
    devserver: {
        contentBase: path.join(__dirname, 'dist')
    }
}