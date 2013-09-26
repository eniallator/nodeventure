room('soupkitchen', {
  description: "In the soup kitchen, the chef is making plenty of delicious soup. He's also growing lots of herbs, which he is watering. The chef gives you a glass eye.",
  image: "http://cabinetmagazine.org/issues/2/beige.jpg",
  exits: { east: 'home', north: 'dollhouse' along: 'garden'},
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

