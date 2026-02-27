import { isArray, isObject, isString, isUUID, isValidPhoneSchema } from '../underscore/index';

const VAR_KEY_RE = /^[A-Za-z_][A-Za-z0-9_]*$/;
const HTTP_URL_RE = /^https?:\/\//;
const ACTIONS = [
    "connect",
    "play",
    "play_get_input",
    "param",
    "record",
    "hangup",
    "input"
];

const fail = ( message ) => {
    throw new Error( message );
};

const ensureObject = ( value, field ) => {
    if ( !isObject( value ) ) {
        fail( `${field} must be an object.` );
    }
    return value;
};

const ensureArray = ( value, field ) => {
    if ( !isArray( value ) ) {
        fail( `${field} must be an array.` );
    }
    return value;
};

const ensureString = ( value, field, minLen, maxLen ) => {
    if ( !isString( value ) ) {
        fail( `${field} must be a string.` );
    }

    if ( minLen !== undefined && value.length < minLen ) {
        fail( `${field} must be at least ${minLen} characters long.` );
    }

    if ( maxLen !== undefined && value.length > maxLen ) {
        fail( `${field} must be at most ${maxLen} characters long.` );
    }
};

const ensureBoolean = ( value, field ) => {
    if ( typeof value !== 'boolean' ) {
        fail( `${field} must be a boolean.` );
    }
};

const ensureInt = ( value, field, minimum, maximum ) => {
    if ( !Number.isInteger( value ) ) {
        fail( `${field} must be an integer.` );
    }

    if ( minimum !== undefined && value < minimum ) {
        fail( `${field} must be >= ${minimum}.` );
    }

    if ( maximum !== undefined && value > maximum ) {
        fail( `${field} must be <= ${maximum}.` );
    }
};

const ensureNumber = ( value, field, minimum, maximum ) => {
    if ( typeof value !== 'number' || Number.isNaN( value ) ) {
        fail( `${field} must be a number.` );
    }

    if ( minimum !== undefined && value < minimum ) {
        fail( `${field} must be >= ${minimum}.` );
    }

    if ( maximum !== undefined && value > maximum ) {
        fail( `${field} must be <= ${maximum}.` );
    }
};

const validateRequiredAndAllowedKeys = ( payload, requiredKeys, allowedKeys ) => {
    const missing = requiredKeys.filter( ( key ) => !( key in payload ) );
    if ( missing.length > 0 ) {
        fail( `Missing required field(s): ${missing.sort().join( ', ' )}` );
    }

    const extra = Object.keys( payload ).filter( ( key ) => !allowedKeys.includes( key ) );
    if ( extra.length > 0 ) {
        fail( `Unknown field(s): ${extra.sort().join( ', ' )}` );
    }
};

const validatePhone = ( value, field ) => {
    ensureString( value, field );
    if ( !isValidPhoneSchema( value ) ) {
        fail( `${field} must match ^[1-9][0-9]{6,15}$.` );
    }
};

const validateUUID = ( value, field ) => {
    ensureString( value, field );
    if ( !isUUID( value ) ) {
        fail( `${field} must be a valid UUID string.` );
    }
};

const validateVariables = ( value, field, maxStringLen, maxProperties ) => {
    const data = ensureObject( value, field );

    if ( maxProperties !== undefined && Object.keys( data ).length > maxProperties ) {
        fail( `${field} supports at most ${maxProperties} entries.` );
    }

    for ( const key of Object.keys( data ) ) {
        if ( !VAR_KEY_RE.test( key ) ) {
            fail( `${field} has invalid key '${key}'.` );
        }

        const item = data[key];

        if ( isString( item ) ) {
            if ( maxStringLen !== undefined && item.length > maxStringLen ) {
                fail( `${field}.${key} exceeds max string length ${maxStringLen}.` );
            }
            continue;
        }

        if ( typeof item === 'boolean' ) {
            continue;
        }

        if ( typeof item === 'number' && !Number.isNaN( item ) ) {
            continue;
        }

        fail( `${field}.${key} must be string, number, or boolean.` );
    }
};

