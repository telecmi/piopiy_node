const { Piopiy, PiopiyAction } = require( '../lib/index' );



var test = new PiopiyAction();

test.call( [1434534, 1234456], 316044, { duration: 10, timeout: 50, loop: 5, "ring_type": "group" } );
//test.input( 'https://example.com/action', { timeout: 20, max_digit: 4 } );
//test.hangup();

console.log( test.PCMO() );

