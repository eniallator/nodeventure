room('spinning_cube', {
  description: "You're now in the spinning cube. Everything is black and white. Everything spins slower or faster.",
  exits: {
    west: 'alley',
    east: 'temple',
    down: 'basement'
  },
  image: 'http://cimota.com/blog/wp-content/uploads/2012/06/22-Cans-Curiosity-490x245.jpg'
});

item('secretLab', 'jetpack', {
  respawnTime: 120,
  short: 'a jetpack',
  description: 'An awesome jetpack for flying around.'
});