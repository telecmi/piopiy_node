'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.Piopiy = exports.StreamAction = exports.PiopiyAction = undefined;

var _call = require('./voice/call');

var _call2 = _interopRequireDefault(_call);

var _index = require('./underscore/index');

var _action = require('./action/action');

var _action2 = _interopRequireDefault(_action);

var _stream_action = require('./action/stream_action');

var _stream_action2 = _interopRequireDefault(_stream_action);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Piopiy = function Piopiy(appid, secret) {
    _classCallCheck(this, Piopiy);

    if ((0, _index.isNumber)(appid) && (0, _index.isString)(secret)) {
        this.appid = appid;
        this.secret = secret;
        this.voice = _call2.default;
        this.voice.setup(appid, secret);
    } else {
        throw new Error("appid and secret type error");
    }
};

exports.PiopiyAction = _action2.default;
exports.StreamAction = _stream_action2.default;
exports.Piopiy = Piopiy;