'use strict';

var _index = require('../underscore/index');

var _index2 = _interopRequireDefault(_index);

var _axios = require('axios');

var _axios2 = _interopRequireDefault(_axios);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var voice = { host: "https://piopiy.telecmi.com", path: "/v1/call/action" };
var credentials = {};

exports.hold = function (appid, secret, cmiuuid) {
    return new Promise(function (solved, rejected) {

        if (_index2.default.isString(cmiuuid)) {

            var options = {
                "appid": appid,
                "secret": secret,
                "action": 'hold',
                "cmiuid": cmiuuid
            };

            _axios2.default.post(voice.host + voice.path, options).then(function (res) {
                solved(res.data);
            }).catch(function (err) {
                rejected(err);
            });
        } else {
            rejected('cmiuuid type error');
        }
    });
};

exports.unhold = function (appid, secret, cmiuuid) {
    return new Promise(function (solved, rejected) {

        if (_index2.default.isString(cmiuuid)) {

            var options = {
                "appid": appid,
                "secret": secret,
                "action": 'unhold',
                "cmiuid": cmiuuid
            };

            _axios2.default.post(voice.host + voice.path, options).then(function (res) {
                solved(res.data);
            }).catch(function (err) {
                rejected(err);
            });
        } else {
            rejected('cmiuuid type error');
        }
    });
};

exports.toggle = function (appid, secret, cmiuuid) {
    return new Promise(function (solved, rejected) {

        if (_index2.default.isString(cmiuuid)) {

            var options = {
                "appid": appid,
                "secret": secret,
                "action": 'holdToggle',
                "cmiuid": cmiuuid
            };

            _axios2.default.post(voice.host + voice.path, options).then(function (res) {
                solved(res.data);
            }).catch(function (err) {
                rejected(err);
            });
        } else {
            rejected('cmiuuid type error');
        }
    });
};