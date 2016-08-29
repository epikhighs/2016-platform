const webpack = require('webpack');

module.exports = function () {
    return {
        plugins: [
            new webpack.optimize.UglifyJsPlugin({
                mangle: {
                    except: ['require', 'define', '$', 'kendo'],
                },
                maxLineLen: 10000,
                preserveComments: 'some',
                report: 'gzip',
            }),
        ]
    };
};