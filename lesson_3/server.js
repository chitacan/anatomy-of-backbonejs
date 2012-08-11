var express	= require('express');
var app 	= express();
var server 	= require('http').createServer(app).listen(8080);

app.configure(function(){
  app.use(express.bodyParser());
});

app.get('/', function(req, res) {
	res.sendfile(__dirname + '/client.html');
});

app.get('/todo', function(req, res) {
	console.log('GET todo requtest');

	var result = {description:'pick up milk', status:'incomplete', id: 1};
	res.writeHead(200, {
		"Content-Type":"application/json",
	});
	res.end(JSON.stringify(result));
});

app.post('/todo', function(req, res) {
	console.log(req.body);
	res.end();
});

app.delete('/todo/:id', function(req, res) {
	console.log('delete requested!!, id : ' + req.params.id);
	res.end();
});