var koa = require('koa');
var logger = require('koa-logger');
var mount = require('koa-mount');
var serve = require('koa-static');
var session = require('koa-session');

var app = koa();
var static_resource = serve(__dirname + '/public');

// session
app.keys = ['hello'];
app.use(session(app));

// log requests
app.use(logger());

require('./route')(app);

// serve files from ./public
app.use(mount('/public', static_resource));

// listen
app.listen(3000);
console.log('listening on port 3000');
