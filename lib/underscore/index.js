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

var isObject = exports.isObject = function isObject(obj) {
    return obj !== undefined && obj !== null && obj.constructor == Object;
};