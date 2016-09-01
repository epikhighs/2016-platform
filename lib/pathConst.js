const path = require('path');
const root = '../';
// add all path/dir related stuff here to properly handle
// backslashes vs. forward slashes and other platform specific differences
module.exports = {
    amd: path.join(__dirname, root + 'src/legacy/amd'),
    dist: path.join(__dirname, root + 'dist'),
    dll: path.join(__dirname, root + 'dist/dll/dll.vendor.js'),
    dllCss: path.join(__dirname, root + 'dist/dll/dll.vendor.css'),
    kendo: path.join(__dirname, root + 'vendor_modules/js/kendo'),
    legacy: path.join(__dirname, root + 'src/legacy'),
    logo: path.join(__dirname, root + 'src/main/logo.png'),
    login: path.join(__dirname, root + 'src/login'),
    main: path.join(__dirname, root + 'src/main'),
    mainTpl: path.join(__dirname, root + 'src/main/index.ejs'),
    src: path.join(__dirname, root + 'src'),
    svg: path.join(__dirname, root + 'src/svg'),
    test: path.join(__dirname, root + 'src/test.js'),
};
