"use strict";

function main() {
    const action = {
        action: "input",
        dtmf: { min_digits: 1, max_digits: 4, finish_on_key: "#" },
        on_result: { type: "pcmo", ref: "next_pipeline_ref" }
    };

    console.log(action);
}

main();
