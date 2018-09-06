const path = require('path');
const merge = require('webpack-merge');
const baseConfig = require('./webpack.base.js');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin')

module.exports = merge(baseConfig, {
    mode:"production",
    output: {
        filename: "[name].js",
        path: path.resolve(__dirname, 'dist')
    },
    devtool:'source-map',
    plugins: [
        new UglifyJsPlugin({
            sourceMap:true
        })
    ],
    externals: {
        "react": "React",
        "react-dom": "ReactDOM"
    }
});