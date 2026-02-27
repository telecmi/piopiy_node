'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.call_hangup = undefined;

var _axios = require('axios');

var _axios2 = _interopRequireDefault(_axios);

var _validators = require('./validators');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var voice = { host: "https://rest.piopiy.com", path: "/v3" };

var call_hangup = exports.call_hangup = async function call_hangup(auth, call_id, reason) {
    var cause = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : "NORMAL_CLEARING";

    var payload = {
        call_id: call_id,
        cause: cause
    };

    if (reason !== undefined && reason !== null) {
        payload.reason = reason;
    }

    (0, _validators.validateHangupRequest)(payload);

    var config = {
        headers: {
            'Authorization': 'Bearer ' + auth,
            'Content-Type': 'application/json'
        }
    };

    var url = '' + voice.host + voice.path + '/voice/call/hangup';
    var response = await _axios2.default.post(url, payload, config);
    return response.data;
};