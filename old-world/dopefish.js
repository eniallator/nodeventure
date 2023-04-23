var dopefish = character('dopefish', {
  location: 'beige',
  description: 'the second-dumbest creature in the universe'
});

handler('tick', function () {
  // every 30 seconds on average
  if (Math.random() * 30 < 1) {
    var room = dopefish.getCurrentRoom(),
        exits = _.keys(room.exits),
        i = Math.floor(Math.random()*exits.length),
        exit = exits[i];
    
    var roomPlayers = room.getPlayers();
    
    var i = parseInt(Math.random() * roomPlayers.length);
    
    roomPlayers[i].write("The dopefish says \"Duh!\"");
    roomPlayers[i].display.show('http://pressthebuttons.typepad.com/photos/uncategorized/dopefish.png');
  }
});

handler('playerTalk', function (player, message) {
  if (player.getCurrentRoom() === dopefish.getCurrentRoom() && dopefish !== player && /shut ?up/i.test(message)) {
    dopefish.execute('say I am a very useful creature. Admire my lovely green skin!');
  }
});