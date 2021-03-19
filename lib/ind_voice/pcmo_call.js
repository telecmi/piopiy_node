'use strict';

var _index = require('../underscore/index');

var _index2 = _interopRequireDefault(_index);

var _axios = require('axios');

var _axios2 = _interopRequireDefault(_axios);

var _action = require('../action/action');

var _action2 = _interopRequireDefault(_action);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var voice = { host: "https://piopiy.telecmi.com", path: "/v1/pcmo_make_call" };

var credentials = {};

exports.make = function (credentials, to, from, forward_to, options) {

    return new Promise(function (solved, rejected) {

        if (_index2.default.isNumber(to) && _index2.default.isNumber(from) && (_index2.default.isArray(forward_to) || _index2.default.isNumber(forward_to))) {
            var pcmo = _action2.default;
            pcmo.call(forward_to, from, options);

            var duration = 4200;
            var extra_params = {};

            if (_index2.default.isObject(options)) {
                duration = options.duration || duration;
                extra_params = options.extra_params || {};
            }

            var options_data = {
                "appid": credentials.appid,
                "secret": credentials.secret,
                "extra_params": extra_params,
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

exports.makePCMO = function (credentials, to, from, pcmo, options) {

    return new Promise(function (solved, rejected) {

        if (_index2.default.isNumber(to) && _index2.default.isNumber(from) && _index2.default.isArray(pcmo)) {

            var duration = 4200;
            var extra_params = {};

            if (_index2.default.isObject(options)) {
                duration = options.duration || duration;
                extra_params = options.extra_params || {};
            }

            var options_data = {
                "appid": credentials.appid,
                "secret": credentials.secret,
                "extra_params": extra_params,
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