import axios from 'axios';
import { validateHangupRequest } from './validators';

const voice = { host: "https://rest.piopiy.com", path: "/v3" };

export const call_hangup = async ( auth, call_id, reason, cause = "NORMAL_CLEARING" ) => {
    const payload = {
        call_id: call_id,
        cause: cause
    };

    if ( reason !== undefined && reason !== null ) {
        payload.reason = reason;
    }

    validateHangupRequest( payload );

    const config = {
        headers: {
            'Authorization': `Bearer ${auth}`,
            'Content-Type': 'application/json'
        }
    };

    const url = `${voice.host}${voice.path}/voice/call/hangup`;
    const response = await axios.post( url, payload, config );
    return response.data;
};
