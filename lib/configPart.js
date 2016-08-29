const stylePart = require('./stylePart');
const devServerPart = require('./devServerPart');
const extractTextPart = require('./extractTextPart');

module.exports = {
    extractText: extractTextPart,
    devServer: devServerPart,
    devTool: function (id) {
        return {devtool: id};
    },
    style: stylePart,
};