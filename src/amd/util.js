/**
 * @module
 */
define(function () {
    'use strict';
    var someEs6 = require('./someEs6');
    var moment = require('moment');
    console.log('util-moment');
    console.log(moment().format('YYYY-MM-DD'));
    return {
        sayHello: function () {
            console.log('hello');
        },
        es6: someEs6,
    };
});

