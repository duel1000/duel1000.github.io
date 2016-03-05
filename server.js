var stitch  = require('stitch');
var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var uuid = require('node-uuid');
var express = require('express');
var port = process.env.PORT || 3000;
app.use(express.static('assets'));
var favicon = require('serve-favicon');
app.use(favicon(__dirname + '/favicon.ico'));
var fs = require('fs');

app.get('/', function(req, res)
{
	res.sendFile(__dirname + '/index.html');
});

app.get('/blog', function(req, res)
{
	res.sendFile(__dirname + '/index.html');
});

app.get('/about', function(req, res)
{
	res.sendFile(__dirname + '/index.html');
});

app.get('/portfolio', function(req, res)
{
	res.sendFile(__dirname + '/index.html');
});

app.get('/treasure', function(req, res)
{
	res.sendFile(__dirname + '/index.html');
});

app.get('/anecdotes.json', function(req, res)
{
	res.sendFile(__dirname + '/anecdotes.json');
}); 

app.get('/posts.json', function(req, res)
{
	res.sendFile(__dirname + '/posts.json');
}); 

http.listen(port, function()
{
	console.log('listening on *:' + port);
});