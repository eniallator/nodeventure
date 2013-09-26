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
  
  var room = player.getCurrentRoom();
  
  if (!room.getItem("lever")) {
    player.write('There\'s no lever here to pull!');
    return;
  }

  player.write("You hear a deafening wooshing sound as if a million elephants all gasped in unison. Polychromatic snowflakes descend and cover your body as you dissolve into everything all at once.");
  player.setCurrentRoom('the_abyss');
  //var rooms = game.rooms;
  //var names = _.keys(rooms).join(" ")
  //player.write(names);

});

command('zzz', 'Just a test.', function (rest, player, game) {
  player.setCurrentRoom('quantum_entrance');
});
