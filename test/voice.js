const { Piopiy, PiopiyAction } = require( '../lib/index' );


const piopiy = new Piopiy( 2223123, 'xxxxxxcccc' );
var test = new PiopiyAction();
test.playGetInput( 'https://ed53-202-21-44-91.ngrok-free.app/webhook/dtmf', '1616411005409Alsalamawav396b9450-8afe-11eb-9e22-398ab0e302cd_piopiy.wav', { max_digit: 3, max_retry: 2 } )
// test.playMusic( '1616411005409Alsalamawav396b9450-8afe-11eb-9e22-398ab0e302cd_piopiy.wav' );
test.call( 91989, 9180, { duration: 10, timeout: 20, loop: 1, record: true } );
// test.speak( 'Hello, Welcome to Telecmi' );
// test.setValue( 'name' );
// test.input( 'https://example.com/action', { timeout: 20, max_digit: 4, min_digit: 2 } );
// test.hangup();
// test.record();
piopiy.voice.call( 91989, 9188, test.PCMO(), { loop: 1, timeout: 40, duration: 30 }
).then( ( answer_url ) => {
    console.log( answer_url )
} ).catch( ( error ) => {
    console.log( error )
} );





