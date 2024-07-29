'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _index = require('../underscore/index');

var _hold = require('./hold');

var _hangup = require('./hangup');

var _hangup2 = _interopRequireDefault(_hangup);

var _axios = require('axios');

var _axios2 = _interopRequireDefault(_axios);

var _pcmo_call = require('./pcmo_call');

var _underscore = require('../../lib/underscore');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var voice = { host: "https://piopiy.telecmi.com", path: "/v1/global_make_call" };

var credentials = {};

var setup = function setup(appid, secret) {
    credentials.appid = appid;
    credentials.secret = secret;
};

var create = async function create(to, from, answerUrl, duration) {

    if ((0, _index.isNumber)(to) && (0, _index.isNumber)(from) && (0, _underscore.isUrl)(answerUrl) && (0, _index.isNumber)(duration)) {

        var options = {
            appid: credentials.appid,
            secret: credentials.secret,
            from: from,
            duration: duration,
            answer_url: answerUrl,
            to: to
        };

        var response = await _axios2.default.post('' + voice.host + voice.path, options);
        return response.data;
    } else {
        throw new Error('Invalid types for to, from, or answer_url');
    }
};

var call = function call(to, from, to_or_pcmo, options) {

    if ((0, _underscore.isArray)(to_or_pcmo)) {
        if ((0, _index.isJsonArray)(to_or_pcmo)) {
            return (0, _pcmo_call.makePCMO)(credentials, to, from, to_or_pcmo, options);
        } else {
            return (0, _pcmo_call.make)(credentials, to, from, to_or_pcmo, options);
        }
    } else {
        return (0, _pcmo_call.make)(credentials, to, from, to_or_pcmo, options);
    }
};

var hold = function hold(cmiuuid) {
    return (0, _hold.call_hold)(credentials.appid, credentials.secret, cmiuuid);
};

var unhold = function unhold(cmiuuid) {
    return (0, _hold.call_unhold)(credentials.appid, credentials.secret, cmiuuid);
};

var toggle = function toggle(cmiuuid) {
    return (0, _hold.call_toggle)(credentials.appid, credentials.secret, cmiuuid);
};

var hangup = function hangup(cmiuuid) {
    return (0, _hangup2.default)(credentials.appid, credentials.secret, cmiuuid);
};

var Calls = {
    setup: setup,
    create: create,
    call: call,
    hold: hold,
    unhold: unhold,
    toggle: toggle,
    hangup: hangup
};

// Export the object as the default export
exports.default = Calls;