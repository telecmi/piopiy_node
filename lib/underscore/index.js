'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
var isString = exports.isString = function isString(obj) {
    return Boolean(obj === '' || obj && obj.charCodeAt && obj.substr);
};

var isNumber = exports.isNumber = function isNumber(obj) {
    return obj === Number(obj) || toString.call(obj) === '[object Number]';
};

var isUrl = exports.isUrl = function isUrl(string) {
    try {
        new URL(string);
        return true;
    } catch (e) {
        if (e) return false;
    }
};

var isArray = exports.isArray = function isArray(no) {
    return Array.isArray(no);
};

var isJsonArray = exports.isJsonArray = function isJsonArray(obj) {
    try {

        if (obj[0].action) {
            return true;
        } else {
            return false;
        }
    } catch (e) {
        if (e) return false;
    }
};

var isObject = exports.isObject = function isObject(obj) {
    return obj !== undefined && obj !== null && obj.constructor == Object;
};

var isWS = exports.isWS = function isWS(url) {
    try {
        var regex = /^wss?:\/\/([a-zA-Z0-9-]+(\.[a-zA-Z0-9-]+)*|\[[0-9a-fA-F:]+\])(:\d+)?(\/.*)?$/;
        return regex.test(url);
    } catch (e) {
        if (e) return false;
    }
};