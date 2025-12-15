import voice from './voice/call';
import { call_hangup } from './voice/hangup';
import { isNumber, isString } from './underscore/index';
import PiopiyAction from './action/action';
import StreamAction from './action/stream_action';
import AiAgent from './voice/ai_agent';

class Piopiy {

    constructor(appid, secret) {
        // Enforce strict new auth: Only Token allowed.
        if (isString(appid) && secret === undefined) {
            this.auth = appid;
            this.ai = new AiAgent(this.auth);

            // Common hangup wrapper
            this.voice = {
                hangup: (call_id, reason, cause) => call_hangup(this.auth, call_id, reason, cause)
            };

        } else {
            throw new Error("From v1.0.9, Piopiy only supports Bearer Token authentication. Init with `new Piopiy('YOUR_TOKEN')`.");
        }
    }
}

export {
    Piopiy,
    PiopiyAction,
    StreamAction,
};
