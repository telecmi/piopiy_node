var request = require('request');


var baseurl = 'https://piopiy.telecmi.com/v1/playaudio';


var playaudio = {
    appid: 11110,
    secret: 'xdcdcdd',
    to: 9677,
    play: {

        "url": "http://example.com/music/thanks.wav"

    }
}


request.post({uri:baseurl,json:playaudio}, function(error, response, body) {
    console.log(body)
});