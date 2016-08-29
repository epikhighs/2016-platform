const ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = function (opt) {
    var cssLoader = opt.cssLoader || 'css';
    return {
        module: {
            loaders: [
                {
                    test: /\.css$/,
                    loader: ExtractTextPlugin.extract('style', cssLoader),
                    include: opt.path,
                },
                {
                    test: /\.less$/,
                    loader: ExtractTextPlugin.extract('style', cssLoader, 'less'),
                    include: opt.path,
                },
                {
                    test: /\.sass/,
                    loader: ExtractTextPlugin.extract('style', cssLoader, 'sass'),
                    include: opt.path,
                },
            ],
        },
        plugins: [
            new ExtractTextPlugin('dll.[name].css'),
        ]
    };
};