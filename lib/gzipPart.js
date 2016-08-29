const CompressionPlugin = require("compression-webpack-plugin");

module.exports = function (opt) {
    var opt = opt || {};
    return {
        plugins: [
            new CompressionPlugin({
                asset: opt.path || 'gzip/[path].gz[query]',
                algorithm: 'gzip',
                test: /\.js$|\.css$|\.map$|\.svg$/,
                minRatio: Infinity,
            }),
        ]
    };
};
