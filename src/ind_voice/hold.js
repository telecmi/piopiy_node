import _ from '../underscore/index';
import axios from 'axios';



const voice = { host: "https://piopiy.telecmi.com", path: "/v1/call/action" };
const credentials = {};





exports.hold = ( appid, secret, cmiuuid ) => {
    return new Promise( ( solved, rejected ) => {

        if ( _.isString( cmiuuid ) ) {


            var options = {
                "appid": appid,
                "secret": secret,
                "action": 'hold',
                "cmiuid": cmiuuid
            }


            axios.post( voice.host + voice.path, options ).then( ( res ) => {
                solved( res.data )
            } ).catch( ( err ) => {
                rejected( err );
            } )


        } else {
            rejected( 'cmiuuid type error' )
        }
    } );
};


exports.unhold = ( appid, secret, cmiuuid ) => {
    return new Promise( ( solved, rejected ) => {

        if ( _.isString( cmiuuid ) ) {


            var options = {
                "appid": appid,
                "secret": secret,
                "action": 'unhold',
                "cmiuid": cmiuuid
            }


            axios.post( voice.host + voice.path, options ).then( ( res ) => {
                solved( res.data )
            } ).catch( ( err ) => {
                rejected( err );
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
                "appid": appid,
                "secret": secret,
                "action": 'holdToggle',
                "cmiuid": cmiuuid
            }


            axios.post( voice.host + voice.path, options ).then( ( res ) => {
                solved( res.data )
            } ).catch( ( err ) => {
                rejected( err );
            } );

        } else {
            rejected( 'cmiuuid type error' )
        }
    } );
};
