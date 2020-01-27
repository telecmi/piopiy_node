'use strict';

var _index = require('../underscore/index');

var _index2 = _interopRequireDefault(_index);

var _request = require('request');

var _request2 = _interopRequireDefault(_request);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var voice = { host: "https://piopiy.telecmi.com", path: "/v1/call/action" };
var credentials = {};

exports.hangup = function (appid, secret, cmiuuid) {
    return new Promise(function (solved, rejected) {

        if (_index2.default.isString(cmiuuid)) {

            var options = {
                uri: voice.host + voice.path,
                method: 'POST',
                json: {
                    "appid": appid,
                    "secret": secret,
                    "action": 'hangup',
                    "cmiuid": cmiuuid
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
            rejected('cmiuuid type error');
        }
    });
};