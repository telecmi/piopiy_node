'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.call_toggle = exports.call_unhold = exports.call_hold = undefined;

var _index = require('../underscore/index');

var _axios = require('axios');

var _axios2 = _interopRequireDefault(_axios);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var voice = { host: "https://piopiy.telecmi.com", path: "/v1/call/global_action" };

var call_hold = exports.call_hold = async function call_hold(appid, secret, cmiuuid) {

    if ((0, _index.isString)(cmiuuid)) {

        var options = {
            "appid": appid,
            "secret": secret,
            "action": 'hold',
            "cmiuid": cmiuuid
        };

        var response = await _axios2.default.post(voice.host + voice.path, options);
        return response.data;
    } else {
        throw new Error('cmiuuid type error');
    }
};

var call_unhold = exports.call_unhold = async function call_unhold(appid, secret, cmiuuid) {

    if ((0, _index.isString)(cmiuuid)) {

        var options = {
            "appid": appid,
            "secret": secret,
            "action": 'unhold',
            "cmiuid": cmiuuid
        };

        var response = await _axios2.default.post(voice.host + voice.path, options);
        return response.data;
    } else {
        throw new Error('cmiuuid type error');
    }
};

var call_toggle = exports.call_toggle = async function call_toggle(appid, secret, cmiuuid) {

    if ((0, _index.isString)(cmiuuid)) {

        var options = {
            "appid": appid,
            "secret": secret,
            "action": 'holdToggle',
            "cmiuid": cmiuuid
        };

        var response = await _axios2.default.post(voice.host + voice.path, options);
        return response.data;
    } else {
        throw new Error('cmiuuid type error');
    }
};