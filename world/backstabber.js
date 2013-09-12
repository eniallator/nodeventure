/*!
 * The BackStabber
 * by Fonz and Leo
 *
 * http://github.com/leoinlios
 * http://github.com/botverse
 */

var backstabber = character('backstabber', {
  location: 'magnolia',
  description: 'the backstabber aka backstabberi'
});

var dictionary = {};

dictionary.verbs = ["says", "thinks", "swears"];
dictionary.adjectives= ["an asshole", "a backstabber as well", "a big liar", "a sock sniffer"];

handler('tick', function () {
  // every 10 seconds on average
  if (Math.random() * 30 < 1) {
    var room = backstabber.getCurrentRoom(),
      exits = _.keys(room.exits),
      i = Math.floor(Math.random()*exits.length),
      exit = exits[i],
      players = _.keys(room.game.players);

    var players_in_room = []
      , last_player = ""
      , guys;

    console.log(players);

    players.forEach(function(player_name) {
      var player = room.game.players[player_name];
      if ( player_name === "backstabber") return;
      if ( player.getCurrentRoom() === backstabber.getCurrentRoom() ) {
        players_in_room.push(player_name);
      }
    });

    if ( players_in_room.length < 2 ) {
      return backstabber.execute('go ' + exit);
    }

    if ( players_in_room.length > 1 ) {
      last_player = " and " + players_in_room[players_in_room.length -1];
    }

    guys = players_in_room.slice(0, players_in_room.length - 1).join(', ') + last_player;

    room.broadcast("backstabber says: " + guys + " I've something very important to tell to each and everyone of you");
    room.broadcast("backstabber says: you can teach me more vocabulary with \"teach verb [verb]\" or \"teach adjective [adjective]\"");

    players_in_room.forEach(function(player, i) {
      var who = i - 1
        , verb, adjective;

      verb = dictionary.verbs[Math.floor(Math.random() * dictionary.verbs.length)];
      adjective = dictionary.adjectives[Math.floor(Math.random() * dictionary.adjectives.length)];

      if (who < 0 ) who = players_in_room.length - 1;

      backstabber.execute("tell " + players_in_room[who] + " " + players_in_room[i] + " " + verb + " that you are " + adjective);
    });

    backstabber.execute('go ' + exit);
  }
});

command('teach', function (rest, player, game) {
  var attributes = rest.trim().split(' ')
    , what = attributes[0].trim() + "s"
    , words = attributes.slice(1).join(' ');

  if ( dictionary[what] ) {
    dictionary[what].push(words);
    player.write("Backstabbers says to you: Thank you for your " + what);
    game.broadcast(player.name + " taught me a new " + attributes[0].trim() + ": " + words);
  }

  else {
    player.write("I don't know what's a/n " + what);
  }
});

