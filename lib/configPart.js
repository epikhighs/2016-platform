const stylePart = require('./stylePart');
const devServerPart = require('./devServerPart');
const extractTextPart = require('./extractTextPart');
const minJsPart = require('./minJsPart');

module.exports = {
    extractText: extractTextPart,
    devServer: devServerPart,
    devTool: function (id) {
        return {devtool: id};
    },
    minJs: minJsPart,
    style: stylePart,
};