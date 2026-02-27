# Piopiy Node.js SDK

Production-ready Node.js SDK for Piopiy Voice Orchestrator APIs. Build AI voice agents, direct voice calls, PCMO flows, and flow-based call routing.

## Prerequisites

- Node.js 14 or higher
- A Piopiy account and API token (from [Piopiy Dashboard](https://piopiy.com))

## Installation

```bash
npm install piopiy
```

## Quick Start

```javascript
const { Piopiy } = require('piopiy');

const client = new Piopiy(process.env.PIOPIY_TOKEN || "YOUR_BEARER_TOKEN");
```

## Main Examples

### 1) AI Single Call

```javascript
async function main() {
    const response = await client.ai.call({
        caller_id: "919999999999",
        to_number: "918888888888",
        agent_id: "bdd32bcb-767c-40a5-be4a-5f45eeb348a6"
    });
    console.log(response);
}

main().catch(console.error);
```

Example code: [`example/ai_agent/02_ai_call_minimal.js`](example/ai_agent/02_ai_call_minimal.js)

### 2) AI Call With Failover

```javascript
async function main() {
    const response = await client.ai.call({
        caller_id: "919999999999",
        to_number: "918888888888",
        agent_id: "bdd32bcb-767c-40a5-be4a-5f45eeb348a6",
        app_id: "your_app_id",
        failover: {
            agent_id: "2f2ae3ad-7ff6-4011-b10e-9ca1f8f8d1a2",
            ring_timeout_sec: 20,
            machine_detection: true
        }
    });
    console.log(response);
}

main().catch(console.error);
```

Failover rules:
- `app_id` is required when `failover` is used.
- `failover.agent_id` is required.
- Failover agent must differ from primary `agent_id`.
- `failover.strategy` is optional.

Example code: [`example/ai_agent/04_ai_call_with_failover.js`](example/ai_agent/04_ai_call_with_failover.js)

### 3) Voice Direct Call

```javascript
async function main() {
    const response = await client.voice.call({
        caller_id: "919999999999",
        to_number: "918888888888",
        app_id: "your_app_id"
    });
    console.log(response);
}

main().catch(console.error);
```

Example code: [`example/voice_call/01_voice_call_direct.js`](example/voice_call/01_voice_call_direct.js)

### 4) PCMO Simple Call

```javascript
async function main() {
    const pipeline = client.pcmo.pipeline()
        .connect(
            { caller_id: "919999999999" },
            [{ type: "pstn", number: "918888888888" }]
        )
        .build();

    const response = await client.pcmo.call({
        caller_id: "919999999999",
        to_number: "918888888888",
        app_id: "your_app_id",
        pipeline
    });
    console.log(response);
}

main().catch(console.error);
```

Example code: [`example/pcmo_call/02_pcmo_call_minimal.js`](example/pcmo_call/02_pcmo_call_minimal.js)

### 5) Flow Call (Minimal)

```javascript
async function main() {
    const response = await client.flow.call({
        flow_id: "7f4d89c7-3485-45c5-9016-f45a47cd885c",
        org_id: "f89dd77d-c226-4ff2-b88c-6d7e4f5a88e2",
        caller_id: "919999999999",
        to_number: "918888888888",
        app_id: "your_app_id"
    });
    console.log(response);
}

main().catch(console.error);
```

Example code: [`example/flow_call.js`](example/flow_call.js)

## Other Actions And Full Docs

- AI transfer/hangup + full AI docs: [`docs/examples/ai_agent/README.md`](docs/examples/ai_agent/README.md)
- Voice transfer/hangup + full voice docs: [`docs/examples/voice_call/README.md`](docs/examples/voice_call/README.md)
- PCMO call/transfer + full pipeline docs: [`docs/examples/pcmo_call/README.md`](docs/examples/pcmo_call/README.md)
- Flow call docs: [`docs/examples/flow_call/README.md`](docs/examples/flow_call/README.md)

## Extra Example Code Indexes

- AI examples: [`example/ai_agent`](example/ai_agent)
- Voice examples: [`example/voice_call`](example/voice_call)
- PCMO examples: [`example/pcmo_call`](example/pcmo_call)
- Flow example: [`example/flow_call.js`](example/flow_call.js)

## Legacy Action Helpers

This package also exports legacy helpers used by older integrations:
- `PiopiyAction`
- `StreamAction`
- `PipelineBuilder`
