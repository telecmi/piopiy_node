# PIOPIY NodeJS SDK


The Node.js SDK is used to integrate communications into your Node.js applications using the PIOPIY REST API. Using the SDK, you will be able to make voice calls and can control your call flows.

## Install

Follow the below installation instructions

### Prerequisites

Prerequisites for javascript web server.

- <a href="https://nodejs.org/en/" target="_blank">node.js</a> (>= v10.16.3 required)
- <a href="https://www.npmjs.com/" target="_blank">npm</a> (>= 6.9.0 required)

## Installation

Install the SDK using npm

```bash
$ npm install piopiy
```


### Authentication

In order to authenticate your app, and to make an API request, you should have an app id and secret for authentication. Find your App ID and secret in your <a href="https://doc.telecmi.com/piopiy/docs/build-app#app-id-and-secret" target="_blank">PIOPIY dashboard</a>

Specifiy the authentication credentials 

```javascript
const Piopiy = require( 'piopiy' );
const piopiy = new Piopiy( 'your_app_id', 'your_app_secret' );
```

### Make a call

To make a call, mention the to_number, piopiy_phone_number and <a href="https://doc.telecmi.com/piopiy/docs/configure-url" target="_blank">answer_url</a>.

```javascript
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
### More Examples

Refer to the <a href="https://doc.telecmi.com/piopiy/docs/pcmo-overview" target="_blank">piopiy docs</a> for more examples. Now create the <a href="https://doc.telecmi.com/piopiy/docs/get-started#signup" target="_blank">PIOPIY account</a> and setup the express server and test out your integration in few minutes.

### Reporting issues

For any feedbacks and problems, you can <a href="https://github.com/telecmi/piopiy_node/issues" >open an issue on github</a>.


