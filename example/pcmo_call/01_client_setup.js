"use strict";

const { Piopiy } = require('piopiy');

function getClient() {
    return new Piopiy(process.env.PIOPIY_TOKEN || "YOUR_BEARER_TOKEN");
}

function main() {
    const client = getClient();
    console.log(client.constructor.name);
}

main();
