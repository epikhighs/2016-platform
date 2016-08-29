/**
 * This is a CJS module -- not ES6
 */
const AddAssetHtmlPlugin = require('add-asset-html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const CompressionPlugin = require("compression-webpack-plugin");
const configPart = require('./lib/configPart');
const dllManifestJson = require('./dist/vendor-manifest.json');
const FaviconsWebpackPlugin = require('favicons-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');
const SvgStore = require('webpack-svgstore-plugin');
const webpack = require('webpack');
const webpackValidator = require('webpack-validator');
const webpackMerge = require('webpack-merge');

// the name of the script from package.json
const npmLifecycleEvent = process.env.npm_lifecycle_event;
// add all path/dir related stuff here to properly handle
// backslashes vs. forward slashes and other platform specific differences
const p = {
    amd: path.join(__dirname, 'src/legacy/amd'),
    dist: path.join(__dirname, 'dist'),
    dll: path.join(__dirname, 'dist/dll/dll.vendor.js'),
    dllCss: path.join(__dirname, 'dist/dll/dll.vendor.css'),
    kendo: path.join(__dirname, 'vendor_modules/js/kendo'),
    legacy: path.join(__dirname, 'src/legacy'),
    logo: path.join(__dirname, 'src/main/logo.png'),
    login: path.join(__dirname, 'src/login'),
    main: path.join(__dirname, 'src/main'),
    mainTpl: path.join(__dirname, 'src/main/index.ejs'),
    src: path.join(__dirname, 'src'),
    svg: path.join(__dirname, 'src/svg'),
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
            filepath: p.dllCss,
            typeOfAsset: 'css',
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
        new SvgStore({
            svgoOptions: {
                plugins: [
                    { removeTitle: true }
                ]
            }
        }),
        new webpack.IgnorePlugin(/locale$/, /moment$/),
    ],
    resolve: {
        alias: {
            // app related
            'amd': p.amd,
            'login': p.login,
            'main': p.main,
            'svg': p.svg,
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
if (npmLifecycleEvent === 'build-webpack') {
    config = webpackMerge(
        common,
        configPart.extractText({
            path: p.main,
            cssLoader: 'css?sourceMap,minimize',
        }),
        configPart.minJs(),
        configPart.gzip(),
        configPart.devTool('source-map')
    );
} else {
    config = webpackMerge(
        common,
        configPart.extractText({path: p.main}),
        configPart.devServer({}),
        configPart.devTool('source-map')
    );
}

process.env.BABEL_ENV = npmLifecycleEvent; // restricts hot loading to development only

module.exports = webpackValidator(config);