const validateMainOptions = ( options, field ) => {
    const data = ensureObject( options, field );
    const allowed = [ "max_duration_sec", "record", "ring_timeout_sec" ];

    const extra = Object.keys( data ).filter( ( key ) => !allowed.includes( key ) );
    if ( extra.length > 0 ) {
        fail( `Unknown option(s): ${extra.sort().join( ', ' )}` );
    }

    if ( "max_duration_sec" in data ) {
        ensureInt( data.max_duration_sec, `${field}.max_duration_sec`, 30, 7200 );
    }

    if ( "record" in data ) {
        ensureBoolean( data.record, `${field}.record` );
    }

    if ( "ring_timeout_sec" in data ) {
        ensureInt( data.ring_timeout_sec, `${field}.ring_timeout_sec`, 5, 120 );
    }
};

const validateFailoverConfig = ( failover, primaryAgentId, field ) => {
    const data = ensureObject( failover, field );
    validateRequiredAndAllowedKeys(
        data,
        [ "agent_id" ],
        [ "agent_id", "strategy", "max_duration_sec", "ring_timeout_sec", "machine_detection", "recording", "waiting_music", "metadata" ]
    );

    validateUUID( data.agent_id, `${field}.agent_id` );
    if ( data.agent_id === primaryAgentId ) {
        fail( `${field}.agent_id cannot be same as primary agent_id.` );
    }

    if ( "strategy" in data ) {
        ensureString( data.strategy, `${field}.strategy` );
        if ( data.strategy !== "simultaneous" && data.strategy !== "sequential" ) {
            fail( `${field}.strategy must be simultaneous or sequential.` );
        }
    }

    if ( "max_duration_sec" in data ) {
        ensureInt( data.max_duration_sec, `${field}.max_duration_sec`, 10, 7200 );
    }

    if ( "ring_timeout_sec" in data ) {
        ensureInt( data.ring_timeout_sec, `${field}.ring_timeout_sec`, 5, 120 );
    }

    if ( "machine_detection" in data ) {
        ensureBoolean( data.machine_detection, `${field}.machine_detection` );
    }

    if ( "waiting_music" in data ) {
        ensureString( data.waiting_music, `${field}.waiting_music` );
    }

    if ( "recording" in data ) {
        const recording = ensureObject( data.recording, `${field}.recording` );
        validateRequiredAndAllowedKeys( recording, [], [ "enabled", "channels", "format" ] );

        if ( "enabled" in recording ) {
            ensureBoolean( recording.enabled, `${field}.recording.enabled` );
        }

        if ( "channels" in recording ) {
            ensureString( recording.channels, `${field}.recording.channels` );
            if ( recording.channels !== "dual" && recording.channels !== "single" ) {
                fail( `${field}.recording.channels must be dual or single.` );
            }
        }

        if ( "format" in recording ) {
            ensureString( recording.format, `${field}.recording.format` );
            if ( recording.format !== "mp3" && recording.format !== "wav" ) {
                fail( `${field}.recording.format must be mp3 or wav.` );
            }
        }
    }

    if ( "metadata" in data ) {
        validateVariables( data.metadata, `${field}.metadata` );
    }
};

