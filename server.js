var rawData = [];

try {
	var http = require("http");
	var https = require("https");
	var querystring = require('querystring');
	var url = require('url');
	var fs = require("fs");
	var express = require('express');
	var wdk = require('wikidata-sdk');
	var util = require('util');
	var path = require('path');
} catch (ex) {
    handleErr(ex);
	console.log("Echec chargement framework node");
}

var app = express.createServer(function(req, res) {

	var filePath = '.' + req.url;
    if (filePath == './')
        filePath = './index.html';

    if (filePath.indexOf('/api') == -1)
    {

	    var extname = path.extname(filePath);
	    var contentType = 'text/html';
	    switch (extname) {
	        case '.js':
	            contentType = 'text/javascript';
	            break;
	        case '.css':
	            contentType = 'text/css';
	            break;
	        case '.json':
	            contentType = 'application/json';
	            break;
	        case '.png':
	            contentType = 'image/png';
	            break;      
	        case '.jpg':
	            contentType = 'image/jpg';
	            break;
	        case '.wav':
	            contentType = 'audio/wav';
	            break;
	    }

	    fs.readFile(filePath, function(error, content) {
	        if (error) {
	            if(error.code == 'ENOENT'){
	                fs.readFile('./404.html', function(error, content) {
	                    res.writeHead(200, { 'Content-Type': contentType });
	                    res.end(content, 'utf-8');
	                });
	            }
	            else {
	                res.writeHead(500);
	                res.end('Sorry, check with the site admin for error: '+error.code+' ..\n');
	                res.end(); 
	            }
	        }
	        else {
	            res.writeHead(200, { 'Content-Type': contentType });
	            res.end(content, 'utf-8');
	        }
	    });

	}
    else
    {
    	// Récupération des paramètres de l'url
		var params = querystring.parse(url.parse(req.url).query);

    	// Header de la réponse
		res.writeHead(200, {"Content-Type": "text/json", 'Access-Control-Allow-Origin' : '*', 'Access-Control-Allow-Methods' : 'PUT, GET, POST, DELETE, OPTIONS', 'Access-Control-Allow-Headers' : 'Content-Type'});

    	if (filePath.indexOf('/api/getMonuments') != -1)
    	{

		    // Paramètre searchBy
		    var searchBy = 'REF';

		    if ('searchBy' in params && params['searchBy'] != "")
		    {
		    	searchBy = params['searchBy'];
		    }

		    // Url de la requete vers la base Exist
		    var urlHTTP = 'http://localhost:8080/exist/rest/db/request_monuments_by_' + searchBy + '.xqy?';

		    // Paramètre search
		    if ('search' in params && params['search'] != "") 
		    {
		        urlHTTP += 'search=' + params['search'] + '&';
		    }

		    if ('start' in params && params['start'] != "") 
		    {
		        urlHTTP += 'start=' + params['start'] + '&';
		    }

		    if ('length' in params && params['length'] != "") 
		    {
		        urlHTTP += 'length=' + params['length'] + '&';
		    }

		    

		    // Appel HTTP pour effectuer la rechercher sur la BD
		    var requeteHTTP1 = http.get(urlHTTP, (result) => {
				  result.setEncoding('utf8');
				  rawData = '';
				  result.on('data', (chunk) => rawData += chunk);
				  result.on('end', () => {
					    try {
					    	rawData = JSON.parse(rawData);

					    	var currentHttpCallPosition = 0;

					    		var query = 'SELECT DISTINCT (GROUP_CONCAT(DISTINCT ?merimee; SEPARATOR = ", ") AS ?merimee) ?coords ?image WHERE { { SELECT DISTINCT ?item ?merimee WHERE { ?item (wdt:P1435/wdt:P279*) wd:Q916475. ?item p:P1435 ?heritage_statement. ?item wdt:P380 ?merimee. FILTER(REGEX(?merimee, "';
					    		for (var i=0; i<rawData.length; i++)
					    		{
					    			if (i != rawData.length - 1)
					    				query = query + rawData[i]['REF'] + '|';
					    			else
					    				query = query + rawData[i]['REF'];
					    		}
					    		query = query + '")) FILTER(NOT EXISTS { ?heritage_statement pq:P582 ?end. }) } } OPTIONAL { ?item wdt:P625 ?coords. } OPTIONAL { ?item wdt:P18 ?image. } SERVICE wikibase:label { bd:serviceParam wikibase:language "fr". } } GROUP BY ?item ?coords ?image';
					    		var urlQuery = wdk.sparqlQuery(query);

					    		var requeteHTTP2 = https.get(urlQuery, (result2) => {
					    			result2.setEncoding('utf8');
				  					var rawData2 = '';
				  					result2.on('data', (chunk2) => rawData2 += chunk2);
				  					result2.on('end', () => {
				  						rawData2 = JSON.parse(rawData2);

				  						var resultatsRequete = rawData2['results']['bindings'];

				  						var nbResultatsRequete = resultatsRequete.length;

				  						for(var i=0; i<nbResultatsRequete; i++)
				  						{

					  						var imageData = resultatsRequete[i]['image'];
					  						var merimee = resultatsRequete[i]['merimee']['value'];
					  						var imageUrl = '';
					  						if (imageData)
					  						{
					  							imageUrl = imageData['value'];
					  						}

					  						var coordsData = resultatsRequete[i]['coords'];
					  						var lat = '';
					  						var long = '';
					  						if (coordsData)
					  						{
					  							var point = coordsData['value'];
					  							var posParOuvrante = point.indexOf('(');
					  							var posEspace = point.indexOf(' ');
					  							var posParFermante = point.indexOf(')');
					  							long = point.substring(posParOuvrante + 1, posEspace);
					  							lat = point.substring(posEspace + 1 , posParFermante);
					  						}

					  						for (var j=0; j<getRawData().length; j++)
					  						{
					  							if (merimee == getRawData()[j]['REF'])
					  							{
					  								setRawDataParameter(j, 'IMG', imageUrl);
					  								setRawDataParameter(j, 'LAT', lat);
					  								setRawDataParameter(j, 'LONG', long);
					  							}
					  						}

					  						currentHttpCallPosition++;
					  						if (currentHttpCallPosition == getRawData().length)
					  						{
					  							rawData = JSON.stringify(getRawData());
					  							requeteHTTP1.end();
					  							requeteHTTP2.end();
										      	res.write(rawData);
												res.end();
					  						}
					  					}
									});
					    		}).on('error', (e) => {
				  					console.log(`Got error: ${e.message}`);
				  				});
					    } catch (e) {
					      console.log(e.message);
					    }
				  	});
				}).on('error', (e) => {
				  console.log(`Got error: ${e.message}`);
			});
		}

		if (filePath.indexOf('/api/getStats') != -1)
    	{
    		searchBy = 'regions';
    		if ('searchBy' in params && params['searchBy'] != "")
		    {
		    	searchBy = params['searchBy'];
		    }

		    number = 10;
    		if ('number' in params && params['number'] != "")
		    {
		    	number = parseInt(params['number']);
		    }

		    var urlHTTP = 'http://localhost:8080/exist/rest/db/request_stat_';

		   	// Url de la requete vers la base Exist
		    urlHTTP += searchBy + '.xqy';

		    var requeteHTTP1 = http.get(urlHTTP, (result) => {

		    	result.setEncoding('utf8');
				  rawData = '';
				  result.on('data', (chunk) => rawData += chunk);
				  result.on('end', () => {
				  		rawData = JSON.parse(rawData);
				  		rawDataResult = [];

				  		for (var i=0; i<number; i++)
				  		{
				  			rawDataResult[i] = rawData[i];
				  		}

				  		res.write(JSON.stringify(rawDataResult));
						res.end();
				  });
			});
    	} 
	}
});

function afficheMessageErreurHTTP(resultat)
{
	const statusCode = result.statusCode;
	const contentType = result.headers['content-type'];

	var error;
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
}

function setRawDataParameter(position, key, valeur)
{
	rawData[position][key] = valeur;
}

function getRawData()
{
	return rawData;
}

app.listen(1337);
