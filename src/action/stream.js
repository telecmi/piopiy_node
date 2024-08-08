import { isWS } from '../underscore/index';


export const streaming = ( url, options ) => {

    if ( isWS( url ) ) {
        const stream_obj = { action: "stream", ws_url: url };

        if ( options ) {
            if ( options.listen_mode ) {
                stream_obj.listen_mode = options.listen_mode;
            }
            if ( options.voice_quality ) {
                stream_obj.voice_quality = options.voice_quality;
            }

            if ( options.stream_on_answer ) {
                stream_obj.stream_on_answer = options.stream_on_answer;
            }


        }
        return stream_obj;
    } else {
        throw new Error( "URL is required and must be a valid WS/WSS URL." );
    }
}