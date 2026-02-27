# Client Setup

## What
Initialize `Piopiy` for voice convenience operations.

## Why
Centralizes authentication for all voice examples.

## Example

```javascript
const { Piopiy } = require('piopiy');

const client = new Piopiy(
    process.env.PIOPIY_TOKEN || "YOUR_BEARER_TOKEN"
);
```

## Parameters

| Parameter | Description | Why |
|---|---|---|
| `token` | Bearer token. | Required for authentication. |

## Notes

- Node SDK currently accepts token-only initialization.
- Base URL, timeout, and retry are not exposed as constructor options in this version.
