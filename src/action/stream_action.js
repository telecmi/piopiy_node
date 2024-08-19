import { isString, isUrl } from '../underscore/index';
import { bridge, connect } from './bridge';
import { streaming } from './stream';
class StreamAction {
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

    stream ( url, options ) {
        const stream_obj = streaming( url, options );
        this.action.push( stream_obj );
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

    pause () {
        return JSON.stringify( { action: 'pause' } );
    }

    resume () {
        return JSON.stringify( { action: 'resume' } );
    }

    stop () {
        return JSON.stringify( { action: 'stop' } );
    }


    PCMO () {
        const pcmo = this.action;
        this.action = [];
        return JSON.stringify( pcmo );
    }


}

export default StreamAction;
