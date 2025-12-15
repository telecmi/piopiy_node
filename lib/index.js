'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.StreamAction = exports.PiopiyAction = exports.Piopiy = undefined;

var _call = require('./voice/call');

var _call2 = _interopRequireDefault(_call);

var _hangup = require('./voice/hangup');

var _index = require('./underscore/index');

var _action = require('./action/action');

var _action2 = _interopRequireDefault(_action);

var _stream_action = require('./action/stream_action');

var _stream_action2 = _interopRequireDefault(_stream_action);

var _ai_agent = require('./voice/ai_agent');

var _ai_agent2 = _interopRequireDefault(_ai_agent);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Piopiy = function Piopiy(appid, secret) {
    var _this = this;

    _classCallCheck(this, Piopiy);

    // Enforce strict new auth: Only Token allowed.
    if ((0, _index.isString)(appid) && secret === undefined) {
        this.auth = appid;
        this.ai = new _ai_agent2.default(this.auth);

        // Common hangup wrapper
        this.voice = {
            hangup: function hangup(call_id, reason, cause) {
                return (0, _hangup.call_hangup)(_this.auth, call_id, reason, cause);
            }
        };
    } else {
        throw new Error("From v1.0.9, Piopiy only supports Bearer Token authentication. Init with `new Piopiy('YOUR_TOKEN')`.");
    }
};

exports.Piopiy = Piopiy;
exports.PiopiyAction = _action2.default;
exports.StreamAction = _stream_action2.default;