const validatePrompt = ( prompt, field ) => {
    const data = ensureObject( prompt, field );
    validateRequiredAndAllowedKeys( data, [ "type" ], [ "type", "file_name", "say", "voice_id", "language", "speed" ] );

    ensureString( data.type, `${field}.type` );
    if ( data.type !== "file" && data.type !== "say" ) {
        fail( `${field}.type must be one of: file, say.` );
    }

    if ( data.type === "file" && !( "file_name" in data ) ) {
        fail( `${field}.file_name is required when type is file.` );
    }

    if ( data.type === "say" ) {
        [ "say", "language", "voice_id", "speed" ].forEach( ( key ) => {
            if ( !( key in data ) ) {
                fail( `${field}.${key} is required when type is say.` );
            }
        } );
    }

    if ( "file_name" in data ) {
        ensureString( data.file_name, `${field}.file_name` );
    }

    if ( "say" in data ) {
        ensureString( data.say, `${field}.say` );
    }

    if ( "language" in data ) {
        ensureString( data.language, `${field}.language` );
    }

    if ( "voice_id" in data ) {
        ensureString( data.voice_id, `${field}.voice_id` );
    }

    if ( "speed" in data ) {
        ensureNumber( data.speed, `${field}.speed`, 0.5, 2.0 );
    }
};

const validateDtmf = ( dtmf, field ) => {
    const data = ensureObject( dtmf, field );
    validateRequiredAndAllowedKeys(
        data,
        [],
        [ "min_digits", "max_digits", "finish_on_key", "first_digit_timeout", "inter_digit_timeout", "flush_buffer" ]
    );

    if ( "min_digits" in data ) {
        ensureInt( data.min_digits, `${field}.min_digits`, 1 );
    }

    if ( "max_digits" in data ) {
        ensureInt( data.max_digits, `${field}.max_digits`, 1 );
    }

    if ( "finish_on_key" in data ) {
        ensureString( data.finish_on_key, `${field}.finish_on_key`, undefined, 1 );
    }

    if ( "first_digit_timeout" in data ) {
        ensureInt( data.first_digit_timeout, `${field}.first_digit_timeout`, 1 );
    }

    if ( "inter_digit_timeout" in data ) {
        ensureInt( data.inter_digit_timeout, `${field}.inter_digit_timeout`, 1 );
    }

    if ( "flush_buffer" in data ) {
        ensureBoolean( data.flush_buffer, `${field}.flush_buffer` );
    }
};

const validateOnResult = ( onResult, field ) => {
    const data = ensureObject( onResult, field );
    validateRequiredAndAllowedKeys( data, [ "type" ], [ "type", "ref", "url" ] );

    ensureString( data.type, `${field}.type` );
    if ( data.type !== "pcmo" && data.type !== "url" ) {
        fail( `${field}.type must be one of: pcmo, url.` );
    }

    if ( data.type === "pcmo" && !( "ref" in data ) ) {
        fail( `${field}.ref is required when type is pcmo.` );
    }

    if ( data.type === "url" && !( "url" in data ) ) {
        fail( `${field}.url is required when type is url.` );
    }

    if ( "ref" in data ) {
        ensureString( data.ref, `${field}.ref` );
    }

    if ( "url" in data ) {
        ensureString( data.url, `${field}.url` );
        if ( !HTTP_URL_RE.test( data.url ) ) {
            fail( `${field}.url must start with http:// or https://.` );
        }
    }
};

const validateRetries = ( retries, field ) => {
    const data = ensureObject( retries, field );
    validateRequiredAndAllowedKeys( data, [], [ "max", "no_input_prompt", "invalid_prompt" ] );

    if ( "max" in data ) {
        ensureInt( data.max, `${field}.max`, 0 );
    }

    if ( "no_input_prompt" in data ) {
        validatePrompt( data.no_input_prompt, `${field}.no_input_prompt` );
    }

    if ( "invalid_prompt" in data ) {
        validatePrompt( data.invalid_prompt, `${field}.invalid_prompt` );
    }
};

