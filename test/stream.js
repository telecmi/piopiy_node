const { StreamAction } = require( '../lib/index' );



const stream = new StreamAction();


stream.stream( 'wss://ed53-202-21-44-91.ngrok-free.app/webhook/stream', { listen_mode: 'calle', voice_quality: '8000', stream_on_answer: true } );
stream.call( 91989, 9188, { loop: 1, timeout: 40, duration: 30 } );
stream.playMusic( '1616411005409Alsalamawav396b9450-8afe-11eb-9e22-398ab0e302cd_piopiy.wav' );
stream.hangup();
console.log( stream.PCMO() );

console.log( stream.pause() );

console.log( stream.resume() );

console.log( stream.stop() );