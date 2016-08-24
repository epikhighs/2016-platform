module.exports = function (path) {
    return {
        module: {
            loaders: [
                {
                    test: /\.css$/,
                    loaders: ['style', 'css'],
                    include: path,
                },
            ],
        },
    };
};