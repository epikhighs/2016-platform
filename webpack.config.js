/**
 * This is a CJS module -- not ES6
 */
const AddAssetHtmlPlugin = require('add-asset-html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const FaviconsWebpackPlugin = require('favicons-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const webpack = require('webpack');
const webpackValidator = require('webpack-validator');
const webpackMerge = require('webpack-merge');
const configPart = require('./lib/configPart');
const path = require('path');
const dllManifestJson = require('./dll/vendor-manifest.json');

const npmLifecycleEvent = process.env.npm_lifecycle_event;
// add all path/dir related stuff here to properly handle
// backslashes vs. forward slashes and other platform specific differences
const p = {
    amd: path.join(__dirname, 'src/legacy/amd'),
    dist: path.join(__dirname, 'dist'),
    dll: path.join(__dirname, 'dist/dll/dll.vendor.js'),
    kendo: path.join(__dirname, 'vendor_modules/js/kendo'),
    legacy: path.join(__dirname, 'src/legacy'),
    logo: path.join(__dirname, 'src/main/logo.png'),
    login: path.join(__dirname, 'src/login'),
    main: path.join(__dirname, 'src/main'),
    mainTpl: path.join(__dirname, 'src/main/index.ejs'),
    src: path.join(__dirname, 'src'),
};

const common = {
    entry: {
        main: p.main, // i guess it auto looks for index.js within this dir
        // used w/ common chunks so that vendor chunk doesn't get bundled together
        // with main entry point
        // vendor: p.vendor,
    },
    module: {
        loaders: [
            {
                test: /\.jsx?$/, loader: 'babel-loader',
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
        publicPath: '/',
    },
    plugins: [
        // new CleanWebpackPlugin([p.dist], {
        //     root: process.cwd(),
        // }),
        // new FaviconsWebpackPlugin(p.logo),
        new HtmlWebpackPlugin({
            template: p.mainTpl,
            chunks: ['main'],
        }),
        new AddAssetHtmlPlugin({
            filepath: p.dll,
        }),
        new webpack.ProvidePlugin({
            $: 'jquery',
            jQuery: 'jquery',
            'window.jQuery': 'jquery',
        }),
        new webpack.DllReferencePlugin({
            context: '.',
            manifest: dllManifestJson,
        }),
        new webpack.IgnorePlugin(/locale$/, /moment$/),
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
        extensions: ['', '.js', '.jsx'], // allows importing these file types without extensions
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

process.env.BABEL_ENV = npmLifecycleEvent; // restricts hot loading to development only

module.exports = webpackValidator(config);
