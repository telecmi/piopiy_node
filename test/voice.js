const Piopiy = require( '../lib/index' );


const piopiy = new Piopiy( 2222232, '68342a69-xxxxx-xxxxxxxxx-xxxx-xxxx' );

piopiy.voice.make(
    'your_to_number',
    'your_piopiy_phone_number',
    'your_answer_url'
).then( ( answer_url ) => {
    console.log( answer_url )
} ).catch( ( error ) => {
    console.log( error )
} );


piopiy.voice.hangup( 'uuidid' ).then( ( suc ) => {
    console.log( suc )
} ).catch( ( error ) => {
    console.log( error )
} )