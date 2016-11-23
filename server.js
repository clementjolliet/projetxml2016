var http = require("http");
http.createServer(function (request, response) {
	response.writeHead(200, {
		'Content-Type': 'text/plain'
	});
	response.write('Serveur node JS Hello World !')
	response.end();
	console.log("Node.js server running on port 1337");
}).listen(1337);