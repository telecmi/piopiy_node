class PipelineBuilder {

    constructor ( actions = [] ) {
        this.actions = [ ...actions ];
    }

    connect ( params, endpoints ) {
        this.actions.push( {
            action: "connect",
            params,
            endpoints
        } );
        return this;
    }

    play ( file_name ) {
        this.actions.push( {
            action: "play",
            file_name
        } );
        return this;
    }

    playGetInput ( prompt, input, on_result, dtmf, retries ) {
        const action = {
            action: "play_get_input",
            prompt,
            input,
            on_result
        };

        if ( dtmf !== undefined ) {
            action.dtmf = dtmf;
        }

        if ( retries !== undefined ) {
            action.retries = retries;
        }

        this.actions.push( action );
        return this;
    }

    play_get_input ( prompt, input, on_result, dtmf, retries ) {
        return this.playGetInput( prompt, input, on_result, dtmf, retries );
    }

    param ( data ) {
        this.actions.push( {
            action: "param",
            data
        } );
        return this;
    }

    record ( format, channels ) {
        const action = { action: "record" };

        if ( format !== undefined ) {
            action.format = format;
        }

        if ( channels !== undefined ) {
            action.channels = channels;
        }

        this.actions.push( action );
        return this;
    }

    hangup () {
        this.actions.push( { action: "hangup" } );
        return this;
    }

    input ( on_result, dtmf ) {
        const action = {
            action: "input",
            on_result
        };

        if ( dtmf !== undefined ) {
            action.dtmf = dtmf;
        }

        this.actions.push( action );
        return this;
    }

    build () {
        return [ ...this.actions ];
    }

    PCMO () {
        return this.build();
    }

    clear () {
        this.actions = [];
        return this;
    }
}

export default PipelineBuilder;

