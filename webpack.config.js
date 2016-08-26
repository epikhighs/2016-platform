/**
 * This is a CJS module -- not ES6
 */
const CleanWebpackPlugin = require('clean-webpack-plugin');
const FaviconsWebpackPlugin = require('favicons-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const webpack = require('webpack');
const webpackValidator = require('webpack-validator');
const webpackMerge = require('webpack-merge');
const configPart = require('./lib/configPart');
const path = require('path');
//
const npmLifecycleEvent = process.env.npm_lifecycle_event;
// add all path/dir related stuff here to properly handle
// backslashes vs. forward slashes and other platform specific differences
const p = {
    amd: path.join(__dirname, 'src/legacy/amd'),
    dist: path.join(__dirname, 'dist'),
    kendo: path.join(__dirname, 'vendor_modules/js/kendo'),
    legacy: path.join(__dirname, 'src/legacy'),
    logo: path.join(__dirname, 'src/main/logo.png'),
    login: path.join(__dirname, 'src/login'),
    main: path.join(__dirname, 'src/main'),
    mainTpl: path.join(__dirname, 'src/main/index.ejs'),
    src: path.join(__dirname, 'src'),
    vendor: path.join(__dirname, 'src/main/vendor.js'),
};

const common = {
    entry: {
        main: p.main, // i guess it auto looks for index.js within this dir
        // used w/ common chunks so that vendor chunk doesn't get bundled together
        // with main entry point
        vendor: p.vendor,
    },
    module: {
        loaders: [
            {
                test: /\.js$/, loader: 'babel-loader',
                include: [p.src],
                query: {
                    cacheDirectory: true,
                }
            },
            {
                test: /config(\/|\\).*\.json$/, loader: 'json-loader', include: [p.src],
            },
            {
                test: /tpl(\/|\\).*\.tpl/, loader: 'underscore-template-loader',
                include: [p.src],
                query: {
                    engine: 'lodash',
                    parseMacros: false,
                    variable: 'data',
                },
            },
            {
                test: /tpl(\/|\\).*\.tpx$/, loader: 'raw-loader',
                include: [p.src],
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
        // new FaviconsWebpackPlugin(p.logo),
        new HtmlWebpackPlugin({
            template: p.mainTpl,
            chunks: ['main', 'vendor'],
        }),
        new webpack.ProvidePlugin({
            $: 'jquery',
            jQuery: 'jquery',
            'window.jQuery': 'jquery',
        }),
        new webpack.IgnorePlugin(/locale$/, /moment$/),
        new webpack.optimize.CommonsChunkPlugin({name: 'vendor',}),
    ],
    resolve: {
        alias: {
            // app related
            'amd': p.amd,
            'login': p.login,
            'main': p.main,
            // vendor related
            'bootstrap': 'js/bootstrap',
            'bootstrapSwitch': 'js/bootstrap-switch',
            'dateRangePicker': 'js/daterangepicker',
            'marionette': 'backbone.marionette',
            'pagination': 'js/jquery.twbsPagination',
            'radio': 'backbone.radio',
            'select2': 'js/select2',
            'underscore': 'lodash',
        },
        modulesDirectories: ['node_modules', 'vendor_modules'],
        root: [p.kendo],
    },
};

var config;

// Detect how npm is run and branch based on that
if (npmLifecycleEvent === 'build') {
    config = webpackMerge(
        common,
        configPart.style(p.main),
        configPart.devTool('source-map')
    );
} else {
    config = webpackMerge(
        common,
        configPart.style(p.main),
        configPart.devServer({}),
        configPart.devTool('source-map')
    );
}

module.exports = webpackValidator(config);
