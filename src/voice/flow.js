import axios from 'axios';
import { isObject } from '../underscore/index';
import { validateFlowCallRequest } from './validators';

const voice = { host: "https://rest.piopiy.com", path: "/v3" };

const hasOwn = ( obj, key ) => Object.prototype.hasOwnProperty.call( obj, key );

export default class Flow {

    constructor ( auth ) {
        this.auth = auth;
    }

    async call ( flowIdOrPayload, org_id, caller_id, to_number, app_id, options, variables ) {
        const request = this.normalizeCallRequest(
            flowIdOrPayload,
            org_id,
            caller_id,
            to_number,
            app_id,
            options,
            variables
        );

        validateFlowCallRequest( request );
        return this.post( '/voice/flow/call', request );
    }

    normalizeCallRequest ( flowIdOrPayload, org_id, caller_id, to_number, app_id, options, variables ) {
        if ( isObject( flowIdOrPayload ) && org_id === undefined ) {
            return this.compact( flowIdOrPayload );
        }

        return this.compact( {
            flow_id: flowIdOrPayload,
            org_id: org_id,
            caller_id: caller_id,
            to_number: to_number,
            app_id: app_id,
            options: options,
            variables: variables
        } );
    }

    compact ( payload ) {
        const out = {};
        Object.keys( payload ).forEach( ( key ) => {
            if ( hasOwn( payload, key ) && payload[key] !== undefined && payload[key] !== null ) {
                out[key] = payload[key];
            }
        } );
        return out;
    }

    async post ( path, payload ) {
        const config = {
            headers: {
                'Authorization': `Bearer ${this.auth}`,
                'Content-Type': 'application/json'
            }
        };

        const url = `${voice.host}${voice.path}${path}`;
        const response = await axios.post( url, payload, config );
        return response.data;
    }
}

