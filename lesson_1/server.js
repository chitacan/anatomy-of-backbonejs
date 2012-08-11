var http = require('http');

http.createServer(function(req, res) {
	var result = {description:'pick up milk', status:'incomplete', id: 1};

	res.writeHead(200, {
		"Content-Type":"application/json",
		"Access-Control-Allow-Origin":"*"
	});
	res.end(JSON.stringify(result));
	console.log('response result!!');
}).listen(8080);