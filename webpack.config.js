'use strict';
const webpack = require('webpack');
const path = require('path');
const fs = require('fs');

module.exports = {
    entry: './clipman.js',
    devtool: 'sourcemaps',
    output: {
        path: path.resolve(__dirname, 'assets'),
        filename: 'bundle.js'
    },
    resolve: {
        modules: [
            'node_modules'
        ],
        extensions: ['.js', '.jsx', '.json'],
    },
    module: {
        loaders: [
            {
                test: /\.jsx?$/,
                exclude: /^(node_modules|bower_components|public\/)/,
                loader: 'babel-loader'
            }
        ]
    },
    externals: 'electron',
    plugins: [
        // new webpack.HotModuleReplacementPlugin(),
        new webpack.NoEmitOnErrorsPlugin(),
    ]
};