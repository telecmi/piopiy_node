import { isString } from '../underscore/index';
import axios from 'axios';



const voice = { host: "https://piopiy.telecmi.com", path: "/v1/call/global_action" };




export const call_hangup = async ( appid, secret, cmiuuid ) => {


    if ( isString( cmiuuid ) ) {


        var options = {
            "appid": appid,
            "secret": secret,
            "action": 'hangup',
            "cmiuid": cmiuuid
        }

        const response = await axios.post( voice.host + voice.path, options )
        return response.data;

    } else {
        throw new Error( 'cmiuuid type error' );
    }

};



