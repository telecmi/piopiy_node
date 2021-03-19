import _ from '../underscore/index';
import hold from './hold';
import hangup from './hangup';
import pcmo from './pcmo_call';



const voice = { host: "https://piopiy.telecmi.com", path: "/v1/global_make_call" };

const credentials = {};



exports.setup = ( appid, secret ) => {
    credentials.appid = appid;
    credentials.secret = secret
}


exports.make = ( to, from, answer_url, duration ) => {
    return new Promise( ( solved, rejected ) => {

        if ( _.isNumber( to ) && ( _.isNumber( from ) ) && ( _.isUrl( answer_url ) ) ) {


            var options = {
                "appid": credentials.appid,
                "secret": credentials.secret,
                "from": from,
                "duration": duration,
                "answer_url": answer_url,
                "to": to
            }

            axios.post( voice.host + voice.path, options ).then( ( res ) => {
                solved( res.data )
            } ).catch( ( err ) => {
                rejected( err );
            } )


        } else {
            rejected( 'to,from and answer_url type error' );
        }
    } );
};

exports.call = ( to, from, forward_to, options ) => {
    return pcmo.make( credentials, to, from, forward_to, options )
};

exports.callPCMO = ( to, from, pcmo_obj, duration ) => {
    return pcmo.makePCMO( credentials, to, from, pcmo_obj, duration )
};


exports.connect = ( to, from, forward_to, options ) => {
    return pcmo.connect( credentials, to, from, forward_to, options )
};

exports.hold = ( cmiuuid ) => {
    return hold.hold( credentials.appid, credentials.secret, cmiuuid );
}

exports.unhold = ( cmiuuid ) => {
    return hold.unhold( credentials.appid, credentials.secret, cmiuuid );
}

exports.toggle = ( cmiuuid ) => {
    return hold.toggle( credentials.appid, credentials.secret, cmiuuid );
}

exports.hangup = ( cmiuuid ) => {
    return hangup.hangup( credentials.appid, credentials.secret, cmiuuid );
}
