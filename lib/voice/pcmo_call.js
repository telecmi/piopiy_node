'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.makePCMO = exports.connect = exports.make = undefined;

var _index = require('../underscore/index');

var _axios = require('axios');

var _axios2 = _interopRequireDefault(_axios);

var _action = require('../action/action');

var _action2 = _interopRequireDefault(_action);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var ind_voice = { host: "https://rest.telecmi.com", path: "/v2/ind_pcmo_make_call" };

var glob_voice = { host: "https://rest.telecmi.com", path: "/v2/global_pcmo_make_call" };

var make = exports.make = async function make(credentials, to, from, forward_to, options) {

    if ((0, _index.isNumber)(to) && (0, _index.isNumber)(from) && ((0, _index.isArray)(forward_to) || (0, _index.isNumber)(forward_to))) {
        var pcmo = new _action2.default();
        pcmo.call(forward_to, from, options);

        var duration = 4200;
        var extra_params = {};

        if ((0, _index.isObject)(options)) {
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

        var voice = isIND(to) ? ind_voice : glob_voice;

        var response = await _axios2.default.post(voice.host + voice.path, options_data);
        return response.data;
    } else {
        throw new Error('leg_a,from and leg_b param type error');
    }
};

var connect = exports.connect = async function connect(credentials, to, from, forward_to, options) {

    if ((0, _index.isNumber)(to) && (0, _index.isNumber)(from) && ((0, _index.isArray)(forward_to) || (0, _index.isNumber)(forward_to))) {
        var pcmo = _action2.default;
        pcmo.forward(forward_to, from, options);

        var duration = 4200;
        var extra_params = {};

        if ((0, _index.isObject)(options)) {
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

        var voice = isIND(to) ? ind_voice : glob_voice;

        var response = await _axios2.default.post(voice.host + voice.path, options_data);
        return response.data;
    } else {
        throw new Error('to,from and answer_url type error');
    }
};

var makePCMO = exports.makePCMO = async function makePCMO(credentials, to, from, pcmo, options) {

    if ((0, _index.isNumber)(to) && (0, _index.isNumber)(from) && (0, _index.isArray)(pcmo)) {

        var duration = 4200;
        var extra_params = {};

        if ((0, _index.isObject)(options)) {
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
        console.log(options_data);

        var voice = isIND(to) ? ind_voice : glob_voice;

        var response = await _axios2.default.post(voice.host + voice.path, options_data);
        return response.data;
    } else {
        throw new Error('to,from and PCMO input param type error');
    }
};

var isIND = function isIND(number) {
    number = number.toString();
    var cleanedNumber = number.replace(/[\s\-()]/g, '');

    // Check if the number starts with '+91' or '91' (considering country code without '+')
    if (cleanedNumber.startsWith('+91')) {
        return true;
    } else if (cleanedNumber.startsWith('91')) {
        return true;
    }

    return false;
};