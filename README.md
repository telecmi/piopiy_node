# PIOPIY NodeJS SDK

The Node.js SDK is used to integrate communications into your Node.js applications using the PIOPIY REST API. Using the SDK, you will be able to make voice calls and can control your call flows.

## Install

Follow the below installation instructions

### Prerequisites

Prerequisites for javascript web server.

- <a href="https://nodejs.org/en/" target="_blank">node.js</a> (>= v10.16.3 required)
- <a href="https://www.npmjs.com/" target="_blank">npm</a> (>= 6.9.0 required)

## Installation

Install the SDK using npm

```bash
$ npm install piopiy
```

### Authentication

In order to authenticate your app, and to make an API request, you should have an app id and secret for authentication. Find your App ID and secret in your <a href="https://doc.telecmi.com/piopiy/docs/build-app#app-id-and-secret" target="_blank">PIOPIY dashboard</a>

Specifiy the authentication credentials

```javascript
const Piopiy = require("piopiy");
const piopiy = new Piopiy("your_app_id", "your_app_secret");
```

### Make a call

To make a call , mention the to_number, piopiy_phone_number and .

```javascript
piopiy.voice
        .call(
                "your_leg_a_to_number",
                "your_piopiy_phone_number",
                "your_leg_b_to_number"
        )
        .then((result) => {
                console.log(result);
        })
        .catch((error) => {
                console.log(error);
        });
```

To make a call using PCMO, mention the to_number, piopiy_phone_number and .

```javascript
piopiy.voice
        .callPCMO(
                "your_to_number",
                "your_piopiy_phone_number",
                "your_PCMO_Object"
        )
        .then((result) => {
                console.log(result);
        })
        .catch((error) => {
                console.log(error);
        });
```

To make a call with answer, mention the to_number, piopiy_phone_number and <a href="https://doc.telecmi.com/piopiy/docs/configure-url" target="_blank">answer_url</a>.

```javascript
piopiy.voice
        .make("your_to_number", "your_piopiy_phone_number", "your_answer_url")
        .then((result) => {
                console.log(result);
        })
        .catch((error) => {
                console.log(error);
        });
```

### Hold a call

To hold a call, mention the cmiuuid of the call.

```javascript
piopiy.voice
        .hold("cmiuuid")
        .then((result) => {
                console.log(result);
        })
        .catch((error) => {
                console.log(error);
        });
```

### Unhold a call

To unhold a call, mention the cmiuuid of the call.

```javascript
piopiy.voice
        .unhold("cmiuuid")
        .then((result) => {
                console.log(result);
        })
        .catch((error) => {
                console.log(error);
        });
```

### Toggle a call

To toggle a call, mention the cmiuuid of the call.

```javascript
piopiy.voice
        .toggle("cmiuuid")
        .then((result) => {
                console.log(result);
        })
        .catch((error) => {
                console.log(error);
        });
```

### Hangup a call

To hangup a call, mention the cmiuuid of the call.

```javascript
piopiy.voice
        .hangup("cmiuuid")
        .then((result) => {
                console.log(result);
        })
        .catch((error) => {
                console.log(error);
        });
```

### More Examples

Refer to the <a href="https://doc.telecmi.com/piopiy/docs/pcmo-overview" target="_blank">piopiy docs</a> for more examples. Now create the <a href="https://doc.telecmi.com/piopiy/docs/get-started#signup" target="_blank">PIOPIY account</a> and setup the express server and test out your integration in few minutes.

### Reporting issues

For any feedbacks and problems, you can <a href="https://github.com/telecmi/piopiy_node/issues" >open an issue on github</a>.

# Piopiy API - Node.js SDK

## Overview

Piopiy API provides a comprehensive Node.js SDK for managing and controlling voice interactions using our PCMO Actions. This SDK allows developers to integrate voice functionalities such as making calls, playing audio, recording, and more into their Node.js applications.

## PCMO Features

- **Make Calls**: Initiate voice calls between two parties or multiple numbers.
- **Play and Get Input**: Play a media file or URL and get user input via DTMF.
- **Play Music**: Stream audio files or URLs during a call.
- **Text-to-Speech**: Convert text to speech during a call.
- **Set Values and Inputs**: Set custom values and collect user inputs.
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
  9180xxxxxx,         // second number to connect
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

### 3. Handling Multiple Numbers

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

Sure, let's focus specifically on the PCMO (Piopiy Call Management Object) aspect of the `call()` method. Here's an explanation centered around PCMO, detailing its purpose, how to use it, and the relevant parameters:

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
