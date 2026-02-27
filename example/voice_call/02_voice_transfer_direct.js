"use strict";

const { Piopiy } = require('piopiy');

async function main() {
    const client = new Piopiy(process.env.PIOPIY_TOKEN || "YOUR_BEARER_TOKEN");

    const transferPipeline = client.voice.pipeline()
        .play("https://example.com/transfer_notice.wav")
        .connect(
            {
                caller_id: "919999999999",
                strategy: "sequential",
                options: { ring_timeout_sec: 20 }
            },
            [
                { type: "agent", id: "bdd32bcb-767c-40a5-be4a-5f45eeb348a6" },
                { type: "agent", id: "2f2ae3ad-7ff6-4011-b10e-9ca1f8f8d1a2" }
            ]
        )
        .hangup();

    const response = await client.voice.transfer(
        "c4d0e5f6-a7b8-12c9-d3e4-f56789012345",
        transferPipeline
    );

    console.log(response);
}

main().catch((error) => {
    console.error(error);
});
