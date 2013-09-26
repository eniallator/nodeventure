var cooker = character('cooker', {
  location: 'soupkitchen',
  description: 'cooker without herbs',
  talk: ['water', 'I need some water', giveWater],
  onReceive: function(player, item) {
    if ( item.name == "herbs" ) {
      player.write("thank you! now I can do my soup, here you have your glass eye");
      this.giveGlassEye(player);
    }
  },
  giveGlassEye: function(player) {
    player.inventory.push({
      name: "glasseye",
      description: "this glass eye is needed by the old lady"
    })
  }
});

function giveWater(player) {
  player.write("Here you have the water, hurry up!");
  player.inventory.push({
    name: "cookerwater",
    description: "water the cooker gave to you",
  });
}

itemCommand("pour", "water", function(rest, player) {
  var room = player.getCurrentRoom();
  if (room.name == "garden") {
    player.write("Some herbs have unveiled");
  }
});

