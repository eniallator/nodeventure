room('spinning_cube', {
  description: "You're now in the spinning cube. Everything is black and white. Everything spins slower or faster.",
  exits: {
    west: 'theuncreativeroom',
    east: 'sea',
    north: 'tell',
    south: 'beach',
    back: 'beige'
  },
  image: 'http://cimota.com/blog/wp-content/uploads/2012/06/22-Cans-Curiosity-490x245.jpg',
  items: [
    {
      name: 'fragment',
      short: 'A fragment of the ancient black cube.',
      description: 'A fragment of the ancient black cube. It is said to endow its owner with misterious supernatural powers...',
      respawnTimer: 60
    }
  ]
});

itemCommand('grab', 'fragment', 'This command allows you to grab a fragment of the black cube', function(game, player, item){
    player.write("You've just grabbed a fragment of the black");
    console.log(player);
});
