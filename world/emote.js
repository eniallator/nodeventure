command('emote', 'show some emotion', function (rest, player, game) {
  player.getCurrentRoom().broadcast(player.name + " " + rest);
  player.getCurrentRoom().broadcast("you " + rest);
});
