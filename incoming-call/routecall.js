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
        var  queue= {

                   queue:{

                      record:true,

                      call:[989439,967769],

                      ringback:'https://example.com/waiting.wav' 

                      }

                 }
     
     res.send(queue)
 });


 app.listen(5000);