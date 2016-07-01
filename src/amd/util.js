/**
 * @module
 */
define(function () {
    'use strict';
    var someEs6 = require('./some-es6');

    return {
        sayHello: function () {
            console.log('hello');
        },
        es6: someEs6,
    };
});

