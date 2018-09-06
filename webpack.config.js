const path = require('path');
const merge = require('webpack-merge');
const baseConfig = require('./webpack.base.js');

module.exports = merge(baseConfig, {
    mode:'development',
    output: {
        filename: "[name].js",
        path: path.resolve(__dirname, 'dist')
    },
    devtool:'source-map',
    watch: true,
    devServer: {
        contentBase: path.join(__dirname, "dist"),
        watchContentBase: true,
        compress: true,
        port: 9000
      }
});