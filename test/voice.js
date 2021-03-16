const Piopiy = require( '../lib/index' );


const piopiy = new Piopiy( 2222256, '6ee86ac8-xxxxxxxxxxxxxx' );

/*piopiy.voice.call( 919360764976, 914471670850, [919677551930], { loop: 1, timeout: 40, duration: 10 }
).then( ( answer_url ) => {
    console.log( answer_url )
} ).catch( ( error ) => {
    console.log( error )
} );*/


var test = Piopiy.Actions;

test.call( [919677551930], 914471670850, { duration: 10, timeout: 10, loop: 1, "ring_type": "group" } );

console.log( test.PCMO() )

piopiy.voice.call( 919360764976, 914471670850, test.PCMO() ).then( ( answer_url ) => {
    console.log( answer_url )
} ).catch( ( error ) => {
    console.log( error )
} );

