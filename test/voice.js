const { Piopiy, PiopiyAction } = require( '../lib/index' );


const piopiy = new Piopiy( 2222226, '63555e93-3e5f-42a5-b73b-2a04cd5e3039' );

/*piopiy.voice.call( 919360764976, 914471670850, [919677551930], { loop: 1, timeout: 40, duration: 10 }
).then( ( answer_url ) => {
    console.log( answer_url )
} ).catch( ( error ) => {
    console.log( error )
} );*/

var test = new PiopiyAction();

//test.call( [744905050], 19178094405, { duration: 10, timeout: 50, loop: 5, "ring_type": "group", record: true } );
//test.input( 'https://example.com/action', { timeout: 20, max_digit: 4 } );

//test.playMusic( '1575634505800TeamWaiting09a9a950-1822-11ea-a56c-093d0cd27ba0_piopiy.wav' )

test.playGetInput( 'http://telecmi.ngrok.io/play_get_input', '1575634505800TeamWaiting09a9a950-1822-11ea-a56c-093d0cd27ba0_piopiy.wav', { max_digit: 3, max_retry: 2 } )
//test.hangup();
console.log( test.PCMO() )



piopiy.voice.callPCMO( 919894396168, 19178094405, test.PCMO() ).then( ( answer_url ) => {
    console.log( answer_url )
} ).catch( ( error ) => {
    console.log( error )
} );

