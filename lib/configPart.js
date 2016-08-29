const stylePart = require('./stylePart');
const devServerPart = require('./devServerPart');
const extractTextPart = require('./extractTextPart');
const minJsPart = require('./minJsPart');
const gzipPart = require('./gzipPart');

module.exports = {
    extractText: extractTextPart,
    devServer: devServerPart,
    devTool: function (id) {
        return {devtool: id};
    },
    gzip: gzipPart,
    minJs: minJsPart,
    style: stylePart,
};