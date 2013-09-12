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

  player.write('you kick ' + otherPlayer.name + ' you out the ' + exit + ' exit. LOLZ');

  otherPlayer.write(player.name + ' kicks you out the ' + exit + ' exit. How dare they?');
  otherPlayer.execute("go " + exit);
  
  player.broadcast(player.name + ' kicks ' + otherPlayer.name + ' you out the ' + exit + ' exit. OMG!');
  
});