const validateConnectAction = ( action, field ) => {
    validateRequiredAndAllowedKeys( action, [ "action", "params", "endpoints" ], [ "action", "params", "endpoints" ] );

    const params = ensureObject( action.params, `${field}.params` );
    validateRequiredAndAllowedKeys(
        params,
        [ "caller_id" ],
        [ "strategy", "caller_id", "options", "metadata" ]
    );

    validatePhone( params.caller_id, `${field}.params.caller_id` );

    if ( "strategy" in params ) {
        ensureString( params.strategy, `${field}.params.strategy` );
        if ( params.strategy !== "simultaneous" && params.strategy !== "sequential" ) {
            fail( `${field}.params.strategy must be simultaneous or sequential.` );
        }
    }

    if ( "options" in params ) {
        const options = ensureObject( params.options, `${field}.params.options` );
        validateRequiredAndAllowedKeys(
            options,
            [],
            [ "max_duration_sec", "ring_timeout_sec", "machine_detection", "recording", "waiting_music" ]
        );

        if ( "max_duration_sec" in options ) {
            ensureInt( options.max_duration_sec, `${field}.params.options.max_duration_sec`, 10, 7200 );
        }

        if ( "ring_timeout_sec" in options ) {
            ensureInt( options.ring_timeout_sec, `${field}.params.options.ring_timeout_sec`, 5, 120 );
        }

        if ( "machine_detection" in options ) {
            ensureBoolean( options.machine_detection, `${field}.params.options.machine_detection` );
        }

        if ( "waiting_music" in options ) {
            ensureString( options.waiting_music, `${field}.params.options.waiting_music` );
        }

        if ( "recording" in options ) {
            const recording = ensureObject( options.recording, `${field}.params.options.recording` );
            validateRequiredAndAllowedKeys( recording, [], [ "enabled", "channels", "format" ] );

            if ( "enabled" in recording ) {
                ensureBoolean( recording.enabled, `${field}.params.options.recording.enabled` );
            }

            if ( "channels" in recording ) {
                ensureString( recording.channels, `${field}.params.options.recording.channels` );
                if ( recording.channels !== "dual" && recording.channels !== "single" ) {
                    fail( `${field}.params.options.recording.channels must be dual or single.` );
                }
            }

            if ( "format" in recording ) {
                ensureString( recording.format, `${field}.params.options.recording.format` );
                if ( recording.format !== "mp3" && recording.format !== "wav" ) {
                    fail( `${field}.params.options.recording.format must be mp3 or wav.` );
                }
            }
        }
    }

    if ( "metadata" in params ) {
        validateVariables( params.metadata, `${field}.params.metadata` );
    }

    const endpoints = ensureArray( action.endpoints, `${field}.endpoints` );
    if ( endpoints.length < 1 ) {
        fail( `${field}.endpoints must contain at least one endpoint.` );
    }

    let agentMode = false;
    let agentCount = 0;

    endpoints.forEach( ( endpoint, index ) => {
        const endpointField = `${field}.endpoints[${index}]`;
        const endpointObj = ensureObject( endpoint, endpointField );
        validateRequiredAndAllowedKeys( endpointObj, [ "type" ], [ "type", "number", "uri", "id", "headers" ] );

        ensureString( endpointObj.type, `${endpointField}.type` );
        if ( endpointObj.type !== "pstn" && endpointObj.type !== "sip" && endpointObj.type !== "agent" ) {
            fail( `${endpointField}.type must be one of: pstn, sip, agent.` );
        }

        if ( endpointObj.type === "pstn" ) {
            if ( !( "number" in endpointObj ) ) {
                fail( `${endpointField}.number is required when type is pstn.` );
            }
            validatePhone( endpointObj.number, `${endpointField}.number` );
            if ( agentMode ) {
                fail( "Agent endpoints must be at the end of connect.endpoints." );
            }
        }

        if ( endpointObj.type === "sip" ) {
            if ( !( "uri" in endpointObj ) ) {
                fail( `${endpointField}.uri is required when type is sip.` );
            }
            ensureString( endpointObj.uri, `${endpointField}.uri` );
            if ( agentMode ) {
                fail( "Agent endpoints must be at the end of connect.endpoints." );
            }
        }

        if ( endpointObj.type === "agent" ) {
            if ( !( "id" in endpointObj ) ) {
                fail( `${endpointField}.id is required when type is agent.` );
            }
            validateUUID( endpointObj.id, `${endpointField}.id` );
            agentMode = true;
            agentCount += 1;

            if ( agentCount > 2 ) {
                fail( "A maximum of two agent endpoints is allowed." );
            }
        }

        if ( "headers" in endpointObj ) {
            ensureObject( endpointObj.headers, `${endpointField}.headers` );
        }
    } );
};

