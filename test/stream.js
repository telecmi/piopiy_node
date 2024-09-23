const { StreamAction } = require( '../lib/index' );



const stream = new StreamAction();


console.log( stream.PCMO() );

console.log( stream.pause() );

console.log( stream.resume() );

console.log( stream.stop() );