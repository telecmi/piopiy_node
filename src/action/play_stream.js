import { isString } from '../underscore/index';


export const playBase64Audio = ( audio_base64, audio_type, sample_rate ) => {
    const allowedFormats = ['raw', 'mp3', 'wav', 'ogg'];
    const allowedSampleRates = [8000, 16000];

    if ( !allowedFormats.includes( audio_type ) ) {
        throw new Error( 'audio_type is required to play' );
    }

    if ( !allowedSampleRates.includes( sample_rate ) ) {
        throw new Error( 'sample_rate is required to play' );
    }

    if ( isString( audio_base64 ) ) {
        if ( isBase64( audio_base64 ) ) {
            return JSON.stringify( {
                type: 'streamAudio',
                data: {
                    audioDataType: audio_type,
                    sampleRate: sample_rate,
                    audioData: audio_base64
                }
            } );
        } else {
            throw new Error( 'audio_base64 is not base64' );
        }
    } else {
        throw new Error( 'audio_base64 is required to play' );
    }
}










const isBase64 = ( str ) => {
    try {
        // Attempt to decode the string
        const decoded = Buffer.from( str, 'base64' ).toString( 'base64' );
        return decoded === str;
    } catch ( error ) {
        if ( error )
            return false;
    }
}