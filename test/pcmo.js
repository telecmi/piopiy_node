var Piopiy = require( '../lib/index' );



var test = new Piopiy.Actions();

test.call( [7449], 316044, { duration: 10, timeout: 50, loop: 5, "ring_type": "group" } );
//test.input( 'https://example.com/action', { timeout: 20, max_digit: 4 } );
//test.hangup();


var hangup = new Piopiy.Actions();
hangup.hangup()

