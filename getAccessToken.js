// /**
//  * This is an example of a basic node.js script that performs
//  * the Client Credentials oAuth2 flow to authenticate against
//  * the Spotify Accounts.
//  *
//  * For more information, read
//  * https://developer.spotify.com/web-api/authorization-guide/#client_credentials_flow
//  */

// var request = require('request'); // "Request" library

// var client_id = 'dfec414d502d4763abd5b700f0641eff'; // Your client id
// var client_secret = 'c6a2aac14b1e435580db2309d9267af7'; // Your secret

// // your application requests authorization
// var authOptions = {
//     url: 'https://accounts.spotify.com/api/token',
//     headers: {
//         'Authorization': 'Basic ' + (new Buffer(client_id + ':' + client_secret).toString('base64'))
//     },
//     form: {
//         grant_type: 'client_credentials'
//     },
//     json: true
// };

// request.post(authOptions, function (error, response, body) {
//     if (!error && response.statusCode === 200) {

//         // use the access token to access the Spotify Web API
//         var token = body.access_token;
//         var options = {
//             url: 'https://api.spotify.com/v1/users/jmperezperez',
//             headers: {
//                 'Authorization': 'Bearer ' + token
//             },
//             json: true
//         };
//         request.get(options, function (error, response, body) {
//             console.log(body);
//         });
//     }
// });


const fetch = require('node-fetch');

const CLIENT_ID = 'dfec414d502d4763abd5b700f0641eff';
const CLIENT_SECRET = 'c6a2aac14b1e435580db2309d9267af7';

const getToken = async () => {
    const auth = Buffer.from(`${CLIENT_ID}:${CLIENT_SECRET}`).toString('base64');

    const response = await fetch('https://accounts.spotify.com/api/token', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            'Authorization': `Basic ${auth}`
        },
        body: 'grant_type=client_credentials'
    });

    const data = await response.json();

    return data.access_token;
}

async function run() {
    const token = await getToken();
    console.log(token);
}

run();
