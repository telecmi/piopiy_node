"use strict";

var _index = require("../underscore/index");

var _index2 = _interopRequireDefault(_index);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.bridge = function (to, from, option) {

    if (_index2.default.isNumber(from) && (_index2.default.isArray(to) || _index2.default.isNumber(to))) {

        var bridge = {
            "action": "bridge",
            "from": from,
            "connect": []
        };

        if (option) {

            if (_index2.default.isObject(option)) {
                bridge.duration = option.duration || 5400;
                bridge.timeout = option.timeout || 40;
                bridge.loop = option.loop || 1;
                bridge.record = option.record || false;

                if (option.ring_type == 'group') {
                    bridge.ring_type = option.ring_type;
                }
            }
        }

        if (_index2.default.isNumber(to)) {
            bridge.connect.push({ "type": "pstn", "number": to });
        } else {
            for (var i in to) {
                bridge.connect.push({ "type": "pstn", "number": to[i] });
            }
        }

        return bridge;
    } else {
        throw new Error('Invalid from or to number in connect');
    }
};

exports.connect = function (to, from, option) {

    if (_index2.default.isNumber(from) && (_index2.default.isArray(to) || !_index2.default.isEmpty(to))) {

        var bridge = {
            "action": "connect",
            "from": from,
            "connect": []
        };

        if (option) {

            if (_index2.default.isObject(option)) {
                bridge.duration = option.duration || 5400;
                bridge.timeout = option.timeout || 40;
                bridge.loop = option.loop || 1;
                bridge.record = option.record || false;

                if (option.ring_type == 'group') {
                    bridge.ring_type = option.ring_type;
                }
            }
        }

        if (_index2.default.isNumber(to)) {
            bridge.connect.push({ "type": "sip", "user": to });
        } else {
            for (var i in to) {
                bridge.connect.push({ "type": "sip", "user": to[i] });
            }
        }

        return bridge;
    } else {
        throw new Error('Invalid from or to number in connect');
    }
};