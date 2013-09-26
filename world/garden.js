room('garden', {
  description: "The garden is overgrown with weeds, to the point where you can't see what's growing in it at all! There is a hoe nearby- use it. ",
  image: "http://cabinetmagazine.org/issues/2/beige.jpg",
  exits: { east: 'home', south: 'cube, north: 'camera', west: 'butterfly'},
  items: [
    {
      name: 'threeheads',
      short: 'friendly creature',
      description: 'Three heads wants to shake your hand!',
      respawnTimer: 60
    },
    {
      name: 'laughter',
      short: 'an invisible laugh',
      description: 'The laugh is coming your way.',
      respawnTimer: 60
    },
    {
      name: 'echo',
      short: 'a reverberation',
      description: 'Makes you shake!',
      respawnTimer: 60
    }
  ]
});

