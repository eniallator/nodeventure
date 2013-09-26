room('the abyss', {
  description: "You are in a fiery abyss. Scorching flames are underfoot. The wailing of damned souls can be heard from all directions but you can see no sign of them through the smoke, ash and flame..",
  image: "http://upload.wikimedia.org/wikipedia/commons/6/65/The_Door_to_Hell.jpg",
  exits: { up: 'home'},
  items: [
    {
      name: 'A BFG',
      short: 'a bfg',
      description: 'A big, frightening gun. Or a big, french gun. I have no idea what the F stands for...',
      respawnTimer: 60
    },
  ]
});
