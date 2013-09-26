room('mud', {
  description: "This is a murky world, where all sorts of beings hide. Some of them invisible, and others just plain strange!",
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

handler("drop:mirror", function (game, player, item) {
  var rest = item.name;
  player.write("You drop the " + rest + " and it smashes into a million pieces");
  player.getCurrentRoom().broadcast(player.name + ' drops the ' + rest + " and it smashes into a million pieces", player);
  player.inventory = _.without(player.inventory, item);
  game.emit("invdrop:"+item.name, rest, player, game);
  preventDefault();
});

itemCommand("use", "mirror", null, function (game, player, item) {
    player.write("You realise just how beautiful you are.");
    player.getCurrentRoom().broadcast(player.name + ' is admiring themself in the ' + item.name, player);
});

handler("describeItem:mirror", function (game, player, item) {
  player.write("A mirror hangs on the wall");
});
