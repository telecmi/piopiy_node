'use strict';

var _call = require('./voice/call');

var _call2 = _interopRequireDefault(_call);

var _index = require('./underscore/index');

var _index2 = _interopRequireDefault(_index);

var _action = require('./action/action');

var _action2 = _interopRequireDefault(_action);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Piopiy = function Piopiy(appid, secret) {
    _classCallCheck(this, Piopiy);

    if (_index2.default.isNumber(appid) && _index2.default.isString(secret)) {
        this.appid = appid;
        this.secret = secret;
        _call2.default.setup(appid, secret);
    } else {
        throw new Error("appid and secret type error");
    }
};

Piopiy.prototype.voice = _call2.default;

module.exports = Piopiy;

module.exports.Action = _action2.default;