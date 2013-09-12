room('butterfly', {
  description: "You see a multitude of colourful butterflies spiralling up towards the ceiling. Their wings glow red and golden in the light. The effect is hypnotic, before long you feel yourself becoming drowsy. You are not sure how long you have been standing there. Nothing seems to matter as long as you can keep gazing at the beautiful sight. To the North is a faded green door. To the South is a transparent glittering screen, through it you can see the lab dimly. To your right is a low shelf with 3 vials of liquid on it. One is dark red, one is swirling pink-gold, and one is purple.",
  exits: {
    south: 'home',
    north: 'forest'
  },
  image: 'myroom.jpg'

});

item('butterfly', 'red vial', {
  image: 'http://skyapperley.co.uk/nodeadventure/red-vial.png',
  respawnTime: 60,
  short: 'a red vial',
  description: 'It is a red vial and you can not tell what it is.'
});