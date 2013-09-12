room('spinning_cube', {
  description: "You're now in the spinning cube. Everything is black and white. Everything spins slower or faster.",
  exits: {
    west: 'home',
    east: 'sea',
    down: 'solera',
    north: 'tell',
    south: 'yeti'
  },
  image: 'http://cimota.com/blog/wp-content/uploads/2012/06/22-Cans-Curiosity-490x245.jpg'
});

item('spinning_cube', 'black_cube_fragment', {
  respawnTime: 120,
  short: 'A fragment of the ancient black cube...',
  description: 'The ancient black cube is said to endow its owner with misterious supernatural powers...'
});

command('grab', 'This command allows you to grab a fragment of the black cube', function(rest, player, game){
    console.log('You\'ve just grabbed a fragment of the black ');
});