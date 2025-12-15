'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.call_hangup = undefined;

var _index = require('../underscore/index');

var _axios = require('axios');

var _axios2 = _interopRequireDefault(_axios);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var voice = { host: "https://rest.piopiy.com", path: "/v3" };

var call_hangup = exports.call_hangup = async function call_hangup(auth, call_id, reason) {
    var cause = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : "NORMAL_CLEARING";


    if ((0, _index.isString)(call_id)) {

        var payload = {
            call_id: call_id,
            cause: cause,
            reason: reason
        };

        var config = {
            headers: {
                'Authorization': 'Bearer ' + auth,
                'Content-Type': 'application/json'
            }
        };

        var url = '' + voice.host + voice.path + '/voice/ai/hangup'; // Assuming common hangup uses this endpoint, or verify if it's just /voice/hangup? 
        // User pointed to "hangup is common" but initially gave JSON for "voice agent call" context. 
        // I will stick to what worked (`verify_ai.js` used `/voice/ai/hangup`) unless corrected.

        // Wait, if "call only for ai", the endpoint `/voice/ai/call` makes sense.
        // For hangup, if it's common, maybe it's just `/voice/hangup` but with same payload?
        // But user said "see call only for ai but hangup is common" + "we completed ly changed new version".
        // I will use `/voice/ai/hangup` as the specific endpoint that I verified worked with that payload.

        var response = await _axios2.default.post(url, payload, config);
        return response.data;
    } else {
        throw new Error('call_id type error');
    }
};