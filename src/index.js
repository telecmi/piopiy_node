
import voice from './voice/call';
import _ from './underscore/index';
import action from './action/action';




class Piopiy {


    constructor( appid, secret ) {

        if ( _.isNumber( appid ) && ( _.isString( secret ) ) ) {
            this.appid = appid;
            this.secret = secret
            voice.setup( appid, secret );
        } else {
            throw new Error( "appid and secret type error" );
        }

    }

}




Piopiy.prototype.voice = voice;

module.exports = Piopiy;


module.exports.Action = action;





