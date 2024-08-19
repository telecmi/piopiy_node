# Piopiy API - Node.js SDK

## Overview

Piopiy API provides a comprehensive Node.js SDK for managing and controlling voice interactions using our PCMO Actions. This SDK allows developers to integrate voice functionalities such as making calls, playing audio, recording, Real Time Streaming and more into their Node.js applications.

## PCMO Features

- **Make Calls**: Initiate voice calls between two parties or multiple numbers.
- **Play and Get Input**: Play a media file or URL and get user input via DTMF.
- **Play Music**: Stream audio files or URLs during a call.
- **Text-to-Speech**: Convert text to speech during a call.
- **Set Values and Inputs**: Set custom values and collect user inputs.
- **Stream Audio**: Stream audio via WebSocket during a call.
- **Record Calls**: Record voice calls.
- **Hangup Calls**: Terminate calls programmatically.

## Authentication

The API requires an API Key and Secret for authentication, passed during the initialization of the `Piopiy` object.

## Dependencies

- Node.js
- npm (Node Package Manager)
- `piopiy` npm package

## Installation

To use the Piopiy API, install the `piopiy` package from npm:

```bash
npm install piopiy
```

## Usage

Here’s a basic example of how to use the Piopiy API:

```javascript
const {Piopiy, PiopiyAction} = require("piopiy");

const piopiy = new Piopiy("your appid", "your app token");

//Call two number with custome caller id
piopiy.voice
        .call("first_phone_number", "piopiy_callerid", "second_phone_number", {
                loop: 1,
                timeout: 40,
                duration: 30,
        })
        .then((res) => {
                console.log(res);
        })
        .catch((error) => {
                console.log(error);
        });

//Call and perform PCMO action
var action = new PiopiyAction();

action.playGetInput(
        "https://example.com/webhook/dtmf",
        "https://example.com/your_audio_file.wav",
        {max_digit: 3, max_retry: 2}
);

piopiy.voice
        .call("dest_phone_number", "piopiy_callerid", action.PCMO(), {
                loop: 1,
                timeout: 40,
                duration: 30,
        })
        .then((res) => {
                console.log(res);
        })
        .catch((error) => {
                console.log(error);
        });
```

## Make Call

The call() method in the Piopiy Node.js SDK is designed to handle different types of call interactions. It supports connecting two numbers, handling multiple numbers, and executing PCMO (Programmable Call Media Operations) actions during a call.

## Usage

### 1. Making a Basic Call

To initiate a call between two numbers:

```javascript
piopiy.voice.call(
  9194xxxxxx,         // first number to connect
  9180xxxxxx,         // Callerid
  9180xxxxxx,         // second number to connect
  {
    duration: 30,       // (Optional) Maximum duration of the call in seconds
    timeout: 40,        // (Optional) Time to wait for the call to be answered
    loop: 1,            // (Optional) Number of retry attempts if call is not answered
    record: true        // (Optional) Whether to record the call
  }
).then(res => {
  console.log('Call connected, answer URL:',resl);
}).catch(error => {
  console.error('Error:', error);
});
```

### 2. Making a Call with PCMO Actions

To make a call and perform specific PCMO actions, such as playing an audio file:

```javascript
// Define PCMO actions
action.playMusic('https://example.com/your_music_file.wav');

piopiy.voice.call(
  9194xxxxxx,         // first number to connect
  9180xxxxxx,         // Callerid
  action.PCMO(),        // PCMO actions to execute during the call
  {
    duration: 30,       // (Optional) Maximum duration of the call in seconds
    timeout: 40,        // (Optional) Time to wait for the call to be answered
    loop: 1,            // (Optional) Number of retry attempts if call is not answered
    record: true        // (Optional) Whether to record the call
  }
).then(res => {
  console.log('Call with PCMO actions connected, answer URL:', res);
}).catch(error => {
  console.error('Error:', error);
});
```

### 3.Streaming Audio During a Call

To stream audio during a call using WebSocket:

```javascript
const test = new PiopiyAction();

test.stream(
  "wss://your-websocket-url/webhook/stream",
  {
    listen_mode: "callee", // Options: 'caller', 'callee', 'both'
    voice_quality: "8000", // Audio quality: '8000', '16000', '32000'
    stream_on_answer: true, // Whether to start streaming on call answer
  }
);

piopiy.voice
  .call(
    9194xxxxxx, // first number to connect
    9180xxxxxx, // Caller ID
    test.PCMO(), // PCMO actions, including streaming
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

### 4. Handling Multiple Numbers

To attempt connecting a call to multiple numbers sequentially:

```javascript
piopiy.voice.call(
  9194xxxxxx,         // first number to connect
  9180xxxxxx,         // Callerid
  [9180xxxxx, 9196xxxx], // Array of second numbers connect
  {
    duration: 30,       // (Optional) Maximum duration of the call in seconds
    timeout: 40,        // (Optional) Time to wait for each call to be answered
    loop: 1,            // (Optional) Number of retry attempts for each number
    record: true        // (Optional) Whether to record the call
  }
).then(res => {
  console.log('Call to multiple numbers connected, answer URL:', res);
}).catch(error => {
  console.error('Error:', error);
});
```

### `options` (Object) - Optional

- `duration` (Number): Maximum call duration in seconds.
- `timeout` (Number): Time in seconds to wait for each call to be answered.
- `loop` (Number): Number of retry attempts for each call.
- `record` (Boolean): Whether to record the call.

---

## PCMO (Piopiy Call Management Object)

The PCMO is a powerful tool that enables you to define specific actions to be executed during a call. These actions can include playing audio files, collecting user input, speaking text, and more.

### Setting Up PCMO Actions

To use PCMO, you need to create an instance of the `PiopiyAction` class and define the actions you want to perform. Once defined, these actions can be passed to the `call()` method to be executed during the call.

```javascript
const {Piopiy, PiopiyAction} = require("piopiy");

