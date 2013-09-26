room('soupkitchen', {
  description: "In the soup kitchen, the chef is making plenty of delicious soup. He's also growing lots of herbs, which he is watering. The chef gives you a glass eye.",
  image: "http://cabinetmagazine.org/issues/2/beige.jpg",
  exits: { east: 'home', north: 'dollhouse' along: 'garden'},
  items: [
    {
      name: 'oven',
      short: 'bake',
      description: 'I like to bake',
      respawnTimer: 60
    },
    {
      name: 'pan',
      short: 'for simmering tasty things',
      description: 'I make lots and lots of soup',
      respawnTimer: 60
    },
    {
      name: 'knife',
      short: 'chop chop',
      description: 'I cut meat and veg',
      respawnTimer: 60
    }
  ]
});

