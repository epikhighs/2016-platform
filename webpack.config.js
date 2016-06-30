module.exports = {
    entry: './src/entry.js',
    output: {
        pathname: './dist',
        filename: './dist/entry.bundle.js',
    },
    module: {
        loaders: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                loader: 'babel-loader',
            },
        ],
    },
};