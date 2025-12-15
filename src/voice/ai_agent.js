import axios from 'axios';
import { isString, isPhone, sanitizePhone, isObject, isUUID, isValidPhoneSchema } from '../underscore/index';

const ai_voice = { host: "https://rest.piopiy.com", path: "/v3" };

export default class AiAgent {

    constructor(auth) {
        this.auth = auth;
    }

    async call(to, from, agent_id, options) {
        // 1. Sanitize inputs first
        const to_clean = sanitizePhone(to);
        const from_clean = sanitizePhone(from);

        // 2. Validate Agent ID (UUID)
        if (!isUUID(agent_id)) {
            throw new Error("agent_id must be a valid UUID");
        }

        // 3. Validate Phone Numbers (Schema: ^[1-9][0-9]{6,15}$)
        if (!isValidPhoneSchema(to_clean)) {
            throw new Error("to_number must comply with pattern ^[1-9][0-9]{6,15}$");
        }
        if (!isValidPhoneSchema(from_clean)) {
            throw new Error("caller_id must comply with pattern ^[1-9][0-9]{6,15}$");
        }

        let payload_options = {};
        let variables = {};
        if (isObject(options)) {
            payload_options = options.options || {};
            variables = options.variables || {};
        }

        // 4. Validate Options
        if (payload_options.max_duration_sec !== undefined) {
            const dur = payload_options.max_duration_sec;
            if (dur < 30 || dur > 7200) throw new Error("options.max_duration_sec must be between 30 and 7200");
        }
        if (payload_options.ring_timeout_sec !== undefined) {
            const ring = payload_options.ring_timeout_sec;
            if (ring < 5 || ring > 120) throw new Error("options.ring_timeout_sec must be between 5 and 120");
        }

        // 5. Validate Variables Keys
        // Pattern: ^[A-Za-z_][A-Za-z0-9_]*$
        const varKeyPattern = /^[A-Za-z_][A-Za-z0-9_]*$/;
        for (const key in variables) {
            if (!varKeyPattern.test(key)) {
                throw new Error(`Invalid variable key '${key}'. Must match ^[A-Za-z_][A-Za-z0-9_]*$`);
            }
        }

        const payload = {
            to_number: to_clean,
            caller_id: from_clean,
            agent_id: agent_id,
            options: payload_options,
            variables: variables
        };

        const config = {
            headers: {
                'Authorization': `Bearer ${this.auth}`,
                'Content-Type': 'application/json'
            }
        };
        const url = `${ai_voice.host}${ai_voice.path}/voice/ai/call`;
        const response = await axios.post(url, payload, config);
        return response.data;
    }
}
