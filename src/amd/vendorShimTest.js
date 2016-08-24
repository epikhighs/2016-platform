/**
 * @module
 */
define(function (require) {
    'use strict';
    var $ = require('jquery');
    require('select2');
    require('bootstrap');
    require('bootstrapSwitch');
    require('dateRangePicker');
    require('pagination');
    require('radio');

    var log = function (msg) {
        $('body').append(`<div>${msg}</div>`);
    };

    var j = 3;
    log('---------------------- vendor shim test ------------------');
    $('body').append('<select id="select2"></select>');
    $('body').append('<input id="bs-switch" type="checkbox"/>');
    $('body').append('<div id="bs-pagination"></div>');
    $('body').append('<div id="drp-parent"></div>');
    $('body').append('<div id="drp"></div>');
    $('#select2').select2();
    setTimeout(function () {
        $('#bs-switch').bootstrapSwitch({state: true});
        $('#bs-pagination').twbsPagination({totalPages: 1,});
        $('#drp').daterangepicker({parentEl: '#drp-parent'});
    }, 10);
    log('---------------------- vendor shim test ------------------');

    return {
        doIt: function () {
            return null;
        },
    };
});

