var express = require('express');
var app = require('express')();
var server = require('http').Server(app);
var io = require('socket.io')(server);
var log = console.log;
var usersOnline = 0;
var port = 1337;

var Players_MainMenu;

server.listen(port);

onStart();

app.use('/public', express.static(__dirname + '/public'));
app.get('/', function (req, res) {
  res.sendFile(__dirname + '/index.html');
});

function onStart()
{
	Players_MainMenu = [];
	log("Server started on port: " + port);
}

io.on('connection', function (socket) 
{
	usersOnline++;
	Players_MainMenu.push(new Player(socket.id));
	console.log("------------------------------");
	console.log("");
	console.log(socket.id + " has connected");
	console.log("");

	log(Players_MainMenu);

	socket.on('disconnect', function()
	{
		usersOnline--;

		for(var i = 0; i < Players_MainMenu.length; i++)
		{
			if(Players_MainMenu[i].id == socket.id)
			{
				log(Players_MainMenu[i].id + ' has disconnected');
				log('');
				Players_MainMenu.splice(Players_MainMenu.indexOf(Players_MainMenu[i]), 1);
			}
		}

		log(Players_MainMenu);
	});

	socket.on('requestUsersOnline', function()
	{
		socket.emit('showOnlineUsers', usersOnline);
	});
});

function Player(id)
{
	var player = {
		id: id,
		nickname: undefined,
		x: undefined,
		y: undefined,
		width: undefined,
		height: undefined
	}

	return player;
}