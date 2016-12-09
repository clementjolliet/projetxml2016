try {
	var http = require("http");
	var querystring = require('querystring');
	var url = require('url');
	var fs = require("fs");
} catch (ex) {
    handleErr(ex);
	console.log("Echec chargement framework node");
}

var server = http.createServer(function(req, res) {

	// Récupération des paramètres de l'url
    var params = querystring.parse(url.parse(req.url).query);

    // Header de la réponse
    res.writeHead(200, {"Content-Type": "text/json"});

    var urlHTTP = 'http://localhost:8080/exist/rest/db/request_monuments.xqy?';

    if ('search' in params && params['search'] != "") 
    {
        urlHTTP += 'search=' + params['search'] + '&';
    }
    else
    {
    	 if ('start' in params && params['start'] != "") 
	    {
	        urlHTTP += 'start=' + params['start']  + '&';
	    }

	    if ('length' in params && params['length'] != "") 
	    {
	        urlHTTP += 'length=' + params['length']  + '&';
	    }
    }

    // Appel HTTP pour effectuer la rechercher sur la BD
    http.get(urlHTTP, (result) => {
		  const statusCode = result.statusCode;
		  const contentType = result.headers['content-type'];

		  let error;
		  if (statusCode !== 200) {
		    error = new Error(`Request Failed.\n` +
		                      `Status Code: ${statusCode}`);
		  } else if (!/^application\/json/.test(contentType)) {
		    error = new Error(`Invalid content-type.\n` +
		                      `Expected application/json but received ${contentType}`);
		  }
		  if (error) {
		    console.log(error.message);
		    // consume response data to free up memory
		    result.resume();
		    return;
		  }

		  result.setEncoding('utf8');
		  let rawData = '';
		  result.on('data', (chunk) => rawData += chunk);
		  result.on('end', () => {
			    try {
			    	if (rawData == "null")
			    	{
			    		rawData = '[]';
			    	}

			    	if ('search' in params && params['search'] != "")
			    	{
			    		rawData = JSON.parse(rawData);
			    		rawData = rawData.slice(parseInt(params['start']), parseInt(params['start']) + parseInt(params['length']));
			    		rawData = JSON.stringify(rawData);
			    	}
			      	res.write(rawData);
					res.end();
			    } catch (e) {
			      console.log(e.message);
			    }
		  	});
		}).on('error', (e) => {
		  console.log(`Got error: ${e.message}`);
	});
});

server.listen(1337);