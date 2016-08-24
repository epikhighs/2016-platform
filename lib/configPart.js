const cssPart = require('./cssPart');
const devServerPart = require('./devServerPart');

module.exports = {
    css: cssPart,
    devServer: devServerPart,
    devTool: function (id) {
        return {devtool: id};
    },
};