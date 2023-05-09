/* Nodeventure game engine: Is responsible for running the game,
 * contains the core logic but is extended by the world modules.
 *
 */
var util = require("util");
var events = require("events");
var _ = require("underscore");

module.exports.Game = Game;

// Represents a running game (usually you'd just have one!)
function Game() {
  var _this = this;
  // Set up the event emmiter
  events.EventEmitter.call(this);
  this.rooms = {};
  this.players = {};
  this.commands = {};
  setInterval(function () {_this.emit('tick');}, 1000);
  this.display = new Display(this, this.broadcast);
}
// We inherit from node's event emmiter to allow events on the game,
// world modules listen to them via the Fascade in loader.js which
// also handles disconnecting them when the world modules are reloaded.
util.inherits(Game, events.EventEmitter);

_.extend(Game.prototype, {
  // Create or return a named player
  createPlayer: function (name) {
    name = name.toLowerCase();
    if (!(name in this.players)) {
      this.players[name] = new Player(this, name);
      this.emit('joinPlayer', this.players[name], this);
      if (this.players[name].getCurrentRoom()) {
        this.emit('enterRoom', this.players[name], this.players[name].getCurrentRoom(), this);
      }
    }
    return this.players[name];
  },
  getPlayer: function (name) {
    return _.find(this.players, function (player) {return player.name.toLowerCase() === name.toLowerCase();});
  },
  // Create or return a room. Usuaully used by the fascade in loader.js
  createRoom: function (id, options) {
    var room = this.rooms[id] = this.rooms[id] || new Room(this,id);
    _(room).chain()
      .extend(options)
      .defaults({
        items: []
      })
      .value();
    return room;
  },
  createCommand: function (command, description, fun) {
    if (!fun) {
      fun = description;
      description = 'no description for this command. boooo!';
    }
    fun.description = description;
    this.commands[command] = fun;
  },
  // Broadcast out a message to all logged in users
  broadcast: function (message) {
    _.each(this.players, function (player) {
      player.write(message);
    });
  },
  error: function(message) {
    this.broadcast({error:{string: message, type: 'error'}});
    console.log(message);
  },
  warn: function(message) {
    this.broadcast({error:{string: message}});
    console.log(message);
  },
  execute: function (player, string) {
    var command = string.trim().split(" ",1)[0].toLowerCase(),
        rest = string.trim().slice(command.length).trim(),
        itemName = rest.split(" ")[0].trim().toLowerCase(),
        itemCommand = command + ' ' + itemName,
        commandFn;

    try {
      if (this.commands.hasOwnProperty(itemCommand)) {
        var item = player.getItem(itemName) || player.getCurrentRoom().getItem(itemName);
        if (item) {
          this.commands[itemCommand](rest.trim(), player, item, this);
        } else {
          player.write("Can't find a " + itemName);
        }
      } else if (!this.commands.hasOwnProperty(command)) {
        if (player.getCurrentRoom().getExit(command)) {
          player.execute('go ' + command);
        } else {
          player.write("Awfully sorry old chap, but I don't understand: " + string);
        }
      } else {
        this.commands[command](rest.trim(), player, this);
        this.emit('command:'+command, rest.trim(), player, this);
      }
    } catch (e) {
      console.log('Error running command: ' + string);
      console.log(e);
      console.trace();
      player.write("OH NO! There was an error handling your command. Watch out for the stack trace!");
      player.write(e);
      player.write(e.stack);
    }
  },

  // Override EventEmitter's emit to also emit an 'all' event to allow
  // event forwarding.
  emit: function (event /* ,args...*/) {
    events.EventEmitter.prototype.emit.apply(this, arguments);
    var args = _.toArray(arguments);
    args.unshift('all');
    events.EventEmitter.prototype.emit.apply(this, args);
  },

  // This can be called after handling an even for a specific object to prevent the default version being emited
  preventDefault: function () {
    this._allowDefault = false;
  },

  emitEvent: function (verbId, objectId, subject, object) {
    this._allowDefault = true;
    this.emit(verbId + ":" + objectId, this, subject, object);
    if (this._allowDefault) {
      this.emit(verbId + ":*", this, subject, object);
    }
  }
});

function Room(game, id) {
  this.game = game;
  this.id = id;
  this.description = "This is a room";
  this.image = null;
  this.exits = {};

  this.display = new Display(this, this.broadcast);
  this.items = [];
}

