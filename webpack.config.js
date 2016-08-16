/**
 * This is a CJS module -- not ES6
 */
const CleanWebpackPlugin = require('clean-webpack-plugin');
const FaviconsWebpackPlugin = require('favicons-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const webpackValidator = require('webpack-validator');
const webpackMerge = require('webpack-merge');
const path = require('path');

const npmLifecycleEvent = process.env.npm_lifecycle_event;
// add all path/dir related stuff here to properly handle
// backslashes vs. forward slashes and other platform specific differences
const p = {
    app: path.join(__dirname, 'src'),
    appTpl: path.join(__dirname, 'src/index.ejs'),
    amd: path.join(__dirname, 'src/amd'),
    dist: path.join(__dirname, 'dist'),
    logo: path.join(__dirname, 'src/logo.png'),
};

const common = {
    entry: {
        app: p.app, // i guess it auto looks for index.js within this dir
        amd: p.amd,
        // login
        // xc
        // digital
        // vendor
    },
    module: {
        loaders: [
            {
                test: /\.js$/,
                include: [p.app],
                loader: 'babel-loader',
                query: {
                    cacheDirectory: true,
                }
            },
        ],
    },
    output: {
        path: p.dist,
        filename: '[name].bundle.js',
    },
    plugins: [
        new CleanWebpackPlugin([p.dist], {
            root: process.cwd(),
        }),
        new FaviconsWebpackPlugin(p.logo),
        new HtmlWebpackPlugin({
            template: p.appTpl,
            chunks: ['amd'],
            filename: 'amd.html',
        }),
        new HtmlWebpackPlugin({
            template: p.appTpl,
            chunks: ['app'],
        }),
    ],
    resolve: {
        modulesDirectories: ['node_modules', 'vendor_modules'],
    },
};

var config;

// Detect how npm is run and branch based on that
if (npmLifecycleEvent === 'build') {
    config = webpackMerge(common, {});
} else {
    config = webpackMerge(common, {});
}

module.exports = webpackValidator(config);