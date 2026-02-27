"use strict";

const { Piopiy } = require('piopiy');

async function main() {
    const client = new Piopiy(process.env.PIOPIY_TOKEN || "YOUR_BEARER_TOKEN");

    const response = await client.ai.call({
        caller_id: "919999999999",
        to_number: "918888888888",
        agent_id: "bdd32bcb-767c-40a5-be4a-5f45eeb348a6"
    });

    console.log(response);
}

main().catch((error) => {
    console.error(error);
});
