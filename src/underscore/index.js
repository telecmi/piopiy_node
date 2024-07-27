

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


export const isObject = ( obj ) => {
    return obj !== undefined && obj !== null && obj.constructor == Object;
}