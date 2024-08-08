"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.streaming = undefined;

var _index = require("../underscore/index");

var streaming = exports.streaming = function streaming(url, options) {

    if ((0, _index.isWS)(url)) {
        var stream_obj = { action: "stream", ws_url: url };

        if (options) {
            if (options.listen_mode) {
                stream_obj.listen_mode = options.listen_mode;
            }
            if (options.voice_quality) {
                stream_obj.voice_quality = options.voice_quality;
            }
        }
        return stream_obj;
    } else {
        throw new Error("URL is required and must be a valid WS/WSS URL.");
    }
};