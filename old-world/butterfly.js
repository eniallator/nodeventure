room('butterfly', {
  description: "You see a multitude of colourful butterflies spiralling up towards the ceiling. Their wings glow red and golden in the light. The effect is hypnotic, before long you feel yourself becoming drowsy. You are not sure how long you have been standing there. Nothing seems to matter as long as you can keep gazing at the beautiful sight. To the North is a faded green door. To the South is a transparent glittering screen, through it you can see the lab dimly. To your right is a low shelf with 3 vials of liquid on it. One is dark red, one is swirling pink-gold, and one is purple.",
  exits: {
    south: 'home',
    north: 'forest'
  }

});

item('butterfly', 'red_vial', {
  image: 'http://skyapperley.co.uk/nodeadventure/red-vial.png',
  respawnTime: 60,
  width:60,
  height:100,
  top:350,
  left:70 ,
  short: 'a red vial',
  description: 'It is a red vial and you can not tell what it is.'
});

item('butterfly', 'pink_gold_vial', {
  image: 'http://i.imgur.com/c06hQp4.png',
  respawnTime: 60,
  width:60,
  height:100,
  top:350,
  left:210,
  short: 'a pink gold vial',
  description: 'It is a pink gold vial, and you can not tell what it is.'
});

item('butterfly', 'purple_vial', {
  image: 'http://skyapperley.co.uk/nodeadventure/purple-vial.png',
  respawnTime: 60,
  width:60,
  height:100,
  top:350,
  left:145,
  short: 'a purple vial',
  description: 'It is a purple vial. It looks healthy.'
});

itemCommand('drink', 'red_vial', 'quench your thirst, drink this delicious vial', function(rest, player, item, game){
  player.write('This appears to be a rather nice merlot wine. You feel slightly tipsy. You pass out');
});

itemCommand('drink', 'pink_gold_vial', 'quench your thirst, drink this delicious vial', function(rest, player, item, game){
  player.write('You become strangely convinced you are a buttefly. You run around the room flapping your arms. The other butteflies are silently laughing at you.');
});

itemCommand('drink', 'purple_vial', 'quench your thirst, drink this delicious vial', function(rest, player, item, game){
  player.write('The lethargy afflicting you since you entered the room wears off. You feel fiercely alive, and healthier than before. You want to play a game!');
});
