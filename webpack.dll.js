/**
 * This is a CJS module -- not ES6
 */
const CleanWebpackPlugin = require('clean-webpack-plugin');
const configPart = require('./lib/configPart');
const webpack = require('webpack');
const webpackMerge = require('webpack-merge');
const webpackValidator = require('webpack-validator');
const path = require('path');

const p = {
    dist: path.join(__dirname, 'dist', 'dll'),
    dll: path.join(__dirname, 'dist', '[name]-manifest.json'),
    kendo: path.join(__dirname, 'vendor_modules/js/kendo'),
    lib: path.join(__dirname, 'lib'),
    src: path.join(__dirname, 'src'),
    vendor: path.join(__dirname, 'lib/vendor.js'),
    vendorStyle: path.join(__dirname, 'vendor_modules/css'),
};

const common = {
    entry: {
        vendor: [p.vendor],
    },
    module: {
        loaders: [
            {
                test: /\.js$/, loader: 'babel-loader',
                include: [p.src, p.lib],
                query: {
                    cacheDirectory: true,
                }
            },
            {
                test: /\.(jpg|png|gif|svg)(\?.*)?$/,
                loader: 'file',
                // loader: 'file?name=[path][name].[hash].[ext]',
                include: p.vendorStyle,
            },
            {
                test: /\.(ttf|eot|woff)(\?v=\d+\.\d+\.\d+)?$/,
                loader: 'file',
                query: {
                    // name: 'font/[hash].[ext]'
                },
                include: p.vendorStyle,
            },
            {
                test: /\.(ttf|eot|woff)(\?.*)?$/,
                loader: 'file',
                query: {
                    // name: 'font/[hash].[ext]'
                },
                include: p.vendorStyle,
            }
        ],
    },
    output: {
        path: p.dist,
        filename: 'dll.[name].js',
        library: '[name]',
    },
    plugins: [
        new webpack.DllPlugin({
            path: p.dll,
            name: '[name]',
            context: '.',
        }),
        new webpack.ProvidePlugin({
            $: 'jquery',
            jQuery: 'jquery',
            'window.jQuery': 'jquery',
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
    },
};

var config = webpackMerge(
        common,
        configPart.extractText({
            path: p.vendorStyle,
            cssLoader: 'css?sourceMap,minimize',
        }),
        configPart.minJs(),
        configPart.gzip(),
        configPart.devTool('source-map')
    );

module.exports = webpackValidator(config);