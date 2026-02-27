"use strict";

const { Piopiy } = require('piopiy');

async function main() {
    const client = new Piopiy(process.env.PIOPIY_TOKEN || "YOUR_BEARER_TOKEN");

    const response = await client.ai.call({
        caller_id: "919999999999",
        to_number: "918888888888",
        agent_id: "bdd32bcb-767c-40a5-be4a-5f45eeb348a6",
        app_id: "your_app_id",
        failover: {
            agent_id: "2f2ae3ad-7ff6-4011-b10e-9ca1f8f8d1a2",
            max_duration_sec: 120,
            ring_timeout_sec: 20,
            machine_detection: true,
            recording: {
                enabled: true,
                channels: "dual",
                format: "mp3"
            },
            waiting_music: "https://example.com/waiting_music.wav",
            metadata: {
                transfer_reason: "agent_busy",
                priority: 2,
                is_escalation: true
            }
        },
        options: {
            max_duration_sec: 600,
            record: true,
            ring_timeout_sec: 45
        },
        variables: {
            journey: "voice_assist",
            source: "sdk"
        }
    });

    console.log(response);
}

main().catch((error) => {
    console.error(error);
});
