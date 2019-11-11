'use strict';

var _index = require('../underscore/index');

var _index2 = _interopRequireDefault(_index);

var _request = require('request');

var _request2 = _interopRequireDefault(_request);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var voice = { host: "https://piopiy.telecmi.com", path: "/v1/make_call" };
var credentials = {};

exports.setup = function (appid, secret) {
    credentials.appid = appid;
    credentials.secret = secret;
};

exports.make = function (to, from, answer_url, duration) {
    return new Promise(function (solved, rejected) {

        if (_index2.default.isNumber(to) && _index2.default.isNumber(from) && _index2.default.isUrl(answer_url)) {

            var options = {
                uri: voice.host + voice.path,
                method: 'POST',
                json: {
                    "appid": credentials.appid,
                    "secret": credentials.secret,
                    "from": from,
                    "duration": duration,
                    "answer_url": answer_url,
                    "to": to
                }
            };

            (0, _request2.default)(options, function (error, res, body) {
                if (!error && res.statusCode == 200) {
                    solved(body);
                } else {
                    solved(error);
                }
            });
        } else {
            rejected('to,from and answer_url type error');
        }
    });
};