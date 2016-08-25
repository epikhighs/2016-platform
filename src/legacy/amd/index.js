import * as util from 'amd/util';
import * as shim from 'amd/vendorShimTest';
import $ from 'jquery';

$('body').append('jquery is loading in ES6 module');
util.sayHello();
console.log(util.es6.tpl('dannnnnnnnny'));
console.log(util.es6.addAll(3, 2));