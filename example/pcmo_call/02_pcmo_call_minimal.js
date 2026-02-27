"use strict";

const { Piopiy } = require('piopiy');

async function main() {
    const client = new Piopiy(process.env.PIOPIY_TOKEN || "YOUR_BEARER_TOKEN");

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
        pipeline: pipeline
    });

    console.log(response);
}

main().catch((error) => {
    console.error(error);
});
