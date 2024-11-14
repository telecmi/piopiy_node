const { StreamAction } = require( '../lib/index' );



const stream = new StreamAction();

stream.call( [7449], 316044, { duration: 10, timeout: 50, loop: 5, "ring_type": "group" } );
//test.hangup();

stream.playMusic( 'murugan.wav' );

stream.stream( 'wss://ed53-202-21-44-91.ngrok-free.app/webhook/stream', { listen_mode: 'calle', voice_quality: '8000', stream_on_answer: true } );
console.log( stream.playStream( 'UklGRiQAAABXQVZFZm10IBAAAAABAAEAgD4AAAB9AAACABAAZGF0YQAAAAA=', 'mp3', 8000 ) );
console.log( stream.interrupt() );
console.log( stream.PCMO() );

console.log( stream.pause() );

console.log( stream.resume() );

console.log( stream.stop() );