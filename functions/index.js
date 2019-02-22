const functions = require('firebase-functions');
const https = require('https');


//API Link: https://us-central1-transactiondetails-1355c.cloudfunctions.net/getDetails?url=0x76c3a343d98fbf9d767124eff955a7429459bdf07dd3834606c572ab0886a3d9

//Error: https://github.com/firebase/firebase-functions/issues/80
/*

Error: getaddrinfo ENOTFOUND api.etherscan.io api.etherscan.io:443
    at errnoException (dns.js:28:10)
    at GetAddrInfoReqWrap.onlookup [as oncomplete] (dns.js:76:26)

*/
exports.getDetails = functions.https.onRequest((request, response) => {
    const inputUrl = request.query.url;
    // const index = inputUrl.indexOf('Hash=');
    // const hash = inputUrl.substring(index + 5, inputUrl.length);
   
    return new Promise((resolve, reject) => { 
        let data = '';
        const request = https.get('https://api.etherscan.io/api?module=proxy&action=eth_getTransactionByHash&txhash=' + inputUrl, (res) => {
            res.on('data', (d) => {
                data += d;
            });
            res.on('end', resolve);
        });
        request.on('error', reject);
    });
});
