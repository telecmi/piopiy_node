"use strict";

const { Piopiy } = require('piopiy');

async function main() {
    const client = new Piopiy(process.env.PIOPIY_TOKEN || "YOUR_BEARER_TOKEN");

    const response = await client.ai.hangup("c4d0e5f6-a7b8-12c9-d3e4-f56789012345");
    console.log(response);
}

main().catch((error) => {
    console.error(error);
});
