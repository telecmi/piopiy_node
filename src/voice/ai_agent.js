import axios from 'axios';
import { isObject } from '../underscore/index';
import { call_hangup } from './hangup';
import PipelineBuilder from './pipeline';
import {
    validateAiCallRequest,
    validatePcmoCallRequest,
    validateTransferRequest
} from './validators';

const ai_voice = { host: "https://rest.piopiy.com", path: "/v3" };

const hasOwn = ( obj, key ) => Object.prototype.hasOwnProperty.call( obj, key );

export default class AiAgent {

    constructor ( auth ) {
        this.auth = auth;
    }

    async call ( toOrPayload, from, agent_id, options, variables, app_id, failover ) {
        const request = this.normalizeCallRequest( toOrPayload, from, agent_id, options, variables, app_id, failover );
        validateAiCallRequest( request );

        if ( request.failover === undefined || request.failover === null ) {
            const apiPayload = {
                caller_id: request.caller_id,
                to_number: request.to_number,
                agent_id: request.agent_id
            };

            if ( request.options !== undefined && request.options !== null ) {
                apiPayload.options = request.options;
            }

            if ( request.variables !== undefined && request.variables !== null ) {
                apiPayload.variables = request.variables;
            }

            return this.post( '/voice/ai/call', apiPayload );
        }

        const pipeline = this.buildFailoverPipeline(
            request.caller_id,
            request.agent_id,
            request.failover
        );

        const pcmoPayload = {
            caller_id: request.caller_id,
            to_number: request.to_number,
            app_id: request.app_id,
            pipeline: pipeline
        };

        if ( request.options !== undefined && request.options !== null ) {
            pcmoPayload.options = request.options;
        }

        if ( request.variables !== undefined && request.variables !== null ) {
            pcmoPayload.variables = request.variables;
        }

        validatePcmoCallRequest( pcmoPayload );
        return this.post( '/voice/pcmo/call', pcmoPayload );
    }

    async transfer ( call_id, pipeline ) {
        const resolvedPipeline = this.resolvePipeline( pipeline );
        const payload = {
            call_id: call_id,
            pipeline: resolvedPipeline
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

    async hangup ( call_id, cause = "NORMAL_CLEARING", reason ) {
        return call_hangup( this.auth, call_id, reason, cause );
    }

    normalizeCallRequest ( toOrPayload, from, agent_id, options, variables, app_id, failover ) {
        if ( isObject( toOrPayload ) && from === undefined ) {
            const payload = toOrPayload;
            const request = {
                caller_id: payload.caller_id,
                to_number: payload.to_number,
                agent_id: payload.agent_id
            };

            if ( hasOwn( payload, 'options' ) && payload.options !== undefined && payload.options !== null ) {
                request.options = payload.options;
            }
            if ( hasOwn( payload, 'variables' ) && payload.variables !== undefined && payload.variables !== null ) {
                request.variables = payload.variables;
            }
            if ( hasOwn( payload, 'app_id' ) && payload.app_id !== undefined && payload.app_id !== null ) {
                request.app_id = payload.app_id;
            }
            if ( hasOwn( payload, 'failover' ) && payload.failover !== undefined && payload.failover !== null ) {
                request.failover = payload.failover;
            }

            return request;
        }

        let payloadOptions = options;
        let payloadVariables = variables;
        let payloadAppId = app_id;
        let payloadFailover = failover;

        if (
            isObject( options ) &&
            variables === undefined &&
            app_id === undefined &&
            failover === undefined &&
            ( hasOwn( options, 'options' ) || hasOwn( options, 'variables' ) || hasOwn( options, 'app_id' ) || hasOwn( options, 'failover' ) )
        ) {
            payloadOptions = options.options;
            payloadVariables = options.variables;
            payloadAppId = options.app_id;
            payloadFailover = options.failover;
        }

        const request = {
            caller_id: from,
            to_number: toOrPayload,
            agent_id: agent_id
        };

        if ( payloadOptions !== undefined && payloadOptions !== null ) {
            request.options = payloadOptions;
        }
        if ( payloadVariables !== undefined && payloadVariables !== null ) {
            request.variables = payloadVariables;
        }
        if ( payloadAppId !== undefined && payloadAppId !== null ) {
            request.app_id = payloadAppId;
        }
        if ( payloadFailover !== undefined && payloadFailover !== null ) {
            request.failover = payloadFailover;
        }

        return request;
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

    buildFailoverPipeline ( caller_id, primaryAgentId, failover ) {
        const params = { caller_id: caller_id };

        if ( hasOwn( failover, 'strategy' ) ) {
            params.strategy = failover.strategy;
        }

        const connectOptions = {};
        [ "max_duration_sec", "ring_timeout_sec", "machine_detection", "recording", "waiting_music" ].forEach( ( key ) => {
            if ( hasOwn( failover, key ) ) {
                connectOptions[key] = failover[key];
            }
        } );

        if ( Object.keys( connectOptions ).length > 0 ) {
            params.options = connectOptions;
        }

        if ( hasOwn( failover, 'metadata' ) ) {
            params.metadata = failover.metadata;
        }

        return [
            {
                action: "connect",
                params: params,
                endpoints: [
                    { type: "agent", id: primaryAgentId },
                    { type: "agent", id: failover.agent_id }
                ]
            }
        ];
    }

    async post ( path, payload ) {
        const config = {
            headers: {
                'Authorization': `Bearer ${this.auth}`,
                'Content-Type': 'application/json'
            }
        };

        const url = `${ai_voice.host}${ai_voice.path}${path}`;
        const response = await axios.post( url, payload, config );
        return response.data;
    }
}
