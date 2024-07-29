import { isNumber, isJsonArray } from '../underscore/index';
import { call_hold, call_toggle, call_unhold } from './hold';
import call_hangup from './hangup';
import axios from 'axios';
import { make, makePCMO } from './pcmo_call';
import { isArray, isUrl } from '../../lib/underscore';



const voice = { host: "https://piopiy.telecmi.com", path: "/v1/global_make_call" };

const credentials = {};



const setup = ( appid, secret ) => {
    credentials.appid = appid;
    credentials.secret = secret
}



const create = async ( to, from, answerUrl, duration ) => {

    if ( isNumber( to ) && isNumber( from ) && isUrl( answerUrl ) && isNumber( duration ) ) {

        const options = {
            appid: credentials.appid,
            secret: credentials.secret,
            from: from,
            duration: duration,
            answer_url: answerUrl,
            to: to
        };


        const response = await axios.post( `${voice.host}${voice.path}`, options );
        return response.data;

    } else {
        throw new Error( 'Invalid types for to, from, or answer_url' );
    }
};

const call = ( to, from, to_or_pcmo, options ) => {

    if ( isArray( to_or_pcmo ) ) {
        if ( isJsonArray( to_or_pcmo ) ) {
            return makePCMO( credentials, to, from, to_or_pcmo, options )
        } else {
            return make( credentials, to, from, to_or_pcmo, options )
        }
    } else {
        return make( credentials, to, from, to_or_pcmo, options )
    }
};


const hold = ( cmiuuid ) => {
    return call_hold( credentials.appid, credentials.secret, cmiuuid );
}

const unhold = ( cmiuuid ) => {
    return call_unhold( credentials.appid, credentials.secret, cmiuuid );
}

const toggle = ( cmiuuid ) => {
    return call_toggle( credentials.appid, credentials.secret, cmiuuid );
}

const hangup = ( cmiuuid ) => {
    return call_hangup( credentials.appid, credentials.secret, cmiuuid );
}



const Calls = {
    setup,
    create,
    call,
    hold,
    unhold,
    toggle,
    hangup
};

// Export the object as the default export
export default Calls;