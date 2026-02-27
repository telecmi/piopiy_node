import { isString } from './underscore/index';
import PiopiyAction from './action/action';
import StreamAction from './action/stream_action';
import AiAgent from './voice/ai_agent';
import Voice from './voice/voice';
import Pcmo from './voice/pcmo';
import Flow from './voice/flow';
import PipelineBuilder from './voice/pipeline';

class Piopiy {

    constructor ( token, secret ) {
        if ( isString( token ) && secret === undefined ) {
            this.auth = token;
            this.ai = new AiAgent( this.auth );
            this.voice = new Voice( this.auth );
            this.pcmo = new Pcmo( this.auth );
            this.flow = new Flow( this.auth );
        } else {
            throw new Error( "From v1.0.9, Piopiy only supports Bearer Token authentication. Init with `new Piopiy('YOUR_TOKEN')`." );
        }
    }
}

export {
    Piopiy,
    PiopiyAction,
    StreamAction,
    PipelineBuilder,
};
