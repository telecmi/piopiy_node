import _ from '../underscore/index';
import request from 'request';



const voice = { host: "https://piopiy.telecmi.com", path: "/v1/call/action" };
const credentials = {};





exports.hangup = ( appid, secret, cmiuuid ) => {
    return new Promise( ( solved, rejected ) => {

        if ( _.isString( cmiuuid ) ) {


            var options = {
                uri: voice.host + voice.path,
                method: 'POST',
                json: {
                    "appid": appid,
                    "secret": secret,
                    "action": 'hangup',
                    "cmiuid": cmiuuid
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
            rejected( 'cmiuuid type error' )
        }
    } );
};



