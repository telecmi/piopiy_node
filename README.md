
piopiy
======

The official Node.js SDK for PIOPIY - a complete Voice AI Agent and CPaaS Platform. Easily build intelligent Voice Agents, manage complex call flows (queues, human handoff), execute bulk voice campaigns, and send multi-channel notifications via WhatsApp and SMS.

Installation
------------
`npm install piopiy`


Usage
-----

### Authentication

Initialize the client with your API Token.

```javascript
const { Piopiy } = require('piopiy');
const client = new Piopiy("YOUR_API_TOKEN");
```

### AI Voice Agent

Make an AI-powered voice call.

```javascript
const options = {
    options: {
        max_duration_sec: 80, // Set max call duration
        record: true          // Enable recording
    },
    variables: {
        customer_id: "CUST_1001", // Custom variables for the AI Agent
        campaign: "summer_sale_2025",
        priority: 2
    }
};

client.ai.call("9198xxxxxx", "9198xxxxxx", "YOUR_AGENT_ID", options)
    .then(res => {
        console.log("Call Initiated:", res);
    })
    .catch(err => {
        console.error("Error:", err);
    });
```

#### Arguments

| Argument | Type | Description |
| :--- | :--- | :--- |
| `to` | String | Destination number (e.g., "9198xxxxxx"). Pattern: `^[1-9][0-9]{6,15}$` |
| `caller_id` | String | Caller ID (e.g., "9198xxxxxx"). Pattern: `^[1-9][0-9]{6,15}$` |
| `agent_id` | String | The UUID of the AI Agent to connect. |
| `options` | Object | Optional settings and variables. |

#### Options Object

| Key | Type | Description |
| :--- | :--- | :--- |
| `max_duration_sec` | Number | Maximum call duration in seconds (30 - 7200). |
| `ring_timeout_sec` | Number | Ring timeout in seconds (5 - 120). |
| `record` | Boolean | Set `true` to record the call. |

#### Variables Object

Pass custom data to your AI Agent. Keys must match the pattern `^[A-Za-z_][A-Za-z0-9_]*$`.

### Hangup Call (AI)

Terminate an active AI call.

```javascript
client.voice.hangup("call_uuid", "NO_BALANCE", "NORMAL_CLEARING")
    .then(res => {
        console.log(res);
    })
    .catch(err => {
        console.error(err);
    });
```

| Argument | Type | Description |
| :--- | :--- | :--- |
| `call_id` | String | The unique UUID of the call to hang up. |
| `reason` | String | Custom reason for the hangup (e.g., "NO_BALANCE"). |
| `cause` | String | SIP hangup cause (default: "NORMAL_CLEARING"). |


### PCMO (Programmable Call Media Operations)

Create complex call flows using `PiopiyAction`.

```javascript
const { PiopiyAction } = require('piopiy');
const action = new PiopiyAction();

// Example: Play a music file
action.playMusic("https://example.com/welcome.mp3");

// Example: Speak text
action.speak("Hello, welcome to Piopiy.");

// Generate PCMO array
console.log(action.PCMO());
```

#### Available Methods

**`playMusic(audioFileOrUrl)`**
Play an audio file (.mp3 or .wav).
- `audioFileOrUrl`: URL or filename of the audio.

**`speak(text)`**
Convert text to speech.
- `text`: The text to speak.

**`input(url, options)`**
Collect DTMF input from the user.
- `url`: The webhook URL to send the digits to.
- `options`:
    - `max_digit`: Max digits to collect.
    - `timeout`: Timeout in seconds.

**`playGetInput(url, audioFileOrUrl, options)`**
Play an audio file and then collect input.
- `url`: Webhook URL for the input.
- `audioFileOrUrl`: Audio to play.
- `options`: `max_digit`, `retry`, `timeout`.

**`call(to, caller_id, options)`**
Bridge the call to another number (PSTN).
- `to`: Number or array of numbers to call.
- `caller_id`: Caller ID.
- `options`: `duration`, `timeout`, `loop`, `ring_type` ('group').

**`forward(to, caller_id, options)`**
Connect the call to a SIP user.
- `to`: SIP user or array of users.
- `caller_id`: Caller ID.
- `options`: `duration`, `timeout`, `loop`, `record`, `ring_type`.

**`stream(url, options)`**
Stream call audio to a WebSocket URL.
- `url`: WebSocket URL (ws:// or wss://).
- `options`:
    - `listen_mode`: 'caller', 'callee', or 'both'.
    - `stream_on_answer`: Boolean.

**`record()`**
Start recording the call.

**`hangup()`**
Hangup the call.

**`setValue(text)`**
Set a custom parameter/value for the flow.

**`clear()`**
Clear the current action list.


For more comprehensive documentation, visit [piopiy.com](https://piopiy.com).
