 var express = require('express');
 var bodyParser = require("body-parser");
 var app = express();

 app.use(bodyParser.urlencoded({ extended: false }));
 app.use(bodyParser.json());

 app.post('/you-have-call', function(req, res) {
     //Request body
     var did = req.body.did;
     var from = req.body.from;

     //JSON responce to PIOPIY       
      var ivr= {
  "ivr": {
    "welcome": {
      "play": {
        "url": "http://example.com/welcomev21.wav"
      }
    },
    "invalid": {
      "play": {
        "url": "http://example.com/welcomev21.wav"
      }
    },
    "retry": 3,
    "min": 1,
    "max": 1,
    "if": {
      "1": {
        "queue": {
          "record": true,
          "ringback": "http://example.com/saleswait.wav",
          "call": [989439,978985]
        }
      },
      "2": {
        "queue": {
          "record": true,
          "ringback": "http://example.com/supportwait.wav",
          "call": [989439,978985]
        }
      },
      "3": {
        "http": {
          "method": "POST",
          "url": "http://example.com/v21nextivr"
        }
      },
      "9": {
        "replay": true
      }
    }
  }
}
     
     res.send(ivr)
 });


 app.post('/v21nextivr', function(req, res) {
     //Request body
     var did = req.body.did;
     var from = req.body.from;
     var dtmf = req.body.dtmf;

     var play = {
      'play':{
        'url':'http://example.com/thanks.wav'
      }
     }
     
     res.send(play)
 });


 app.listen(5000);