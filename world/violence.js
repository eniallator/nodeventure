command('kick', 'kick some ones ass', function (rest, player, game) {
  var room = player.getCurrentRoom();
  var otherPlayer = room.getPlayer(rest);
  if (!otherPlayer) {
    player.write(rest + " isn't here! Go kick something else...");
    return;
  }

  var exits = _.keys(room.exits);
  var i = Math.floor(Math.random()*exits.length);
  var exit = exits[i];

  player.write('you kick ' + otherPlayer.name + ' you out the ' + exit + ' exit. ROFLLOLZOR');

  otherPlayer.write(player.name + ' kicks you out the ' + exit + ' exit. How dare they?');
  otherPlayer.execute("go " + exit);
  
  player.broadcast(player.name + ' kicks ' + otherPlayer.name + ' you out the ' + exit + ' exit. OMG!');
  
});

command('punch', 'Violence never solved anything but it\'s still worth a try.', function (rest, player, game) {
  var room = player.getCurrentRoom();
  var otherPlayer = room.getPlayer(rest);
  
  if (!otherPlayer) {
    player.write(rest + " isn't here! You're shadow-boxing dude.");
    return;
  }

  var messages = [
    'in an ungentlemanly manner.',
    'with some resolve but little effect.',
    'without any discernable effect.',
    'in slow motion while the Rocky theme plays in the background.'
    ];
  //var msgNum = _.random(messages.length);
  var msgNum = Math.floor(Math.random()*messages.length);
  var msg = messages[msgNum];

  player.write('You punch ' + otherPlayer.name + ' ' + msg);
  otherPlayer.write(player.name + ' punches you' + ' ' + msg);

});
