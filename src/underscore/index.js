

exports.isString = ( obj ) => {
    return !!( obj === '' || ( obj && obj.charCodeAt && obj.substr ) );
}

exports.isNumber = ( obj ) => {
    return ( obj === +obj ) || ( toString.call( obj ) === '[object Number]' );
};

exports.isUrl = ( string ) => {
    try {
        new URL( string );
        return true;
    } catch ( _ ) {
        return false;
    }
}

exports.isArray = ( no ) => {
    return Array.isArray( no );
}

exports.isObject = ( obj ) => {
    return obj !== undefined && obj !== null && obj.constructor == Object;
}