import _ from '../underscore/index';
import axios from 'axios';
import action from '../action/action';


//const voice = { host: "https://piopiy.telecmi.com", path: "/v1/global_pcmo_make_call" };
const voice = { host: "http://localhost:8181", path: "/v1/global_pcmo_make_call" };
const credentials = {};





exports.make = ( credentials, to, from, forward_to, options ) => {



    return new Promise( ( solved, rejected ) => {


        if ( _.isNumber( to ) && ( _.isNumber( from ) ) && ( _.isArray( forward_to ) || _.isNumber( forward_to ) ) ) {
            let pcmo = action;
            pcmo.call( forward_to, from, options );

            let duration = 4200;

            if ( _.isObject( options ) ) {
                duration = options.duration || duration;
            }

            var options_data = {
                "appid": credentials.appid,
                "secret": credentials.secret,
                "from": from,
                "duration": duration,
                "pcmo": pcmo.PCMO(),
                "to": to
            }

            axios.post( voice.host + voice.path, options_data ).then( ( res ) => {
                solved( res.data )
            } ).catch( ( err ) => {
                rejected( err );
            } )

        } else {
            rejected( 'to,from and answer_url type error' );
        }
    } );
};


exports.connect = ( credentials, to, from, forward_to, options ) => {



    return new Promise( ( solved, rejected ) => {


        if ( _.isNumber( to ) && ( _.isNumber( from ) ) && ( _.isArray( forward_to ) || !_.isEmpty( forward_to ) ) ) {
            let pcmo = action;
            pcmo.forward( forward_to, from, options );

            let duration = 4200;

            if ( _.isObject( options ) ) {
                duration = options.duration || duration;
            }

            var options_data = {
                "appid": credentials.appid,
                "secret": credentials.secret,
                "from": from,
                "duration": duration,
                "pcmo": pcmo.PCMO(),
                "to": to
            }

            axios.post( voice.host + voice.path, options_data ).then( ( res ) => {
                solved( res.data )
            } ).catch( ( err ) => {
                rejected( err );
            } )

        } else {
            rejected( 'to,from and answer_url type error' );
        }
    } );
};


exports.makePCMO = ( credentials, to, from, pcmo, durations ) => {



    return new Promise( ( solved, rejected ) => {


        if ( _.isNumber( to ) && ( _.isNumber( from ) ) && ( _.isArray( pcmo ) ) ) {


            let duration = durations || 4200;



            var options_data = {
                "appid": credentials.appid,
                "secret": credentials.secret,
                "from": from,
                "duration": duration,
                "pcmo": pcmo,
                "to": to
            }

            axios.post( voice.host + voice.path, options_data ).then( ( res ) => {
                solved( res.data )
            } ).catch( ( err ) => {
                rejected( err );
            } )

        } else {
            rejected( 'to,from and answer_url type error' );
        }
    } );
};

