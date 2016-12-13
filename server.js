var rawData = [];

try {
	var http = require("http");
	var https = require("https");
	var querystring = require('querystring');
	var url = require('url');
	var fs = require("fs");
	var express = require('express');
	var wdk = require('wikidata-sdk')
	var util = require('util');
	var RateLimit = require('express-rate-limit');
} catch (ex) {
    handleErr(ex);
	console.log("Echec chargement framework node");
}

var app = express.createServer(function(req, res) {

	// Récupération des paramètres de l'url
    var params = querystring.parse(url.parse(req.url).query);

    // Header de la réponse
    res.writeHead(200, {"Content-Type": "text/json", 'Access-Control-Allow-Origin' : '*', 'Access-Control-Allow-Methods' : 'PUT, GET, POST, DELETE, OPTIONS', 'Access-Control-Allow-Headers' : 'Content-Type'});

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
    http.get(urlHTTP, (result) => {
		  result.setEncoding('utf8');
		  rawData = '';
		  result.on('data', (chunk) => rawData += chunk);
		  result.on('end', () => {
			    try {
			    	rawData = JSON.parse(rawData);

			    	var currentHttpCallPosition = 0;
			    	for (var i=0; i<rawData.length; i++)
			    	{

			    		monumentData = rawData[i];
			    		var query = 'SELECT DISTINCT (GROUP_CONCAT(DISTINCT ?merimee; SEPARATOR = ", ") AS ?merimee) ?coords ?image WHERE { { SELECT DISTINCT ?item ?merimee WHERE { ?item (wdt:P1435/wdt:P279*) wd:Q916475. ?item p:P1435 ?heritage_statement. ?item wdt:P380 ?merimee. FILTER(REGEX(?merimee, "'+ monumentData['REF'] +'")) FILTER(NOT EXISTS { ?heritage_statement pq:P582 ?end. }) } } OPTIONAL { ?item wdt:P625 ?coords. } OPTIONAL { ?item wdt:P18 ?image. } SERVICE wikibase:label { bd:serviceParam wikibase:language "fr". } } GROUP BY ?item ?coords ?image';
			    		var urlQuery = wdk.sparqlQuery(query);
			    		https.get(urlQuery, (result2) => {
			    			result2.setEncoding('utf8');
		  					var rawData2 = '';
		  					result2.on('data', (chunk2) => rawData2 += chunk2);
		  					result2.on('end', () => {

		  						rawData2 = JSON.parse(rawData2);

		  						var imageData = rawData2['results']['bindings'][0]['image'];
		  						var merimee = rawData2['results']['bindings'][0]['merimee']['value'];
		  						var imageUrl = '';
		  						if (imageData)
		  						{
		  							imageUrl = imageData['value'];
		  						}

		  						var coordsData = rawData2['results']['bindings'][0]['coords'];
		  						var lat = '';
		  						var long = '';
		  						if (coordsData)
		  						{
		  							var point = coordsData['value'];
		  							var posParOuvrante = point.indexOf('(');
		  							var posEspace = point.indexOf(' ');
		  							var posParFermante = point.indexOf(')');
		  							lat = point.substring(posParOuvrante + 1, posEspace);
		  							long = point.substring(posEspace + 1 , posParFermante);
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
							      	res.write(rawData);
									res.end();
		  						}
							});
			    		}).on('error', (e) => {
		  					console.log(`Got error: ${e.message}`);
		  				});
			    	}
			    } catch (e) {
			      console.log(e.message);
			    }
		  	});
		}).on('error', (e) => {
		  console.log(`Got error: ${e.message}`);
	});
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
