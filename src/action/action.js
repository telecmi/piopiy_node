import _ from '../underscore/index';
import connect from './bridge';
import dtmf from './input';

class PiopiyAction {
    constructor() {
        this.action = [];
    }


    playMusic ( file_name ) {
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

    speak ( text ) {

        if ( _.isString( text ) ) {

            this.action.push( {
                "action": "speak",
                "text": text
            } )

        } else {
            throw new Error( "text is require" );
        }

    }

    setValue ( text ) {

        if ( _.isString( text ) ) {

            this.action.push( {
                "action": "param",
                "text": text
            } )

        } else {
            throw new Error( "text is require" );
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

    call ( to, from, option ) {

        const bridge = connect.bridge( to, from, option )

        this.action.push( bridge );

    }


    forward ( to, from, option ) {

        const sip = connect.connect( to, from, option )

        this.action.push( sip );

    }

    input ( answer_url, option ) {

        const input = dtmf.input( answer_url, option )

        this.action.push( input );

    }

    playGetInput ( answer_url, file_name, option ) {

        const input = dtmf.play_input( answer_url, file_name, option )

        this.action.push( input );

    }


    PCMO () {
        return this.action;
    }

}



module.exports = PiopiyAction;