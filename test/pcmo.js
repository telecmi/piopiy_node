var piopiy = require( '../lib/index' );






var test = piopiy.Action();
test.playMusicName( 'prasath.wav' );
test.playMusicURL( 'https://example.com/welcome.wav' );
test.record();
test.forward( [98946168, 96751930, 744905050], 4471316044, { duration: 10, timeout: 50, loop: 5, "ring_type": "group" } );
test.input( 'https://example.com/action', { timeout: 20, max_digit: 4 } );
test.hangup();
console.log( test.PCMO() )

