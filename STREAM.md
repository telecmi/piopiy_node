# Piopiy API - Node.js SDK: Streaming Audio Feature

## Overview

The Piopiy API provides a powerful streaming capability via WebSocket, enabling real-time audio streaming during voice calls. This feature is essential for applications requiring continuous audio streaming, such as live monitoring, real-time transcription, and AI-driven voice analysis.

## Features

- **Real-Time Audio Streaming**: Stream call audio via WebSocket.
- **Configurable Listen Modes**: Choose which side of the call to stream (caller, callee, or both).
- **High-Quality Audio**: Select the desired voice quality (8000, 16000 Hz).
- **Stream on Answer**: Start streaming only when the call is answered.

## Installation

To use the Piopiy API streaming feature, install the `piopiy` package from npm:

```bash
npm install piopiy
```

## Usage Example

Here’s a basic example of how to set up audio streaming during a call:

```javascript
const {Piopiy, PiopiyAction} = require("piopiy");

const piopiy = new Piopiy("your appid", "your app token");

// Define the streaming action
const action = new PiopiyAction();

action.stream("wss://your-websocket-url/webhook/stream", {
        listen_mode: "callee", // Options: 'caller', 'callee', 'both'
        voice_quality: "8000", // Audio quality: '8000', '16000', '32000'
        stream_on_answer: true, // Whether to start streaming on call answer
});

// Make a call with streaming enabled
piopiy.voice
        .call(
                "9194xxxxxx", // first number to connect
                "9180xxxxxx", // Caller ID
                action.PCMO(), // PCMO actions including streaming
                {
                        duration: 30, // (Optional) Maximum duration of the call in seconds
                        timeout: 40, // (Optional) Time to wait for the call to be answered
                        loop: 1, // (Optional) Number of retry attempts if call is not answered
                        record: true, // (Optional) Whether to record the call
                }
        )
        .then((res) => {
                console.log("Call with streaming connected, answer URL:", res);
        })
        .catch((error) => {
                console.error("Error:", error);
        });
```

## Streaming Method Parameters

1. **stream(url, options)**

      - `url` (String): The WebSocket URL to stream the audio.
      - `options` (Object): Optional settings:
           - `listen_mode` (String): Specifies whose audio is streamed. Options: `'caller'`, `'callee'`, or `'both'`.
           - `voice_quality` (String): The audio quality. Options: `'8000'`, `'16000'`.
           - `stream_on_answer` (Boolean): Whether to start streaming only when the call is answered. Default is `true`.

## Example Use Cases

1. **Real-Time Transcription**: Use WebSocket to stream call audio to a transcription service.
2. **Live Call Monitoring**: Stream live audio for quality assurance or monitoring.
3. **Conversational AI**: Integrate real-time audio streaming with a conversational AI system that can interact with users during a call, providing responses and handling queries.
4. **AI Voice Analysis**: Send real-time call audio to an AI model for analysis and insights.

---
