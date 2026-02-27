"use strict";

const { Piopiy } = require('piopiy');

async function main() {
    const client = new Piopiy(process.env.PIOPIY_TOKEN || "YOUR_BEARER_TOKEN");

    const response = await client.voice.call({
        caller_id: "919999999999",
        to_number: "918888888888",
        app_id: "your_app_id",
        call_options: {
            max_duration_sec: 600,
            record: true,
            ring_timeout_sec: 40
        },
        variables: {
            customer_name: "Kumar",
            source: "direct_call_api"
        },
        connect: {
            strategy: "sequential",
            options: {
                ring_timeout_sec: 20,
                machine_detection: true,
                recording: {
                    enabled: true,
                    channels: "dual",
                    format: "mp3"
                },
                waiting_music: "https://example.com/waiting_music.wav"
            },
            metadata: {
                campaign: "normal_outbound",
                priority: 1,
                is_callback: false
            }
        }
    });

    console.log(response);
}

main().catch((error) => {
    console.error(error);
});
