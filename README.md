# PIOPIY NodeJS SDK

The Node.js SDK makes it simpler to integrate communications into your Node.js applications using the PIOPIY REST API. Using the SDK, you will be able to make voice calls and can control your call flows.

## Install

Follow the below installation instructions

### Prerequisites

Prerequisites for javascript web server.

- <a href="https://nodejs.org/en/" target="_blank">node.js</a> (>= v10.16.3 required)
- <a href="https://www.npmjs.com/" target="_blank">npm</a> (>= 6.9.0 required)

### Install SDK using npm

```bash
$ npm install piopiy
```
## Required Parameters

These are the required parameters to make a call.

| Parameter Name           | Type   |      Description                                            |
|  ---                     |    --- | ---                                                         | 
| your_app_id              | number | Your app id                                                 | 
| your_app_secret          | string | Your app secret                                             | 
| your_to_number           | number | The number the call was made to                             | 
| your_piopiy_phone_number | number | Your caller id for this call                                | 
| your_answer_url          | string | Your webserver URL contains list of action                  | 



## Make a call
```javascript
const Piopiy = require( 'piopiy' );
const piopiy = new Piopiy( 
    'your_app_id', 
    'your_app_secret' 
    );

piopiy.voice.make( 
    'your_to_number', 
    'your_piopiy_phone_number',
    'your_answer_url' 
).then( ( answer_url ) => {
     console.log( answer_url )
} ).catch( ( err ) => {
     console.log( error )
} );
```




