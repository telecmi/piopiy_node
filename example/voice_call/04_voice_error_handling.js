"use strict";

const { Piopiy } = require('piopiy');

async function main() {
    const client = new Piopiy(process.env.PIOPIY_TOKEN || "YOUR_BEARER_TOKEN");

    try {
        const response = await client.voice.call({
            caller_id: "919999999999",
            to_number: "918888888888",
            app_id: "your_app_id",
            connect: { strategy: "invalid_strategy" }
        });
        console.log(response);
    } catch (error) {
        if (error.response) {
            console.log("API failed:", error.response.status, error.response.data);
            return;
        }

        if (error.request) {
            console.log("Network failed:", error.message);
            return;
        }

        console.log("Validation failed:", error.message);
    }
}

main();
