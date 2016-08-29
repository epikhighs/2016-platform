import { tpl } from 'login/mathUtil';
import * as util from 'amd/util';
import * as vendorShimTest from 'amd/vendorShimTest';
import * as mainCss from './main.less';
import HelloReact from './hello-react';
import React from 'react';
import ReactDOM from 'react-dom';

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

ReactDOM.render(
<HelloReact />,
    document.getElementById('react-app')
);
