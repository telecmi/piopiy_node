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

exports.play_input = function (action_url, file_name, option) {

    if (_index2.default.isUrl(action_url) && _index2.default.isString(file_name)) {

        var input = {
            "action": "play_get_input",
            "file_name": file_name,
            "action_url": action_url
        };

        if (option) {
            if (_index2.default.isObject(option)) {
                input.max_digit = option.max_digit || 1;
                input.max_retry = option.max_retry || 1;
                input.timeout = option.timeout || 5;
            }
        }

        return input;
    } else {
        throw new Error('Invalid action_url or file_name format  in play and get input');
    }
};