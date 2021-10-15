var webpack = require('webpack');

module.exports = {
    context: __dirname,
    devtool: "source-map",
    entry: "./src/js/index.js",
    output: {
        path: __dirname + "/dist",
        filename: "bundle.js"
    }
}