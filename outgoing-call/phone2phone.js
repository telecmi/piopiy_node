var request = require('request');


var baseurl = 'https://piopiy.telecmi.com/v1/phone2phone';


var p2p = {
    from: 9894,
    appid: 11110,
    secret: 'xdcdcdd',
    to: 9677
}



request.post({uri:baseurl,json: p2p }, function(error, response, body) {
    console.log(body)
});

