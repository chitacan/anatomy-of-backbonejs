
/**
 * Module dependencies.
 */

var express = require('express')
  , routes = require('./routes')
  , http = require('http')
  , path = require('path');

var app = express();

app.configure(function(){
  app.set('port', process.env.PORT || 8080);
  app.set('views', __dirname + '/views');
  app.set('view engine', 'jade');
  app.use(express.favicon());
  app.use(express.logger('dev'));
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use(app.router);
  app.use(express.static(path.join(__dirname, 'public')));
});

app.configure('development', function(){
  app.use(express.errorHandler());
});

app.get('/', routes.index);

// response 1 todo item
app.get('/todo', function(req, res) {
  console.log('request GET /todo');

  var result = {description:'pick up milk', status:'incomplete', id: 0};

  res.writeHead(200, {
    "Content-Type":"application/json",
  });

  res.end(JSON.stringify(result));
});

// response 1 or more item
app.get('/todos', function(req, res) {
  console.log('request GET /todo');
  var result = [
    {description:'pick up milk', status:'incomplete', id: 0},
    {description:'this is second', status:'incomplete', id: 1}
  ];

  res.writeHead(200, {
    "Content-Type":"application/json",
  });

  res.end(JSON.stringify(result));
})

app.put('/todos/:id', function(req, res) {
  console.log('request put to id : ' + req.params.id);
  console.log(req.body);
});

http.createServer(app).listen(app.get('port'), function(){
  console.log("Express server listening on port " + app.get('port'));
});
