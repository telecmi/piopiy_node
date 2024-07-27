"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.connect = exports.bridge = undefined;

var _index = require("../underscore/index");

var bridge = exports.bridge = function bridge(to, from, option) {

    if ((0, _index.isNumber)(from) && ((0, _index.isArray)(to) || (0, _index.isNumber)(to))) {

        var _bridge = {
            "action": "bridge",
            "from": from,
            "connect": []
        };

        if (option) {

            if ((0, _index.isObject)(option)) {
                _bridge.duration = option.duration || 5400;
                _bridge.timeout = option.timeout || 40;
                _bridge.loop = option.loop || 1;
                _bridge.record = option.record || false;

                if (option.ring_type == 'group') {
                    _bridge.ring_type = option.ring_type;
                }
            }
        }

        if ((0, _index.isNumber)(to)) {
            _bridge.connect.push({ "type": "pstn", "number": to });
        } else {
            for (var i in to) {
                _bridge.connect.push({ "type": "pstn", "number": to[i] });
            }
        }

        return _bridge;
    } else {
        throw new Error('Invalid from or to number in connect');
    }
};

var connect = exports.connect = function connect(to, from, option) {

    if ((0, _index.isNumber)(from) && ((0, _index.isArray)(to) || (0, _index.isNumber)(to))) {

        var _bridge2 = {
            "action": "connect",
            "from": from,
            "connect": []
        };

        if (option) {

            if ((0, _index.isObject)(option)) {
                _bridge2.duration = option.duration || 5400;
                _bridge2.timeout = option.timeout || 40;
                _bridge2.loop = option.loop || 1;
                _bridge2.record = option.record || false;

                if (option.ring_type == 'group') {
                    _bridge2.ring_type = option.ring_type;
                }
            }
        }

        if ((0, _index.isNumber)(to)) {
            _bridge2.connect.push({ "type": "sip", "user": to });
        } else {
            for (var i in to) {
                _bridge2.connect.push({ "type": "sip", "user": to[i] });
            }
        }

        return _bridge2;
    } else {
        throw new Error('Invalid from or to number in connect');
    }
};