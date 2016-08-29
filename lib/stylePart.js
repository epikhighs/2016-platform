/**
 * stylePart should not be used b/c it inlines
 * css with JS and during recompile the entire JS + CSS chunk needs
 * to be preprocessed.  So in most cases, extractTextPart should be used intead.
 */
module.exports = function (path) {
    return {
        module: {
            loaders: [
                {
                    test: /\.css$/,
                    loaders: ['style', 'css'],
                    include: path,
                },
                {
                    test: /\.less$/,
                    loaders: ['style', 'css', 'less'],
                    include: path,
                },
                {
                    test: /\.sass/,
                    loaders: ['style', 'css', 'sass'],
                    include: path,
                },
            ],
        },
    };
};