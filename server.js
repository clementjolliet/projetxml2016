try {
    var existdbnode = require("existdb-node");
	var http = require("http");
	var querystring = require('querystring');
	var url = require('url');
} catch (ex) {
    handleErr(ex);
	console.log("Echec chargment framework node");
}

var server = http.createServer(function(req, res) {

    var params = querystring.parse(url.parse(req.url).query);

    res.writeHead(200, {"Content-Type": "text/plain"});

    if ('query' in params) 
    {
        res.write('Votre requete est ' + params['query']);
    }
    else 
    {
        res.write('Wrong parameters');
    }

    res.end();

});

server.listen(1337);