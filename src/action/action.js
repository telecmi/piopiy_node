import _ from '../underscore/index';
import connect from './bridge';
import dtmf from './input';

class PiopiyAction {
    constructor() {
        this.action = [];
    }


    playMusicName ( file_name ) {
        if ( _.isString( file_name ) ) {

            this.action.push( {
                "action": "play",
                "file_name": file_name
            } )

        } else {
            throw new Error( "Filename is require" );
        }
    }

    playMusicURL ( file_url ) {
        if ( _.isUrl( file_url ) ) {

            this.action.push( {
                "action": "play",
                "file_url": file_url
            } )

        } else {
            throw new Error( "FileUrl is require" );
        }
    }


    hangup () {

        this.action.push( {
            "action": "hangup"
        } );

    }

    record () {
        this.action.push( {
            "action": "record"
        } );
    }

    forward ( to, from, option ) {

        const bridge = connect.bridge( to, from, option )

        this.action.push( bridge );

    }

    input ( answer_url, option ) {

        const input = dtmf.input( answer_url, option )

        this.action.push( input );

    }


    PCMO () {
        return this.action;
    }

}


const start = () => {
    return new PiopiyAction();
}

module.exports = start;