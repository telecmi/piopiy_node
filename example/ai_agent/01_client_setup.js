"use strict";

const { Piopiy } = require('piopiy');

function buildClient() {
    return new Piopiy(process.env.PIOPIY_TOKEN || "YOUR_BEARER_TOKEN");
}

function main() {
    const client = buildClient();
    console.log("Client initialized:", client.constructor.name);
}

main();
