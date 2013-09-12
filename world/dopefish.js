var dopefish = character('dopefish', {
  location: 'beige',
  description: 'half man, half monkey,half bear and all yeti. He seems to like the snow.',
  image: 'http://pressthebuttons.typepad.com/photos/uncategorized/dopefish.png'
});

handler('tick', function () {
  // every 300 seconds on average
  if (Math.random() * 3 < 1) {
    var room = dopefish.getCurrentRoom(),
        exits = _.keys(room.exits),
        i = Math.floor(Math.random()*exits.length),
        exit = exits[i];
    
    var roomPlayers = room.getPlayers();
    
    var i = (Math.random() * roomPlayers.length);
    
    roomPlayers[i].write("The dopefish says \"Duh!\"");
    roomPlayers[i].display.show('http://pressthebuttons.typepad.com/photos/uncategorized/dopefish.png');
  }
});

handler('playerTalk', function (player, message) {
  if (player.getCurrentRoom() === dopefish.getCurrentRoom() && dopefish !== player) {
    dopefish.execute('say WAAAARGH');
  }
});
