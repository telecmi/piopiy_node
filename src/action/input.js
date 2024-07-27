import { isUrl, isObject, isString } from '../underscore/index';


export const input = ( action_url, option ) => {

    if ( isUrl( action_url ) ) {

        const input = {
            "action": "input",
            "action_url": action_url
        }

        if ( option ) {
            if ( isObject( option ) ) {
                input.max_digit = option.max_digit || 1;
                input.timeout = option.timeout || 5;
            }
        }

        return input;

    } else {
        throw new Error( 'Invalid action_url format  in input' )
    }

}

export const play_input = ( action_url, file_name, option ) => {

    if ( ( isUrl( action_url ) ) && ( isString( file_name ) ) ) {

        const input = {
            "action": "play_get_input",
            "file_name": file_name,
            "action_url": action_url
        }

        if ( isUrl( file_name ) ) {
            input.file_url = file_name;
            delete input.file_name;
        }

        if ( option ) {
            if ( isObject( option ) ) {
                input.max_digit = option.max_digit || 1;
                input.max_retry = option.max_retry || 1;
                input.timeout = option.timeout || 5;
            }
        }

        return input;

    } else {
        throw new Error( 'Invalid action_url or file_name format  in play and get input' )
    }

}