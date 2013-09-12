item('home', 'table', {
  respawnTime: 1,
  short: 'a table',
  image: 'http://l4rp.com/images/nodeventure-table.svg',
  description: 'A beautiful shabbychic table from the Lab for the Recently Possible.'
});

itemCommand('look', 'table', function(rest, player, item, game){
    player.write('The table looks back at you, lovingly.')
});

itemCommand('use', 'table', function(rest, player, item, game){
    player.write('You climb on the table and proclaim your power.')
});

var tableFlipped = false;

itemCommand('flip', 'table', function(rest, player, item, game){

    player.getCurrentRoom().broadcast(
      player.name + ' flips out ' + (tableFlipped ? '(╯°□°）╯︵ ┻━┻' : '┬─┬ノ( º _ ºノ)')
    );
    tableFlipped = !tableFlipped;
    
});
