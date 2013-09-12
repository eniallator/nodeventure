command(
'give', 
'Trade an item with another player.', 
function (rest, player, game) {
  var args = _.compact(rest.split(' '));
  var syntax = 'syntax: give <item> to <player>';

  if (args.length < 1) {
    player.write(syntax);
    return;
  }

  var itemName = args[0];

  if (!hasItem(player, itemName)) {
    player.write('You don\'t have a ' + itemName + ' to give!');
    return;
  }

  var itemToGive = _.find(player.inventory, function (item) {
    return item.name === itemName;
  });

  if (args.length < 3) {
    player.write(syntax);
    return;
  }

  var destPlayer = args[2];

  if (!_.contains(_.keys(game.players), destPlayer)) {
    player.write('No player by that name exists!');
    return;
  }

  destPlayer = game.players[destPlayer];

  if (player.location !== destPlayer.location) {
    player.write(destPlayer.name + ' is not in the same room as you!');
    return;
  }

  destPlayer.inventory.push(itemToGive);

  player.inventory = _.without(player.inventory, itemToGive);

  player.write('You give your ' + itemName + ' to ' + destPlayer.name);
  destPlayer.write(player.name + ' has given you their ' + itemName);
});

function hasItem (player, itemName) {
  return _.contains(_.pluck(player.inventory, 'name'), itemName);
}