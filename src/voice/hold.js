import _ from '../underscore/index';
import request from 'request';



const voice = { host: "https://piopiy.telecmi.com", path: "/v1/call/action" };
const credentials = {};





exports.hold = ( appid, secret, cmiuuid ) => {
    return new Promise( ( solved, rejected ) => {

        if ( _.isString( cmiuuid ) ) {


            var options = {
                uri: voice.host + voice.path,
                method: 'POST',
                json: {
                    "appid": appid,
                    "secret": secret,
                    "action": 'hold',
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


exports.unhold = ( appid, secret, cmiuuid ) => {
    return new Promise( ( solved, rejected ) => {

        if ( _.isString( cmiuuid ) ) {


            var options = {
                uri: voice.host + voice.path,
                method: 'POST',
                json: {
                    "appid": appid,
                    "secret": secret,
                    "action": 'unhold',
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

exports.toggle = ( appid, secret, cmiuuid ) => {
    return new Promise( ( solved, rejected ) => {

        if ( _.isString( cmiuuid ) ) {


            var options = {
                uri: voice.host + voice.path,
                method: 'POST',
                json: {
                    "appid": appid,
                    "secret": secret,
                    "action": 'holdToggle',
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
