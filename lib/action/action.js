'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _index = require('../underscore/index');

var _bridge = require('./bridge');

var _stream = require('./stream');

var _input2 = require('./input');

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var PiopiyAction = function () {
    function PiopiyAction() {
        _classCallCheck(this, PiopiyAction);

        this.action = [];
    }

    _createClass(PiopiyAction, [{
        key: 'playMusic',
        value: function playMusic(filename_or_url) {

            var supportedExtensions = /\.(mp3|wav)$/i;

            if ((0, _index.isString)(filename_or_url) && (0, _index.isUrl)(filename_or_url) && supportedExtensions.test(filename_or_url)) {
                this.action.push({ action: "play", file_url: filename_or_url });
            } else if ((0, _index.isString)(filename_or_url) && supportedExtensions.test(filename_or_url)) {
                this.action.push({ action: "play", file_name: filename_or_url });
            } else {
                throw new Error("Filename or File URL is required and must be a mp3/WAV format.");
            }
        }
    }, {
        key: 'speak',
        value: function speak(text) {
            if ((0, _index.isString)(text)) {
                this.action.push({ action: "speak", text: text });
            } else {
                throw new Error("Text is required and must be a string.");
            }
        }
    }, {
        key: 'setValue',
        value: function setValue(text) {
            if ((0, _index.isString)(text)) {
                this.action.push({ action: "param", text: text });
            } else {
                throw new Error("Text is required and must be a string.");
            }
        }
    }, {
        key: 'stream',
        value: function stream(url, options) {
            var stream_obj = (0, _stream.streaming)(url, options);
            this.action.push(stream_obj);
        }
    }, {
        key: 'hangup',
        value: function hangup() {
            this.action.push({ action: "hangup" });
        }
    }, {
        key: 'record',
        value: function record() {
            this.action.push({ action: "record" });
        }
    }, {
        key: 'call',
        value: function call(to, from, option) {
            var cmi_bridge = (0, _bridge.bridge)(to, from, option);
            this.action.push(cmi_bridge);
        }
    }, {
        key: 'forward',
        value: function forward(to, from, option) {
            var sip = (0, _bridge.connect)(to, from, option);
            this.action.push(sip);
        }
    }, {
        key: 'input',
        value: function input(answerUrl, option) {
            var cmi_input = (0, _input2.input)(answerUrl, option);
            this.action.push(cmi_input);
        }
    }, {
        key: 'playGetInput',
        value: function playGetInput(answerUrl, fileName, option) {
            var input = (0, _input2.play_input)(answerUrl, fileName, option);
            this.action.push(input);
        }
    }, {
        key: 'PCMO',
        value: function PCMO() {
            return this.action;
        }
    }, {
        key: 'clear',
        value: function clear() {
            this.action = [];
            return true;
        }
    }]);

    return PiopiyAction;
}();

exports.default = PiopiyAction;