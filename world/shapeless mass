item('home', 'd20', {
  description: 'A die with 20 whole sides.',
  respawnTime: 20,
  short: 'a 20 sided die',
});

itemCommand('roll', 'd20', function (rest, player, item, game) {
  var number = Math.ceil(Math.random() * 20);

  if (number < 20) {
    player.write('You roll a ' + number);
    player.getCurrentRoom().broadcast(player.name + ' rolls a ' + number + ' with their d20.');
  } else {
    player.display.show('http://gifrific.com/wp-content/uploads/2013/02/Sea-Turtle-High-Five.gif', 'd20');
    player.write('You roll a freakin 20!');
    player.getCurrentRoom().broadcast(player.name + ' wins. A 20 has been rolled. Game over');
  }

  console.log(player.display.show);
});
