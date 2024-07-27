
import voice from './voice/call';
import { isNumber, isString } from './underscore/index';
import PiopiyAction from './action/action';




class Piopiy {


    constructor( appid, secret ) {

        if ( isNumber( appid ) && ( isString( secret ) ) ) {
            this.appid = appid;
            this.secret = secret
            this.voice = voice;
            this.voice.setup( appid, secret );
        } else {
            throw new Error( "appid and secret type error" );
        }
    }
}



export {
    PiopiyAction,
    Piopiy
};





