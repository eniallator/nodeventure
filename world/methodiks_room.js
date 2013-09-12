room('methodiks room', {
  description: "All you have to do is click on the circles",
  exits: {
    west: 'alley',
    east: 'temple',
    down: 'basement'
  },
  image: ''
});

handler('enterRoom:home', function (player, room, game) {
  player.display.eval(function () {
    // This function will be executed on the client

    $('<h1>Hello world</h2>').appendTo('body');
    
  });
});
