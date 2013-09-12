item('home', 'table', {
  respawnTime: 1,
  short: 'a table',
  description: 'A beautiful shabbychic table from the Lab for the Recently Possible.'
});

itemCommand('look', 'table', function(rest, player, item, game){
    player.write('The table looks back at you, lovingly.')
});

itemCommand('use', 'table', function(rest, player, item, game){
    player.write('You climb on the table and proclaim your power.')
});