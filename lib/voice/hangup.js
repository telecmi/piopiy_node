'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.call_hangup = undefined;

var _index = require('../underscore/index');

var _axios = require('axios');

var _axios2 = _interopRequireDefault(_axios);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var voice = { host: "https://piopiy.telecmi.com", path: "/v1/call/global_action" };

var call_hangup = exports.call_hangup = async function call_hangup(appid, secret, cmiuuid) {

    if ((0, _index.isString)(cmiuuid)) {

        var options = {
            "appid": appid,
            "secret": secret,
            "action": 'hangup',
            "cmiuid": cmiuuid
        };

        var response = await _axios2.default.post(voice.host + voice.path, options);
        return response.data;
    } else {
        throw new Error('cmiuuid type error');
    }
};