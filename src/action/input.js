import _ from '../underscore/index';


exports.input = ( action_url, option ) => {

    if ( _.isUrl( action_url ) ) {

        const input = {
            "action": "input",
            "action_url": action_url
        }

        if ( option ) {
            if ( _.isObject( option ) ) {
                input.max_digit = option.max_digit || 1;
                input.timeout = option.timeout || 5;
            }
        }

        return input;

    } else {
        throw new Error( 'Invalid action_url format  in input' )
    }

}