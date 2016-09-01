var webpackConfig = require('./webpack.config');
// webpackConfig.entry = {};
// webpackConfig.output = {};
module.exports = function (config) {
    config.set({
        browsers: [ 'Chrome', ],
        // karma only needs to know about the test bundle
        files: [
            // 'src/test.js',
            'dist/dll.vendor.js',
            // 'src/browser.js',
            'dist/test.bundle.js.map',
            'dist/test.bundle.js',
            // 'dist/main.bundle.js',
            // 'dist/**/*.js',
        ],
        frameworks: [ 'chai', 'mocha' ],
        plugins: [
            'karma-chrome-launcher',
            'karma-jsdom-launcher',
            'karma-chai',
            'karma-mocha',
            'karma-sourcemap-loader',
            'karma-webpack',
        ],
        // run the bundle through the webpack and sourcemap plugins
        preprocessors: {
            // 'src/test.js': [ 'webpack', 'sourcemap' ],
            // 'src/browser.js': [ 'webpack', 'sourcemap' ],
            'dist/test.bundle.js': [ 'webpack', 'sourcemap' ],
        },
        reporters: [ 'dots' ],
        autoWatch: false,
        singleRun: false,
        webpack: webpackConfig,
        webpackMiddleware: {
            noInfo: true,
        }
    });
};