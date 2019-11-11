import _ from '../underscore/index';
import request from 'request';



const voice = { host: "https://piopiy.telecmi.com", path: "/v1/make_call" };
const credentials = {};



exports.setup = ( appid, secret ) => {
    credentials.appid = appid;
    credentials.secret = secret
}


exports.make = ( to, from, answer_url, duration ) => {
    return new Promise( ( solved, rejected ) => {

        if ( _.isNumber( to ) && ( _.isNumber( from ) ) && ( _.isUrl( answer_url ) ) ) {


            var options = {
                uri: voice.host + voice.path,
                method: 'POST',
                json: {
                    "appid": credentials.appid,
                    "secret": credentials.secret,
                    "from": from,
                    "duration": duration,
                    "answer_url": answer_url,
                    "to": to
                }
            };

            request( options, function ( error, res, body ) {
                if ( !error && res.statusCode == 200 ) {
                    solved( body )
                } else {
                    solved( error )
                }
            } );
        } else {
            rejected( 'to,from and answer_url type error' )
        }
    } );
};
