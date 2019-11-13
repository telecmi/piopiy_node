"use strict";

var _index = require("../underscore/index");

var _index2 = _interopRequireDefault(_index);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.input = function (action_url, option) {

    if (_index2.default.isUrl(action_url)) {

        var input = {
            "action": "input",
            "action_url": action_url
        };

        if (option) {
            if (_index2.default.isObject(option)) {
                input.max_digit = option.max_digit || 1;
                input.timeout = option.timeout || 5;
            }
        }

        return input;
    } else {
        throw new Error('Invalid action_url format  in input');
    }
};