const fs = require('fs');
const express = require('express');
const Loader = require('./loader').Loader;
const http = require('http');

const app = express();
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);
const port = parseInt(process.env['PORT'] || '8989', 10);
const loader  = new Loader("./world");
const game    = loader.game;

// Serve the index.html as the root
app.get("/", function(req, res) {
  fs.createReadStream("./client/index.html").pipe(res);
});

// Serve static files, the js and css
app.use("/", express.static("./client"));

io.sockets.on('connection', function (socket) {
  socket.on('login', function (name) {
    if (!(name && name.match && name.match(/^[a-zA-Z0-9._-]+$/))) {
      socket.emit('write', {string: 'NICE TRY. Try picking a name without spaces or special characters.'});
      return;
    }
    var player = game.createPlayer(name);
    player.on('write', function (string) {
      socket.emit('write', string);
    });
    socket.on('command', function (command) {
      if (command) {
        player.execute(command);
      }
    });
    player.execute('look');    
    game.emit('enterRoom',player, player.getCurrentRoom(), game);
    socket.on('disconnect', function () {
      delete game.players[player.name];
    });
  });
});

server.listen(port, () => {
  console.log('listening on *:' + port);
});
