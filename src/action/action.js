import { isString, isUrl } from '../underscore/index';
import { bridge, connect } from './bridge';
import { play_input, input } from './input';

class PiopiyAction {
    constructor() {
        this.action = [];
    }

    playMusic ( filename_or_url ) {

        const supportedExtensions = /\.(mp3|wav)$/i;

        if ( isString( filename_or_url ) && isUrl( filename_or_url ) && supportedExtensions.test( filename_or_url ) ) {
            this.action.push( { action: "play", file_url: filename_or_url } );
        } else if ( isString( filename_or_url ) && supportedExtensions.test( filename_or_url ) ) {
            this.action.push( { action: "play", file_name: filename_or_url } );
        } else {
            throw new Error( "Filename or File URL is required and must be a mp3/WAV format." );
        }


    }



    speak ( text ) {
        if ( isString( text ) ) {
            this.action.push( { action: "speak", text } );
        } else {
            throw new Error( "Text is required and must be a string." );
        }
    }

    setValue ( text ) {
        if ( isString( text ) ) {
            this.action.push( { action: "param", text } );
        } else {
            throw new Error( "Text is required and must be a string." );
        }
    }

    hangup () {
        this.action.push( { action: "hangup" } );
    }

    record () {
        this.action.push( { action: "record" } );
    }

    call ( to, from, option ) {
        const cmi_bridge = bridge( to, from, option );
        this.action.push( cmi_bridge );
    }

    forward ( to, from, option ) {
        const sip = connect( to, from, option );
        this.action.push( sip );
    }

    input ( answerUrl, option ) {
        const cmi_input = input( answerUrl, option );
        this.action.push( cmi_input );
    }

    playGetInput ( answerUrl, fileName, option ) {
        const input = play_input( answerUrl, fileName, option );
        this.action.push( input );
    }

    PCMO () {
        return this.action;
    }

    clear () {
        this.action = [];
        return true;
    }
}

export default PiopiyAction;
