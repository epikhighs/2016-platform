// http://nicolasgallagher.com/how-to-test-react-components-karma-webpack/
// require('jsdom-global')();
var context = require.context('.', true, /.+\.spec\.jsx?$/);
context.keys().forEach(context);
module.exports = context;