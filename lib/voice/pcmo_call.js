'use strict';

var _index = require('../underscore/index');

var _index2 = _interopRequireDefault(_index);

var _axios = require('axios');

var _axios2 = _interopRequireDefault(_axios);

var _action = require('../action/action');

var _action2 = _interopRequireDefault(_action);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

//const voice = { host: "https://piopiy.telecmi.com", path: "/v1/global_pcmo_make_call" };
var voice = { host: "http://localhost:8181", path: "/v1/global_pcmo_make_call" };
var credentials = {};

exports.make = function (credentials, to, from, forward_to, options) {

    return new Promise(function (solved, rejected) {

        if (_index2.default.isNumber(to) && _index2.default.isNumber(from) && (_index2.default.isArray(forward_to) || _index2.default.isNumber(forward_to))) {
            var pcmo = _action2.default;
            pcmo.call(forward_to, from, options);

            var duration = 4200;

            if (_index2.default.isObject(options)) {
                duration = options.duration || duration;
            }

            var options_data = {
                "appid": credentials.appid,
                "secret": credentials.secret,
                "from": from,
                "duration": duration,
                "pcmo": pcmo.PCMO(),
                "to": to
            };

            _axios2.default.post(voice.host + voice.path, options_data).then(function (res) {
                solved(res.data);
            }).catch(function (err) {
                rejected(err);
            });
        } else {
            rejected('to,from and answer_url type error');
        }
    });
};

exports.connect = function (credentials, to, from, forward_to, options) {

    return new Promise(function (solved, rejected) {

        if (_index2.default.isNumber(to) && _index2.default.isNumber(from) && (_index2.default.isArray(forward_to) || !_index2.default.isEmpty(forward_to))) {
            var pcmo = _action2.default;
            pcmo.forward(forward_to, from, options);

            var duration = 4200;

            if (_index2.default.isObject(options)) {
                duration = options.duration || duration;
            }

            var options_data = {
                "appid": credentials.appid,
                "secret": credentials.secret,
                "from": from,
                "duration": duration,
                "pcmo": pcmo.PCMO(),
                "to": to
            };

            _axios2.default.post(voice.host + voice.path, options_data).then(function (res) {
                solved(res.data);
            }).catch(function (err) {
                rejected(err);
            });
        } else {
            rejected('to,from and answer_url type error');
        }
    });
};

exports.makePCMO = function (credentials, to, from, pcmo, durations) {

    return new Promise(function (solved, rejected) {

        if (_index2.default.isNumber(to) && _index2.default.isNumber(from) && _index2.default.isArray(pcmo)) {

            var duration = durations || 4200;

            var options_data = {
                "appid": credentials.appid,
                "secret": credentials.secret,
                "from": from,
                "duration": duration,
                "pcmo": pcmo,
                "to": to
            };

            _axios2.default.post(voice.host + voice.path, options_data).then(function (res) {
                solved(res.data);
            }).catch(function (err) {
                rejected(err);
            });
        } else {
            rejected('to,from and answer_url type error');
        }
    });
};