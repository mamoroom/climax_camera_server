
/**
 * Module dependencies.
 */

var express = require('express');
var index = require('./routes/index');
var inbound = require('./routes/inbound');
var viewer = require('./routes/viewer');
var http = require('http');
var path = require('path');
var redis = require('redis');
var io = require('socket.io');

var app = express();
var subscriber = redis.createClient();


// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.json());
app.use(express.urlencoded());
app.use(express.bodyParser({uploadDir:'./uploads'}));
app.use(express.methodOverride());
app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'uploads')));

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

app.get('/', index.get);
app.post('/inbound', inbound.post);
app.get('/viewer', viewer.get);
app.get('/del_viewer', viewer.del);


//Configuration
var server = http.createServer(app);
server.listen(3000);
io = io.listen(server);
subscriber.subscribe('uploads');
subscriber.on('message', function(channel, message) {
	console.log('getMessage: '+ message);
	io.sockets.emit('updated', JSON.parse(message));
});

