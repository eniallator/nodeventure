room('dollhouse', {
  description: "This is a murky world, where all sorts of beings hide. Some of them invisible, and others just plain strange!",
  image: "http://cabinetmagazine.org/issues/2/beige.jpg",
  exits: { east: 'home', south: 'soup kitchen'},
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

