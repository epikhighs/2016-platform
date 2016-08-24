/**
 * This is a CJS module -- not ES6
 */
const CleanWebpackPlugin = require('clean-webpack-plugin');
const FaviconsWebpackPlugin = require('favicons-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const webpack = require('webpack');
const webpackValidator = require('webpack-validator');
const webpackMerge = require('webpack-merge');
const configPart = require('./lib/devServerPart');
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
    login: path.join(__dirname, 'src/login'),
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
                test: /\.js$/, loader: 'babel-loader',
                include: [p.app],
                query: {
                    cacheDirectory: true,
                }
            },
            {
                test: /\.json/, loader: 'json-loader',
            },
            {
                test: /\.tpl$/, loader: 'underscore-template-loader',
                query: {
                    engine: 'lodash',
                    parseMacros: false,
                    variable: 'data',
                },
            },
            {
                test: /\.tpx$/, loader: 'raw-loader',
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
        new webpack.ProvidePlugin({
            $: 'jquery',
            jQuery: 'jquery',
            'window.jQuery': 'jquery',
        }),
    ],
    resolve: {
        alias: {
            'amd': p.amd,
            'bootstrap': 'js/bootstrap',
            'bootstrapSwitch': 'js/bootstrap-switch',
            'dateRangePicker': 'js/daterangepicker',
            'login': p.login,
            'marionette': 'backbone.marionette',
            'pagination': 'js/jquery.twbsPagination',
            'radio': 'backbone.radio',
            'select2': 'js/select2',
            'underscore': 'lodash',
        },
        modulesDirectories: ['node_modules', 'vendor_modules'],
    },
};

var config;

// Detect how npm is run and branch based on that
if (npmLifecycleEvent === 'build') {
    config = webpackMerge(common, {
        devtool: 'source-map',
    });
} else {
    config = webpackMerge(
        common,
        {
            devtool: 'source-map',
        },
        configPart.devServer({})
    );
}

module.exports = webpackValidator(config);