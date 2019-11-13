import _ from '../underscore/index';


exports.bridge = ( to, from, option ) => {

    if ( _.isNumber( from ) && ( _.isArray( to ) || _.isNumber( to ) ) ) {

        const bridge = {
            "action": "bridge",
            "from": from,
            "connect": []
        }

        if ( option ) {

            if ( _.isObject( option ) ) {
                bridge.duration = option.duration || 5400;
                bridge.timeout = option.timeout || 40;
                bridge.loop = option.loop || 1;

                if ( option.ring_type == 'group' ) {
                    bridge.ring_type = option.ring_type
                }

            }
        }

        if ( _.isNumber( to ) ) {
            bridge.connect.push( { "type": "pstn", "number": to } );
        } else {
            for ( var i in to ) {
                bridge.connect.push( { "type": "pstn", "number": to[i] } );
            }
        }

        return bridge;

    } else {
        throw new Error( 'Invalid from or to number in connect' )
    }

}