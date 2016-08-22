/**
 * @module
 */
define(function () {
    'use strict';
    var _ = require('underscore');
    var someEs6 = require('./someEs6');
    var moment = require('moment');
    var Highcharts = require('highcharts');
    var Marionette = require('marionette');
    var $ = require('jquery');
    var Backbone = require('backbone');
    var accounting = require('accounting');
    var Bluebird = require('bluebird');
    var log = function (msg) {
        $('body').append(`<div>${msg}</div>`);
    };

    Bluebird.resolve(1).then((result) => log(`bluebird promise resolution ${result}`));

    // lodash loads
    _.forEach([1,2], () => log(_.VERSION));

    log('AMD moment, accounting:');
    log(moment().format('YYYY-MM-DD') + ' ' + accounting.formatNumber(192837));
    log('<div>jquery is loading in AMD</div>');
    log('<div id="highcharts"></div>');

    var j = new Highcharts.chart({
        chart: {height: 100, width: 400, type: 'bar', renderTo: $('#highcharts')[0]},
        series: [{name: 'Jane',data: [1, 0, 4]}, {name: 'John',data: [5, 7, 3]}],
    });

    var Model = Backbone.Model.extend();
    log(JSON.stringify((new Model({dan: 239587})).toJSON()));

    var view = new Marionette.ItemView({
        template: function () {
            return 'marionet viewwww';
        }
    });
    log(view.render().$el.html());

    return {
        sayHello: function () {
            console.log('hello');
        },
        es6: someEs6,
    };
});

