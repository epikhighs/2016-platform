import { tpl } from './login/mathUtil';

let addAll2 = function () {
    return Array.from(arguments).reduce((a, b) => a + b);
};

let tpl2 = function (frag) {
    return `hello ${frag}`;
};

console.log(tpl('daniel'));
console.log(tpl2('daniel'));
