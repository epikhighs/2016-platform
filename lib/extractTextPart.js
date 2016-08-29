const ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = function (path) {
    return {
        module: {
            loaders: [
                {
                    test: /\.css$/,
                    loader: ExtractTextPlugin.extract('style', 'css'),
                    include: path,
                },
                {
                    test: /\.less$/,
                    loaders: ['style', 'css'],
                    include: path,
                },
            ],
        },
        plugins: [
            new ExtractTextPlugin('dll.[name].css'),
        ]
    };
};