import { isNumber, isObject, isArray } from '../underscore/index';


export const bridge = ( to, from, option ) => {

    if ( isNumber( from ) && ( isArray( to ) || isNumber( to ) ) ) {

        const bridge = {
            "action": "bridge",
            "from": from,
            "connect": []
        }

        if ( option ) {

            if ( isObject( option ) ) {
                bridge.duration = option.duration || 5400;
                bridge.timeout = option.timeout || 40;
                bridge.loop = option.loop || 1;
                if ( option.ring_type == 'group' ) {
                    bridge.ring_type = option.ring_type
                }

            }
        }


        if ( isNumber( to ) ) {
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


export const connect = ( to, from, option ) => {

    if ( isNumber( from ) && ( isArray( to ) || isNumber( to ) ) ) {

        const bridge = {
            "action": "connect",
            "from": from,
            "connect": []
        }

        if ( option ) {

            if ( isObject( option ) ) {
                bridge.duration = option.duration || 5400;
                bridge.timeout = option.timeout || 40;
                bridge.loop = option.loop || 1;
                bridge.record = option.record || false;

                if ( option.ring_type == 'group' ) {
                    bridge.ring_type = option.ring_type
                }

            }
        }

        if ( isNumber( to ) ) {
            bridge.connect.push( { "type": "sip", "user": to } );
        } else {
            for ( var i in to ) {
                bridge.connect.push( { "type": "sip", "user": to[i] } );
            }
        }

        return bridge;

    } else {
        throw new Error( 'Invalid from or to number in connect' )
    }

}