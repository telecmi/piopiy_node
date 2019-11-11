'use strict';

exports.isString = function (obj) {
    return !!(obj === '' || obj && obj.charCodeAt && obj.substr);
};

exports.isNumber = function (obj) {
    return obj === +obj || toString.call(obj) === '[object Number]';
};

exports.isUrl = function (string) {
    try {
        new URL(string);
        return true;
    } catch (_) {
        return false;
    }
};

exports.isIndno = function (no) {};