const validatePlayAction = ( action, field ) => {
    validateRequiredAndAllowedKeys( action, [ "action", "file_name" ], [ "action", "file_name" ] );
    ensureString( action.file_name, `${field}.file_name` );
};

const validatePlayGetInputAction = ( action, field ) => {
    validateRequiredAndAllowedKeys(
        action,
        [ "action", "prompt", "input", "on_result" ],
        [ "action", "prompt", "input", "dtmf", "retries", "on_result" ]
    );

    validatePrompt( action.prompt, `${field}.prompt` );

    const inputModes = ensureArray( action.input, `${field}.input` );
    if ( inputModes.length === 0 ) {
        fail( `${field}.input must contain at least one item.` );
    }

    const seen = {};
    inputModes.forEach( ( mode, index ) => {
        const modeField = `${field}.input[${index}]`;
        ensureString( mode, modeField );
        if ( mode !== "dtmf" && mode !== "speech" ) {
            fail( `${modeField} must be dtmf or speech.` );
        }
        if ( seen[mode] ) {
            fail( `${field} contains duplicate value '${mode}'.` );
        }
        seen[mode] = true;
    } );

    if ( "dtmf" in action ) {
        validateDtmf( action.dtmf, `${field}.dtmf` );
    }

    if ( "retries" in action ) {
        validateRetries( action.retries, `${field}.retries` );
    }

    validateOnResult( action.on_result, `${field}.on_result` );
};

const validateParamAction = ( action, field ) => {
    validateRequiredAndAllowedKeys( action, [ "action", "data" ], [ "action", "data" ] );
    validateVariables( action.data, `${field}.data`, 256, 10 );
};

const validateRecordAction = ( action, field ) => {
    validateRequiredAndAllowedKeys( action, [ "action" ], [ "action", "format", "channels" ] );

    if ( "format" in action ) {
        ensureString( action.format, `${field}.format` );
        if ( action.format !== "mp3" && action.format !== "wav" ) {
            fail( `${field}.format must be mp3 or wav.` );
        }
    }

    if ( "channels" in action ) {
        ensureString( action.channels, `${field}.channels` );
        if ( action.channels !== "single" && action.channels !== "dual" ) {
            fail( `${field}.channels must be single or dual.` );
        }
    }
};

const validateHangupAction = ( action ) => {
    validateRequiredAndAllowedKeys( action, [ "action" ], [ "action" ] );
};

const validateInputAction = ( action, field ) => {
    validateRequiredAndAllowedKeys( action, [ "action", "on_result" ], [ "action", "dtmf", "on_result" ] );

    if ( "dtmf" in action ) {
        validateDtmf( action.dtmf, `${field}.dtmf` );
    }

    validateOnResult( action.on_result, `${field}.on_result` );
};

export const validatePipeline = ( pipeline, field = "pipeline" ) => {
    const items = ensureArray( pipeline, field );

    if ( items.length < 1 ) {
        fail( `${field} must contain at least one action.` );
    }

    items.forEach( ( item, index ) => {
        const actionField = `${field}[${index}]`;
        const action = ensureObject( item, actionField );

        if ( !( "action" in action ) ) {
            fail( `${actionField}.action is required.` );
        }

        ensureString( action.action, `${actionField}.action` );
        if ( !ACTIONS.includes( action.action ) ) {
            fail( `${actionField}.action must be one of: ${ACTIONS.slice().sort().join( ', ' )}.` );
        }

        if ( action.action === "connect" ) {
            validateConnectAction( action, actionField );
        } else if ( action.action === "play" ) {
            validatePlayAction( action, actionField );
        } else if ( action.action === "play_get_input" ) {
            validatePlayGetInputAction( action, actionField );
        } else if ( action.action === "param" ) {
            validateParamAction( action, actionField );
        } else if ( action.action === "record" ) {
            validateRecordAction( action, actionField );
        } else if ( action.action === "hangup" ) {
            validateHangupAction( action );
        } else if ( action.action === "input" ) {
            validateInputAction( action, actionField );
        }
    } );
};

