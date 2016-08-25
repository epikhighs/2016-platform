/**
 * @module
 */
define(function (require) {
    'use strict';
    var _ = require('underscore');
    var moment = require('moment');
    var Highcharts = require('highcharts');
    var Marionette = require('marionette');
    var $ = require('jquery');
    var Backbone = require('backbone');
    var accounting = require('accounting');
    var Bluebird = require('bluebird');
    var loginTpl = require('login/tpl/login.tpl');
    var sampleJson = require('amd/config/sampleJson.json');
    var sampleTpl = require('amd/tpl/sample.tpl');
    var sampleMultipleTpl = require('amd/tpl/sampleMultiple.tpx');
    var someEs6 = require('amd/someEs6');
    var tplHash = require('amd/tpl-hash');

    var log = function (msg) {
        $('body').append(`<div>${msg}</div>`);
    };

    log(JSON.stringify(sampleJson));
    log(sampleJson.name);
    log(sampleTpl({name: 'daniel'}));
    log(loginTpl({name: 'daniel'}));
    tplHash.setTpl(sampleMultipleTpl);
    log(tplHash.getTpl('sample-tpl'));
    log(tplHash.getTpl('sample-tpl').trim() === 'tpl: <%= data.name %>');

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
    var sampleModel = new Model({name: 'sample model name'});
    log(JSON.stringify((sampleModel).toJSON()));

    var view = new Marionette.ItemView({
        template: sampleTpl,
        model: sampleModel,
    });
    log(view.render().$el.html());

    return {
        sayHello: function () {
            console.log('hello');
        },
        es6: someEs6,
    };
});