try {
    var existdbnode = require("existdb-node");
	var http = require("http");
} catch (ex) {
    handleErr(ex);
	console.log("Echec chargment plugin");
}

http.createServer(function (request, response) {
	response.writeHead(200, {
		'Content-Type': 'text/plain'
	});
	response.write('Serveur node JS Hello World !')
	response.end();
	console.log("Node.js server running on port 1337");
}).listen(1337);