const fs = require('fs');
const express = require('express');
const Loader = require('./loader').Loader;
const http = require('http');

const app = express();
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);
const port = parseInt(process.env['PORT'] || '8989', 10);
const WORLD_DIR = "./world"
const loader  = new Loader(WORLD_DIR);
const game    = loader.game;

const _ = require("underscore");

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

// Code editor
app.get("/files/", function(req, res) {
  res.setHeader('Content-Type', 'application/json');

  let output = [];
  for (let f of fs.readdirSync(WORLD_DIR)) {
    if (f[0] === '.') continue;
    const errorPath = WORLD_DIR + "/.errors/" + f;
    const error = fs.existsSync(errorPath) ? fs.readFileSync(errorPath, {"encoding": "utf-8"}) : null;
    output.push({filename: f, error});
  }

  output = _.sortBy(output, f => f.filename)

  res.end(JSON.stringify(output));
});

app.get("/files/:filename", function(req, res) {
  const name = req.params.filename;
  if (!(name && name.match && name.match(/^[a-zA-Z0-9._-]+$/))) {
    res.status(404);
    res.end("I don't like the name")
    return;
  }

  let path = WORLD_DIR + "/" + name;
  if (req.query.version) {
    path = WORLD_DIR + "/.backups/" + name + "." + parseInt(req.query.version, 10);
  }
  const data = fs.readFileSync(path)
  res.end(data);
});

function backupWorldFile(name) {
  const path = WORLD_DIR + "/" + name;
  if (!fs.existsSync(path)) return;
  if (!fs.existsSync(WORLD_DIR + "/.backups")) {
    fs.mkdirSync(WORLD_DIR + "/.backups");
  }
  for (let i = 1; ; i++) {
    const backupPath = WORLD_DIR + "/.backups/" + name + "." + i;
    if (!fs.existsSync(backupPath)) {
      fs.copyFileSync(path, backupPath);
      break;
    }
  }
}

app.put("/files/:filename", function(req, res) {
  const name = req.params.filename;
  if (!(name && name.match && name.match(/^[a-zA-Z0-9._-]+$/))) {
    res.status(404);
    res.end("I don't like the name")
    return;
  }
  let buffer = Buffer.alloc(0);
  // req.setEncoding(null)
  req.on('data', (chunk) => {
    buffer = Buffer.concat([buffer, Buffer.from(chunk)])
  });
  req.on("end", () => {
    backupWorldFile(name);
    fs.writeFileSync(WORLD_DIR + "/" + name, buffer, {encoding: "binary"});
    loader.update();
    res.status(201);
    res.end("");
  })
});

app.delete("/files/:filename", function (req, res) {
  const name = req.params.filename;
  if (!(name && name.match && name.match(/^[a-zA-Z0-9._-]+$/))) {
    res.status(404);
    res.end("I don't like the name")
    return;
  }

  backupWorldFile(name);
  fs.unlinkSync(WORLD_DIR + "/" + name);
  res.status(201);
  res.end("");
});

app.get("/edit/", function(req, res) {
  fs.createReadStream("./client/editfile.html").pipe(res);
});

app.get("/edit/:filename", function(req, res) {
  fs.createReadStream("./client/editfile.html").pipe(res);
});


app.get("/history/:filename", function(req, res) {
  const name = req.params.filename;
  if (!(name && name.match && name.match(/^[a-zA-Z0-9._-]+$/))) {
    res.status(404);
    res.end("I don't like the name")
    return;
  }
  history = [];
  for (let i = 1; ; i++) {
    const backupPath = WORLD_DIR + "/.backups/" + name + "." + i;
    if (fs.existsSync(backupPath)) {
      history.unshift({version: i, mtime: fs.statSync(backupPath).mtime});
    } else {
      break;
    }
  }
  res.setHeader('Content-Type', 'application/json');
  res.end(JSON.stringify(history));
});

app.get("/logs/:filename", function(req, res) {
  const name = req.params.filename;
  if (!(name && name.match && name.match(/^[a-zA-Z0-9._-]+$/))) {
    res.status(404);
    res.end("I don't like the name")
    return;
  }
  let path = WORLD_DIR + "/.logs/" + name;
  const data = fs.readFileSync(path)
  res.end(data);
});

server.listen(port, "0.0.0.0", () => {
  console.log('listening on *:' + port);
});
