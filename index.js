const https = require('https');



var getDetails = function(input){

    var index = url.indexOf('Hash='); 
    var hash = url.substring(index+5,url.length);
    
    https.get('https://api.etherscan.io/api?module=proxy&action=eth_getTransactionByHash&txhash='+hash, (resp) => {
      let data = '';
    
      // A chunk of data has been recieved.
      resp.on('data', (chunk) => {
        data += chunk;
      });
    
      // The whole response has been received. Print out the result.
      resp.on('end', () => {
        console.log(JSON.parse(data));
      });
    
    }).on("error", (err) => {
      console.log("Error: ", err);
    });
}

var url = 'https://etherscan.io/tx/Hash=0x76c3a343d98fbf9d767124eff955a7429459bdf07dd3834606c572ab0886a3d9' ;
getDetails(url);
