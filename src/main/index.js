import { tpl } from 'login/mathUtil';
import * as util from 'amd/util';
import * as vendorShimTest from 'amd/vendorShimTest';
import * as mainCss from './main.css';

let addAll2 = function () {
    return Array.from(arguments).reduce((a, b) => a + b);
};

let tpl2 = function (frag) {
    return `hello ${frag}`;
};

console.log(tpl('daniel'));
console.log(tpl2('daniel'));
console.log(util);
console.log(util.sayHello());
vendorShimTest.doIt();