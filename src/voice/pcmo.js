import axios from 'axios';
import { isObject } from '../underscore/index';
import PipelineBuilder from './pipeline';
import { validatePcmoCallRequest, validateTransferRequest } from './validators';

const voice = { host: "https://rest.piopiy.com", path: "/v3" };

const hasOwn = ( obj, key ) => Object.prototype.hasOwnProperty.call( obj, key );

export default class Pcmo {

    constructor ( auth ) {
        this.auth = auth;
    }

    async call ( callerIdOrPayload, to_number, app_id, pipeline, options, variables, agent_id ) {
        const request = this.normalizeCallRequest(
            callerIdOrPayload,
            to_number,
            app_id,
            pipeline,
            options,
            variables,
            agent_id
        );

        request.pipeline = this.resolvePipeline( request.pipeline );
        validatePcmoCallRequest( request );
        return this.post( '/voice/pcmo/call', request );
    }

    async transfer ( call_id, pipeline ) {
        const payload = {
            call_id: call_id,
            pipeline: this.resolvePipeline( pipeline )
        };

        validateTransferRequest( payload );
        return this.post( '/voice/pcmo/transfer', payload );
    }

    pipeline () {
        return new PipelineBuilder();
    }

    static pipeline () {
        return new PipelineBuilder();
    }

    normalizeCallRequest ( callerIdOrPayload, to_number, app_id, pipeline, options, variables, agent_id ) {
        if ( isObject( callerIdOrPayload ) && to_number === undefined ) {
            return this.compact( callerIdOrPayload );
        }

        return this.compact( {
            caller_id: callerIdOrPayload,
            to_number: to_number,
            app_id: app_id,
            pipeline: pipeline,
            options: options,
            variables: variables,
            agent_id: agent_id
        } );
    }

    resolvePipeline ( pipeline ) {
        if ( isObject( pipeline ) && typeof pipeline.build === 'function' ) {
            return pipeline.build();
        }

        if ( isObject( pipeline ) && typeof pipeline.PCMO === 'function' ) {
            return pipeline.PCMO();
        }

        return pipeline;
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

