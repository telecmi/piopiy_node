"use strict";

function main() {
    const action = {
        action: "play_get_input",
        prompt: {
            type: "say",
            say: "Press 1 for sales",
            language: "en-US",
            voice_id: "female",
            speed: 1.0
        },
        input: ["dtmf"],
        dtmf: { max_digits: 1, first_digit_timeout: 5 },
        retries: { max: 1 },
        on_result: { type: "url", url: "https://example.com/input-result" }
    };

    console.log(action);
}

main();
