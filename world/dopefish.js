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
    room.broadcast('The Dopefish picks himself up and heads to the ' + exit + ' exit');
    dopefish.execute('go ' + exit);
    if (room === dopefish.getCurrentRoom()) {
      room.broadcast('The Dopefish is enraged to find himself back in the place');
      dopefish.description = 'enraged';
    } else {
      room = dopefish.getCurrentRoom();
      if (room.description.toLowerCase().indexOf('snow') === -1) {
        room.broadcast('The dopefish seems dismayed not to find any snow here');
        dopefish.description = 'half man, half monkey,half bear and all yeti. He seems to miss the snow.';
      } else {
        room.broadcast('The dopefish seems delighted to find snow here!');
        dopefish.description = 'Half man, half monkey, half bear and all yeti. He seems to like the snow.';
      }
    }
  }
});