export const validateAiCallRequest = ( payload ) => {
    const body = ensureObject( payload, "body" );
    validateRequiredAndAllowedKeys(
        body,
        [ "caller_id", "to_number", "agent_id" ],
        [ "caller_id", "to_number", "agent_id", "options", "variables", "app_id", "failover" ]
    );

    validatePhone( body.caller_id, "caller_id" );
    validatePhone( body.to_number, "to_number" );
    validateUUID( body.agent_id, "agent_id" );

    if ( "options" in body ) {
        validateMainOptions( body.options, "options" );
    }

    if ( "variables" in body ) {
        validateVariables( body.variables, "variables" );
    }

    if ( "failover" in body ) {
        if ( !( "app_id" in body ) ) {
            fail( "app_id is required when failover is provided." );
        }
        ensureString( body.app_id, "app_id" );
        validateFailoverConfig( body.failover, body.agent_id, "failover" );
    } else if ( "app_id" in body ) {
        fail( "app_id is only supported when failover is provided." );
    }
};

export const validateHangupRequest = ( payload ) => {
    const body = ensureObject( payload, "body" );
    validateRequiredAndAllowedKeys( body, [ "call_id" ], [ "call_id", "cause", "reason" ] );

    validateUUID( body.call_id, "call_id" );

    if ( "cause" in body ) {
        ensureString( body.cause, "cause", 1, 64 );
    }

    if ( "reason" in body ) {
        ensureString( body.reason, "reason", 1, 256 );
    }
};

export const validatePcmoCallRequest = ( payload ) => {
    const body = ensureObject( payload, "body" );
    validateRequiredAndAllowedKeys(
        body,
        [ "caller_id", "to_number", "pipeline", "app_id" ],
        [ "caller_id", "to_number", "pipeline", "app_id", "agent_id", "options", "variables" ]
    );

    validatePhone( body.caller_id, "caller_id" );
    validatePhone( body.to_number, "to_number" );
    ensureString( body.app_id, "app_id" );
    validatePipeline( body.pipeline, "pipeline" );

    if ( "agent_id" in body ) {
        validateUUID( body.agent_id, "agent_id" );
    }

    if ( "options" in body ) {
        validateMainOptions( body.options, "options" );
    }

    if ( "variables" in body ) {
        validateVariables( body.variables, "variables" );
    }
};

export const validateTransferRequest = ( payload ) => {
    const body = ensureObject( payload, "body" );
    validateRequiredAndAllowedKeys( body, [ "call_id", "pipeline" ], [ "call_id", "pipeline" ] );
    validateUUID( body.call_id, "call_id" );
    validatePipeline( body.pipeline, "pipeline" );
};

export const validateFlowCallRequest = ( payload ) => {
    const body = ensureObject( payload, "body" );
    validateRequiredAndAllowedKeys(
        body,
        [ "flow_id", "org_id", "caller_id", "to_number", "app_id" ],
        [ "flow_id", "org_id", "caller_id", "to_number", "app_id", "options", "variables" ]
    );

    validateUUID( body.flow_id, "flow_id" );
    validateUUID( body.org_id, "org_id" );
    validatePhone( body.caller_id, "caller_id" );
    validatePhone( body.to_number, "to_number" );
    ensureString( body.app_id, "app_id" );

    if ( "options" in body ) {
        validateMainOptions( body.options, "options" );
    }

    if ( "variables" in body ) {
        validateVariables( body.variables, "variables" );
    }
};
