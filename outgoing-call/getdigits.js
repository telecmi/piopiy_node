var request = require('request');


var baseurl = 'https://piopiy.telecmi.com/v1/getdigits';


var getdigits = {
    appid: 11110,
    secret: 'xdcdcdd',
    to: 9677, 
    get: {
        start: "http://example.com/waiting.wav",
        invalid: "http://example.com/invalid.wav",
        min: 1,
        max: 1,
        post: "http://example.com/option"
    }
}


request.post({uri:baseurl,json:getdigits }, function(error, response, body) {
    console.log(body)
});