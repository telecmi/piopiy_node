# Voice Direct Hangup

## What
Terminate an active call with `client.voice.hangup(...)`.

## Why
Quickly stop a call from the voice convenience surface.

## Minimal

```javascript
const response = await client.voice.hangup(
    "c4d0e5f6-a7b8-12c9-d3e4-f56789012345"
);
```

## With Cause/Reason

```javascript
const response = await client.voice.hangup(
    "c4d0e5f6-a7b8-12c9-d3e4-f56789012345",
    "NORMAL_CLEARING",
    "Conversation completed"
);
```

## Parameters

| Parameter | Description | Why | Required | Constraints |
|---|---|---|---|---|
| `call_id` | Active call UUID. | Identifies call to terminate. | Yes | UUID |
| `cause` | Hangup cause code. | Structured termination reason. | No | string `1-64` |
| `reason` | Human reason text. | Debug/operations clarity. | No | string `1-256` |

## File

- `example/voice_call/03_voice_hangup_direct.js`
