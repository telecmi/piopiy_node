
import voice from './voice/call';
import ind_voice from './ind_voice/call';
import _ from './underscore/index';
import action from './action/action';




class Piopiy {


    constructor( appid, secret ) {

        if ( _.isNumber( appid ) && ( _.isString( secret ) ) ) {
            this.appid = appid;
            this.secret = secret
            voice.setup( appid, secret );
            ind_voice.setup( appid, secret );
        } else {
            throw new Error( "appid and secret type error" );
        }


        this.voice = voice;
        this.voiceInd = ind_voice;


    }

}



module.exports = Piopiy;
module.exports.Actions = action;





