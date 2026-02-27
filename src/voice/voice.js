import axios from 'axios';
import { isObject, isString } from '../underscore/index';
import { call_hangup } from './hangup';
import PipelineBuilder from './pipeline';
import { validatePcmoCallRequest, validateTransferRequest } from './validators';

const voice = { host: "https://rest.piopiy.com", path: "/v3" };

const hasOwn = ( obj, key ) => Object.prototype.hasOwnProperty.call( obj, key );

const isLikelyCause = ( value ) => {
    return isString( value ) && value.length >= 1 && value.length <= 64 && /^[A-Z0-9_]+$/.test( value );
};

export default class Voice {

    constructor ( auth ) {
        this.auth = auth;
    }

    async call ( callerIdOrPayload, to_number, app_id, call_options, variables, connect, options, strategy, connect_options, metadata ) {
        const request = this.normalizeCallRequest(
            callerIdOrPayload,
            to_number,
            app_id,
            call_options,
            variables,
            connect,
            options,
            strategy,
            connect_options,
            metadata
        );

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

    async hangup ( call_id, cause = "NORMAL_CLEARING", reason ) {
        let finalCause = cause;
        let finalReason = reason;

        if ( reason !== undefined && reason !== null ) {
            if ( !isLikelyCause( cause ) && isLikelyCause( reason ) ) {
                finalReason = cause;
                finalCause = reason;
            }
        } else if ( cause !== undefined && cause !== null && !isLikelyCause( cause ) ) {
            finalReason = cause;
            finalCause = "NORMAL_CLEARING";
        }

        return call_hangup( this.auth, call_id, finalReason, finalCause );
    }

    normalizeCallRequest ( callerIdOrPayload, to_number, app_id, call_options, variables, connect, options, strategy, connect_options, metadata ) {
        if ( isObject( callerIdOrPayload ) && to_number === undefined ) {
            const payload = callerIdOrPayload;
            return this.fromObjectInput( payload );
        }

        return this.buildVoiceCallPayload( {
            caller_id: callerIdOrPayload,
            to_number: to_number,
            app_id: app_id,
            call_options: call_options,
            variables: variables,
            connect: connect,
            options: options,
            strategy: strategy,
            connect_options: connect_options,
            metadata: metadata
        } );
    }

    fromObjectInput ( payload ) {
        return this.buildVoiceCallPayload( {
            caller_id: payload.caller_id,
            to_number: payload.to_number,
            app_id: payload.app_id,
            call_options: payload.call_options,
            variables: payload.variables,
            connect: payload.connect,
            options: payload.options,
            strategy: payload.strategy,
            connect_options: payload.connect_options,
            metadata: payload.metadata
        } );
    }

    buildVoiceCallPayload ( input ) {
        if ( input.call_options !== undefined && input.options !== undefined ) {
            throw new Error( "Use either call_options or options, not both." );
        }

        if ( input.connect !== undefined && input.connect !== null && !isObject( input.connect ) ) {
            throw new Error( "connect must be an object." );
        }

        if (
            input.connect !== undefined &&
            input.connect !== null &&
            ( input.strategy !== undefined || input.connect_options !== undefined || input.metadata !== undefined )
        ) {
            throw new Error( "Use either connect object or legacy strategy/connect_options/metadata arguments, not both." );
        }

        const normalizedCallOptions = input.call_options !== undefined ? input.call_options : input.options;

        const normalizedConnect = Object.assign( {}, input.connect || {} );
        if ( !hasOwn( normalizedConnect, 'strategy' ) ) {
            normalizedConnect.strategy = input.strategy !== undefined ? input.strategy : "sequential";
        }
        if ( input.connect_options !== undefined ) {
            normalizedConnect.options = input.connect_options;
        }
        if ( input.metadata !== undefined ) {
            normalizedConnect.metadata = input.metadata;
        }

        const allowedConnectKeys = [ "strategy", "options", "metadata" ];
        const extraConnectKeys = Object.keys( normalizedConnect ).filter( ( key ) => !allowedConnectKeys.includes( key ) );
        if ( extraConnectKeys.length > 0 ) {
            throw new Error( `Unknown connect field(s): ${extraConnectKeys.sort().join( ', ' )}` );
        }

        const params = {
            caller_id: input.caller_id,
            strategy: normalizedConnect.strategy
        };
        if ( hasOwn( normalizedConnect, 'options' ) ) {
            params.options = normalizedConnect.options;
        }
        if ( hasOwn( normalizedConnect, 'metadata' ) ) {
            params.metadata = normalizedConnect.metadata;
        }

        const payload = {
            caller_id: input.caller_id,
            to_number: input.to_number,
            app_id: input.app_id,
            pipeline: [
                {
                    action: "connect",
                    params: params,
                    endpoints: [
                        {
                            type: "pstn",
                            number: input.to_number
                        }
                    ]
                }
            ]
        };

        if ( normalizedCallOptions !== undefined && normalizedCallOptions !== null ) {
            payload.options = normalizedCallOptions;
        }
        if ( input.variables !== undefined && input.variables !== null ) {
            payload.variables = input.variables;
        }

        return payload;
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

