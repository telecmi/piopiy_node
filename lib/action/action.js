'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _index = require('../underscore/index');

var _index2 = _interopRequireDefault(_index);

var _bridge = require('./bridge');

var _bridge2 = _interopRequireDefault(_bridge);

var _input = require('./input');

var _input2 = _interopRequireDefault(_input);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var PiopiyAction = function () {
    function PiopiyAction() {
        _classCallCheck(this, PiopiyAction);

        this.action = [];
    }

    _createClass(PiopiyAction, [{
        key: 'playMusicName',
        value: function playMusicName(file_name) {
            if (_index2.default.isString(file_name)) {

                this.action.push({
                    "action": "play",
                    "file_name": file_name
                });
            } else {
                throw new Error("Filename is require");
            }
        }
    }, {
        key: 'playMusicURL',
        value: function playMusicURL(file_url) {
            if (_index2.default.isUrl(file_url)) {

                this.action.push({
                    "action": "play",
                    "file_url": file_url
                });
            } else {
                throw new Error("FileUrl is require");
            }
        }
    }, {
        key: 'hangup',
        value: function hangup() {

            this.action.push({
                "action": "hangup"
            });
        }
    }, {
        key: 'record',
        value: function record() {
            this.action.push({
                "action": "record"
            });
        }
    }, {
        key: 'call',
        value: function call(to, from, option) {

            var bridge = _bridge2.default.bridge(to, from, option);

            this.action.push(bridge);
        }
    }, {
        key: 'forward',
        value: function forward(to, from, option) {

            var sip = _bridge2.default.connect(to, from, option);

            this.action.push(sip);
        }
    }, {
        key: 'input',
        value: function input(answer_url, option) {

            var input = _input2.default.input(answer_url, option);

            this.action.push(input);
        }
    }, {
        key: 'PCMO',
        value: function PCMO() {
            return this.action;
        }
    }]);

    return PiopiyAction;
}();

var start = function start() {
    return new PiopiyAction();
};

module.exports = start();