// Initialize Piopiy with your API Key and Secret
const piopiy = new Piopiy("YOUR_API_KEY", "YOUR_API_SECRET");
var action = new PiopiyAction();
```

### Example Actions

1. **Playing Audio**

      - Play a specified audio file or URL during the call.

      ```javascript
      action.playMusic("https://example.com/your_music_file.wav");
      ```

2. **Collecting DTMF Input**

      - Play a message and collect user input via DTMF tones.

      ```javascript
      action.playGetInput(
              "https://example.com/webhook/dtmf",
              "https://example.com/your_audio_file.wav",
              {max_digit: 3, max_retry: 2}
      );
      ```

3. **Text-to-Speech**

      - Convert and play text as speech during the call.

      ```javascript
      action.speak("Hello, Welcome to Telecmi");
      ```

4. **Setting Custom Values**

      - Set custom values for use during the call session.

      ```javascript
      action.setValue("name");
      ```

5. **Collecting Input**

      - Collect user input, such as key presses, and send them to a specified URL.

      ```javascript
      action.input("https://example.com/action", {
              timeout: 20,
              max_digit: 4,
              min_digit: 2,
      });
      ```

6. **Recording the Call**

      - Record the call session.

      ```javascript
      action.record();
      ```

7. **Ending the Call**

      - Hang up the call.

      ```javascript
      action.hangup();
      ```

8. **Connecting to Other Numbers**

      - Attempt to connect the caller to multiple numbers in sequence until one answers.

      ```javascript
      action.call(9198xxxxxx, [9180xxxx, 9180xxxx], { duration: 10, timeout: 20, loop: 2, record: true });
      ```

9. **Clearing Actions**

      - Clear all defined actions.

      ```javascript
      action.clear();
      ```

### Using PCMO in a Call

After defining the desired actions, use the `action.PCMO()` method to pass them to the `call()` method:

```javascript
piopiy.voice.call(
  9194xxxxxx,         // first number to connect
  9180xxxxxx,         // Callerid
  9180xxxxxx,         // second number to connect
  action.PCMO(),         // PCMO actions
  {
    duration: 30,        // (Optional) Maximum duration of the call in seconds
    timeout: 40,         // (Optional) Time to wait for the call to be answered
    loop: 1,             // (Optional) Number of retry attempts if call is not answered
    record: true         // (Optional) Whether to record the call
  }
).then(answer_url => {
  console.log('Call with PCMO actions connected, answer URL:', answer_url);
}).catch(error => {
  console.error('Error:', error);
});
```

### PCMO Method Parameters

1. **playMusic(audioFileOrUrl)**

      - `audioFileOrUrl` (String): The URL or path to the audio file to be played.

2. **playGetInput(url, audioFileOrUrl, options)**

      - `url` (String): The URL to send the DTMF input to.
      - `audioFileOrUrl` (String): The URL or path to the audio file to be played.
      - `options` (Object): Optional settings:
           - `max_digit` (Number): Maximum number of digits to capture.
           - `max_retry` (Number): Number of retry attempts.

3. **speak(text)**

      - `text` (String): The text to convert to speech.

4. **setValue(key)**

      - `key` (String): The key name for the value to set.

5. **input(url, options)**

      - `url` (String): The URL to send the input data to.
      - `options` (Object): Optional settings:
           - `timeout` (Number): Time in seconds to wait for input.
           - `max_digit` (Number): Maximum number of digits to collect.
           - `min_digit` (Number): Minimum number of digits to collect.

6. **record()**

      - No parameters. Starts recording the call.

7. **hangup()**

      - No parameters. Ends the call.

8. **call(from, to, options)**

      - `from` (Number): The caller's phone number.
      - `to` (Number | Array): A single receiver's phone number or an array of phone numbers.
      - `options` (Object): Optional settings:
           - `duration` (Number): Maximum call duration in seconds.
           - `timeout` (Number): Time to wait for each call to be answered.
           - `loop` (Number): Number of retry attempts for each number.
           - `record` (Boolean): Whether to record the call.

9. **clear()**
      - No parameters. Clears all defined actions.

---
