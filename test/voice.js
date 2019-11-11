const Piopiy = require( 'piopiy' );


const piopiy = new Piopiy( 2222232, '68342a69-159a-4ffe-84df-ff3dcadd01d0' );







piopiy.voice.make( 9894396168, 914471316046, 'https://4ff3d579.ngrok.io/v1/piopiy_action' ).then( ( answer_url ) => {
    console.log( answer_url )
} ).catch( ( err ) => {
    console.log( error )
} );