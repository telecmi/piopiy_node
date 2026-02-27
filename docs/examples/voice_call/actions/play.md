# Action: play

## What
Play an audio file.

## Why
Announcements, prompts, disclaimers before connect/input.

## Options

| Field | Description | Why |
|---|---|---|
| `file_name` | Audio URL or file name. | Audio to be played to the participant. |

## Example

```javascript
const action = {
    action: "play",
    file_name: "https://example.com/welcome.wav"
};
console.log(action);
```
