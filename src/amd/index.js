import * as util from './util';
import $ from 'jquery';

$('body').append('jquery is loading in ES6 module');
util.sayHello();
console.log(util.es6.tpl('dannnnnnnnny'));
console.log(util.es6.addAll(3, 2));