_.extend(Room.prototype, {
  getExit: function (name) {
    var exit = this.exits[name];
    return exit && this.game.rooms[exit];
  },
  // Get all players in the room
  getPlayers: function () {
    var _this = this;
    return _.filter(_.values(this.game.players), function (player) {return player.location == _this.id;})
  },
  // Get a player by name
  getPlayer: function (name) {
    return _.find(this.getPlayers(), function (p) {return p.name.toLowerCase() === name.toLowerCase();});
  },
  // Get a named item in the room, returns the first if there are many
  // and null if there are none
  getItem: function (name) {
    return _.find(this.items, function (item) {
      return (item.name && item.name.toLowerCase() === name.toLowerCase()) || (item.short && item.short.toLowerCase() === name.toLowerCase());
    });
  },
  // Send a message to all players in the room. Optionally you can
  // pass in a player to exclude from the message (for example, if
  // they are the source of the message you might not want them to
  // receive it)
  broadcast: function (message, excludePlayer) {
    if (excludePlayer && excludePlayer.name) {
      excludePlayer = excludePlayer.name;
    }
    _.each(this.getPlayers(), function (player) {
      if (excludePlayer !== player.name) {
        player.write(message);
      }
    });
  }
});

function Player(game, name) {
  events.EventEmitter.call(this);
  this.location = "home";
  this.game = game;
  this.name = name;
  this.inventory = [];

  this.display = new Display(this, this.write);
}
util.inherits(Player, events.EventEmitter);

_.extend(Player.prototype, {
  // Run a command line as the player
  execute: function (string) {
    this.game.execute(this, string);
  },
  // Write out a string to the player's client
  write: function (message) {
    if (_.isString(message)) {
      message = {string: message};
    }
    this.emit('write', message);
  },
  // Broadcast the message to all other players in the current room
  broadcast: function (message) {
    this.getCurrentRoom().broadcast(message, this);
  },
  // Get a named item in the room, returns the first if there are many
  // and null if there are none
  getItem: function (name) {
    return _.find(this.inventory, function (item) {
      return (item.name && item.name.toLowerCase() === name.toLowerCase()) || (item.short && item.short.toLowerCase() === name.toLowerCase());
    });
  },
  getCurrentRoom: function () {
    // If a character loses their room then put them somewhere random
    if (!this.game.rooms[this.location]) {
        this.location = _.sample(_.keys(this.game.rooms));
    }
    return this.game.rooms[this.location];
  },
  setCurrentRoom: function (id) {
    // Allow passing in a full room object, not just an id
    if (id.id) {
      id = id.id;
    }
    if (id in this.game.rooms) {
      if (this.getCurrentRoom()) {
        this.game.emit('roomTransition:' +this.getCurrentRoom().id + ':' + id, this, this.game.rooms[id], this.getCurrentRoom());
        this.game.emit('leaveRoom', this, this.getCurrentRoom(), this.game);
        this.game.emit('leaveRoom:' + this.getCurrentRoom().id, this, this.getCurrentRoom(), this.game);
      }
      this.location = id;
      if (this.getCurrentRoom()) {
        this.game.emit('enterRoom', this, this.getCurrentRoom(), this.game);
        this.game.emit('enterRoom:' + this.getCurrentRoom().id , this, this.getCurrentRoom(), this.game);
      }
    }
  },
  receive: function(giver, item) {
    this.inventory.push(item);
    // NPCs (which are based on player) can define an onRecieve method
    if (typeof this.onReceive == "function") {
      this.onReceive(giver, item);
    }
  }
});


// An interface to the client side code, see display.js on the client
function Display(object, broadcast) {
  this.object = object;
  this.broadcast = broadcast;
}

_.extend(Display.prototype, {
  eval: function (code, vars) {
    if (_.isFunction(code)) {
      code = "(" + code.toString() + ")(display)";
    }
    this._command("eval", [code, vars]);
  },
  reset: function () {
    this._command("reset", []);
  },
  show: function (imageUrl, id, style) {
    this._command("show", [imageUrl, id, style]);
  },
  draw: function (id, items) {
    this._command("draw", [id, items]);
  },
  _command: function (command, args) {
    this.broadcast.call(this.object, {display: {command: command, arguments: args}});
  }
});
