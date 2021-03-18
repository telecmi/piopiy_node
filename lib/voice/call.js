'use strict';

var _index = require('../underscore/index');

var _index2 = _interopRequireDefault(_index);

var _hold = require('./hold');

var _hold2 = _interopRequireDefault(_hold);

var _hangup = require('./hangup');

var _hangup2 = _interopRequireDefault(_hangup);

var _pcmo_call = require('./pcmo_call');

var _pcmo_call2 = _interopRequireDefault(_pcmo_call);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var voice = { host: "https://piopiy.telecmi.com", path: "/v1/global_make_call" };
//const voice = { host: "http://localhost:8181", path: "/v1/global_make_call" };
var credentials = {};

exports.setup = function (appid, secret) {
    credentials.appid = appid;
    credentials.secret = secret;
};

exports.make = function (to, from, answer_url, duration) {
    return new Promise(function (solved, rejected) {

        if (_index2.default.isNumber(to) && _index2.default.isNumber(from) && _index2.default.isUrl(answer_url)) {

            var options = {
                "appid": credentials.appid,
                "secret": credentials.secret,
                "from": from,
                "duration": duration,
                "answer_url": answer_url,
                "to": to
            };

            axios.post(voice.host + voice.path, options).then(function (res) {
                solved(res.data);
            }).catch(function (err) {
                rejected(err);
            });
        } else {
            rejected('to,from and answer_url type error');
        }
    });
};

exports.call = function (to, from, forward_to, options) {
    return _pcmo_call2.default.make(credentials, to, from, forward_to, options);
};

exports.callPCMO = function (to, from, pcmo_obj, duration) {
    return _pcmo_call2.default.makePCMO(credentials, to, from, pcmo_obj, duration);
};

exports.connect = function (to, from, forward_to, options) {
    return _pcmo_call2.default.connect(credentials, to, from, forward_to, options);
};

exports.hold = function (cmiuuid) {
    return _hold2.default.hold(credentials.appid, credentials.secret, cmiuuid);
};

exports.unhold = function (cmiuuid) {
    return _hold2.default.unhold(credentials.appid, credentials.secret, cmiuuid);
};

exports.toggle = function (cmiuuid) {
    return _hold2.default.toggle(credentials.appid, credentials.secret, cmiuuid);
};

exports.hangup = function (cmiuuid) {
    return _hangup2.default.hangup(credentials.appid, credentials.secret, cmiuuid);
};