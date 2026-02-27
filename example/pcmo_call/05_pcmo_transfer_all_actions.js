"use strict";

const { Piopiy } = require('piopiy');

async function main() {
    const client = new Piopiy(process.env.PIOPIY_TOKEN || "YOUR_BEARER_TOKEN");

    const pipeline = client.pcmo.pipeline()
        .param({ transfer_reason: "escalation", priority: 2, is_escalation: true })
        .play("https://example.com/transfer_notice.wav")
        .play_get_input(
            {
                type: "say",
                say: "Press 1 for billing or 2 for technical support.",
                language: "en-US",
                voice_id: "female",
                speed: 1.0
            },
            ["dtmf"],
            { type: "url", url: "https://example.com/transfer-result" },
            { min_digits: 1, max_digits: 1, first_digit_timeout: 5 },
            { max: 1 }
        )
        .input(
            { type: "pcmo", ref: "branch_after_input" },
            { min_digits: 1, max_digits: 4, finish_on_key: "#" }
        )
        .record("wav", "single")
        .connect(
            {
                caller_id: "919999999999",
                strategy: "sequential",
                options: {
                    ring_timeout_sec: 20,
                    machine_detection: true,
                    recording: { enabled: true, channels: "dual", format: "mp3" }
                },
                metadata: { queue: "support", attempt: 1 }
            },
            [
                { type: "pstn", number: "918888888887" },
                { type: "agent", id: "bdd32bcb-767c-40a5-be4a-5f45eeb348a6" }
            ]
        )
        .hangup()
        .build();

    const response = await client.pcmo.transfer(
        "c4d0e5f6-a7b8-12c9-d3e4-f56789012345",
        pipeline
    );

    console.log(response);
}

main().catch((error) => {
    console.error(error);
});
