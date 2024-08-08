const { PiopiyAction } = require( '../lib/index' );



const test = new PiopiyAction();

//test.call( [7449], 316044, { duration: 10, timeout: 50, loop: 5, "ring_type": "group" } );
//test.input( 'https://example.com/action', { timeout: 20, max_digit: 4 } );
//test.hangup();



test.stream( 'wss://ed53-202-21-44-91.ngrok-free.app/webhook/stream', { listen_mode: 'calle', voice_quality: '8000' } );

console.log( test.action );