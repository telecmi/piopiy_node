"use strict";

const { Piopiy } = require('piopiy');

async function main() {
    const client = new Piopiy(process.env.PIOPIY_TOKEN || "YOUR_BEARER_TOKEN");

    const response = await client.ai.call({
        caller_id: "919999999999",
        to_number: "918888888888",
        agent_id: "bdd32bcb-767c-40a5-be4a-5f45eeb348a6",
        options: {
            max_duration_sec: 600,
            record: true,
            ring_timeout_sec: 40
        },
        variables: {
            customer_name: "Kumar",
            ticket_id: "TCK-1001",
            score: 97,
            is_vip: true
        }
    });

    console.log(response);
}

main().catch((error) => {
    console.error(error);
});
