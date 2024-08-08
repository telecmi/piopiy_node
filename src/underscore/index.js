

export const isString = ( obj ) => {
    return Boolean( obj === '' || ( obj && obj.charCodeAt && obj.substr ) );
}

export const isNumber = ( obj ) => {
    return ( obj === Number( obj ) ) || ( toString.call( obj ) === '[object Number]' );
};

export const isUrl = ( string ) => {
    try {
        new URL( string );
        return true;

    } catch ( e ) {
        if ( e )
            return false;
    }
}

export const isArray = ( no ) => {
    return Array.isArray( no );
}

export const isJsonArray = ( obj ) => {
    try {

        if ( obj[0].action ) {
            return true;
        } else {
            return false;
        }

    } catch ( e ) {
        if ( e )
            return false;

    }
}


export const isObject = ( obj ) => {
    return obj !== undefined && obj !== null && obj.constructor == Object;
}

export const isWS = ( url ) => {
    try {
        const regex = /^wss?:\/\/([a-zA-Z0-9-]+(\.[a-zA-Z0-9-]+)*|\[[0-9a-fA-F:]+\])(:\d+)?(\/.*)?$/;
        return regex.test( url );
    } catch ( e ) {
        if ( e )
            return false;
    }
}