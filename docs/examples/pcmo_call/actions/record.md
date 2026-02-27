# Action: record

## What
Record call audio in pipeline.

## Why
Compliance, QA, and audit trails.

## Options

| Field | Description | Why |
|---|---|---|
| `format` | Output format (`mp3` or `wav`). | Storage/quality tradeoff. |
| `channels` | `single` or `dual`. | Mono/stereo recording mode. |

## Example

```javascript
const action = {
    action: "record",
    format: "mp3",
    channels: "dual"
};
console.log(action);
```
