var dopefish = character('dopefish', {
  location: 'beige',
  description: 'half man, half monkey,half bear and all yeti. He seems to like the snow.',
  image: 'http://pressthebuttons.typepad.com/photos/uncategorized/dopefish.png'
});

handler('tick', function () {
  // every 30 minutes on average
  if (Math.random() * 30 < 1) {
    var room = dopefish.getCurrentRoom(),
        exits = _.keys(room.exits),
        i = Math.floor(Math.random()*exits.length),
        exit = exits[i];
    
    var roomPlayers = room.getPlayers();
    
    for(var i = 0; i < roomPlayers.length; i++)
    {
      roomPlayers[i].write("The dopefish says \"Duh!\"");
      roomPlayers[i].display.show('http://pressthebuttons.typepad.com/photos/uncategorized/dopefish.png');
    }
  }
});

handler('playerTalk', function (player, message) {
  if (player.getCurrentRoom() === dopefish.getCurrentRoom() && dopefish !== player) {
    dopefish.execute('say WAAAARGH');
  }
});
