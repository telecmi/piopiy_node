
piopiy
======

The official Node.js SDK for PIOPIY - a complete Voice AI Agent and CPaaS Platform. Easily build intelligent Voice Agents, manage complex call flows (queues, human handoff), execute bulk voice campaigns, and send multi-channel notifications via WhatsApp and SMS.

Installation
------------
`npm install piopiy`


Usage
-----

### Initialize

```javascript
const { Piopiy } = require('piopiy');
const client = new Piopiy("YOUR_API_TOKEN");
```

### AI Voice Agent

Make an AI-powered voice call.

#### Requirements
- **Phone Numbers**: 7-15 digits, no leading zero. Pattern: `^[1-9][0-9]{6,15}$`
- **Agent ID**: Must be a valid UUID.
- **Duration**: 30s to 7200s.
- **Variables**: Keys must be `^[A-Za-z_][A-Za-z0-9_]*$`.
```javascript


var options = {
    options: {
        max_duration_sec: 80,
        record: true
    },
    variables: {
        customer_id: "CUST_1001",
        campaign: "summer_sale_2025",
        lang: "en-IN",
        priority: 2,
        vip: true
    }
};

client.ai.call("9198xxxxxx", "9198xxxxxx", "YOUR_AGENT_ID", options)
    .then(res => {
        console.log(res);
    })
    .catch(err => {
        console.error(err);
    });
```

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

For more comprehensive documentation, visit [piopiy.com](https://piopiy.com).
