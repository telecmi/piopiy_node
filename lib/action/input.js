"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.play_input = exports.input = undefined;

var _index = require("../underscore/index");

var input = exports.input = function input(action_url, option) {

    if ((0, _index.isUrl)(action_url)) {

        var _input = {
            "action": "input",
            "action_url": action_url
        };

        if (option) {
            if ((0, _index.isObject)(option)) {
                _input.max_digit = option.max_digit || 1;
                _input.timeout = option.timeout || 5;
            }
        }

        return _input;
    } else {
        throw new Error('Invalid action_url format  in input');
    }
};

var play_input = exports.play_input = function play_input(action_url, file_name, option) {

    if ((0, _index.isUrl)(action_url) && (0, _index.isString)(file_name)) {

        var _input2 = {
            "action": "play_get_input",
            "file_name": file_name,
            "action_url": action_url
        };

        if ((0, _index.isUrl)(file_name)) {
            _input2.file_url = file_name;
            delete _input2.file_name;
        }

        if (option) {
            if ((0, _index.isObject)(option)) {
                _input2.max_digit = option.max_digit || 1;
                _input2.max_retry = option.max_retry || 1;
                _input2.timeout = option.timeout || 5;
            }
        }

        return _input2;
    } else {
        throw new Error('Invalid action_url or file_name format  in play and get input');
    }
};