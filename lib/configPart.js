const stylePart = require('./stylePart');
const devServerPart = require('./devServerPart');

module.exports = {
    devServer: devServerPart,
    devTool: function (id) {
        return {devtool: id};
    },
    style: stylePart,
};