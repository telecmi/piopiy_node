'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.PipelineBuilder = exports.StreamAction = exports.PiopiyAction = exports.Piopiy = undefined;

var _index = require('./underscore/index');

var _action = require('./action/action');

var _action2 = _interopRequireDefault(_action);

var _stream_action = require('./action/stream_action');

var _stream_action2 = _interopRequireDefault(_stream_action);

var _ai_agent = require('./voice/ai_agent');

var _ai_agent2 = _interopRequireDefault(_ai_agent);

var _voice = require('./voice/voice');

var _voice2 = _interopRequireDefault(_voice);

var _pcmo = require('./voice/pcmo');

var _pcmo2 = _interopRequireDefault(_pcmo);

var _flow = require('./voice/flow');

var _flow2 = _interopRequireDefault(_flow);

var _pipeline = require('./voice/pipeline');

var _pipeline2 = _interopRequireDefault(_pipeline);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Piopiy = function Piopiy(token, secret) {
    _classCallCheck(this, Piopiy);

    if ((0, _index.isString)(token) && secret === undefined) {
        this.auth = token;
        this.ai = new _ai_agent2.default(this.auth);
        this.voice = new _voice2.default(this.auth);
        this.pcmo = new _pcmo2.default(this.auth);
        this.flow = new _flow2.default(this.auth);
    } else {
        throw new Error("From v1.0.9, Piopiy only supports Bearer Token authentication. Init with `new Piopiy('YOUR_TOKEN')`.");
    }
};

exports.Piopiy = Piopiy;
exports.PiopiyAction = _action2.default;
exports.StreamAction = _stream_action2.default;
exports.PipelineBuilder = _pipeline2.default;