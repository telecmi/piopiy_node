import { isNumber, isArray, isObject } from '../underscore/index';
import axios from 'axios';
import action from '../action/action';


const ind_voice = { host: "https://rest.telecmi.com", path: "/v2/ind_pcmo_make_call" };

const glob_voice = { host: "https://rest.telecmi.com", path: "/v2/global_pcmo_make_call" };




export const make = async ( credentials, to, from, forward_to, options ) => {

    if ( isNumber( to ) && ( isNumber( from ) ) && ( isArray( forward_to ) || isNumber( forward_to ) ) ) {
        const pcmo = new action();
        pcmo.call( forward_to, from, options );

        let duration = 4200;
        let extra_params = {}

        if ( isObject( options ) ) {
            duration = options.duration || duration;
            extra_params = options.extra_params || {};
        }

        var options_data = {
            "appid": credentials.appid,
            "secret": credentials.secret,
            "extra_params": extra_params,
            "from": from,
            "duration": duration,
            "pcmo": pcmo.PCMO(),
            "to": to
        }

        const voice = isIND( to ) ? ind_voice : glob_voice;


        const response = await axios.post( voice.host + voice.path, options_data )
        return response.data;


    } else {
        throw new Error( 'leg_a,from and leg_b param type error' );
    }

};


export const connect = async ( credentials, to, from, forward_to, options ) => {

    if ( isNumber( to ) && ( isNumber( from ) ) && ( isArray( forward_to ) || isNumber( forward_to ) ) ) {
        const pcmo = action;
        pcmo.forward( forward_to, from, options );

        let duration = 4200;
        let extra_params = {}

        if ( isObject( options ) ) {
            duration = options.duration || duration;
            extra_params = options.extra_params || {};
        }

        var options_data = {
            "appid": credentials.appid,
            "secret": credentials.secret,
            "extra_params": extra_params,
            "from": from,
            "duration": duration,
            "pcmo": pcmo.PCMO(),
            "to": to
        }

        const voice = isIND( to ) ? ind_voice : glob_voice;

        const response = await axios.post( voice.host + voice.path, options_data )
        return response.data;


    } else {
        throw new Error( 'to,from and answer_url type error' );
    }

};


export const makePCMO = async ( credentials, to, from, pcmo, options ) => {





    if ( isNumber( to ) && ( isNumber( from ) ) && ( isArray( pcmo ) ) ) {


        let duration = 4200;
        let extra_params = {};

        if ( isObject( options ) ) {
            duration = options.duration || duration;
            extra_params = options.extra_params || {};
        }



        var options_data = {
            "appid": credentials.appid,
            "secret": credentials.secret,
            "extra_params": extra_params,
            "from": from,
            "duration": duration,
            "pcmo": pcmo,
            "to": to
        }


        const voice = isIND( to ) ? ind_voice : glob_voice;

        const response = await axios.post( voice.host + voice.path, options_data )
        return response.data;


    } else {
        throw new Error( 'to,from and PCMO input param type error' );
    }

};


const isIND = ( number ) => {
    number = number.toString();
    const cleanedNumber = number.replace( /[\s\-()]/g, '' );

    // Check if the number starts with '+91' or '91' (considering country code without '+')
    if ( cleanedNumber.startsWith( '+91' ) ) {
        return true;
    } else if ( cleanedNumber.startsWith( '91' ) ) {
        return true;
    }

    return false;
}

