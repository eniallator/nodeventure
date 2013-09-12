command(
'pull', 
'Pull on things, like levers.', 
function (rest, player, game) {
  var args = _.compact(rest.split(' '));
  var syntax = 'syntax: pull';

  if (args.length > 0) {
    player.write(syntax);
    return;
  }

  var itemName = args[0];
  
  var room = player.getCurrentRoom();
  
  if (!room.getItem("lever")) {
    player.write('There\'s no lever here to pull!');
    return;
  }

  var rooms = game.rooms;
  player.write(rooms);
});
