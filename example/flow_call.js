"use strict";

const { Piopiy } = require('piopiy');

async function main() {
    const token = process.env.PIOPIY_TOKEN || "YOUR_BEARER_TOKEN";
    const client = new Piopiy(token);

    const response = await client.flow.call({
        flow_id: "7f4d89c7-3485-45c5-9016-f45a47cd885c",
        org_id: "f89dd77d-c226-4ff2-b88c-6d7e4f5a88e2",
        caller_id: "919999999999",
        to_number: "918888888888",
        app_id: "your_app_id"
    });

    console.log(response);
}

main().catch((error) => {
    console.error(error);
});
