room('beige', {
  description: "This room is daubed in beige. You start feeling sleepy.",
  image: "http://cabinetmagazine.org/issues/2/beige.jpg",
  exits: { east: 'home', south: 'beachpath', north: 'methodiks_room', west: 'spinning_cube', furtherwest: 'hove-w', southeast: 'ocean'},
  items: [
    {
      name: 'brush',
      short: 'a brush',
      description: 'A brush. it is branded with a \'B&Q\' logo. There is beige paint on it',
      respawnTimer: 60
    },
    {
      name: 'paint',
      short: 'a pot of paint',
      description: 'A pot of beige paint. it has been opened.',
      respawnTimer: 60
    },
    {
      name: 'mirror',
      short: 'a small mirror',
      description: 'A small and perfectly inadequate mirror',
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
