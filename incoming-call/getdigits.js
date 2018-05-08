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
        var getdigits= {"get":
                       {
                        "min":1,
                        "max":3,
                        "retry":3,
                        "start":"http://example.com/tablecount.wav",
                        "invalid":"http://example.com/invalid.wav",
                        "post":"http://example.com/nextivr"
                        }
                       }
     
     res.send(getdigits)
 });


 app.listen(5000);