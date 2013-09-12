item('home', 'table', {
  respawnTime: 1,
  short: 'a table',
  image: 'http://l4rp.com/images/nodeventure/table.svg',
  description: 'A beautiful shabbychic table from the Lab for the Recently Possible.'
});

itemCommand('look', 'table', function(rest, player, item, game){
    player.write('The table looks back at you, lovingly.')
});

itemCommand('use', 'table', function(rest, player, item, game){
    player.write('You climb on the table and proclaim your power.')
});

var tableFlipped = false;

handler('enterRoom', function (player, room, game) {
    player.display.eval(function(){
        jQuery('<style></style>').appendTo('head').text(
            'img#table {' +
                'transition: transform 0.5s; -webkit-transition: -webkit-transform 0.5s; -moz-transition: -moz-transform 0.5s; -o-transition: -o-transform 0.5s;' +
            '}' +
            'img#table.flipped {' +
                'transform: rotate(180deg); -webkit-transform: rotate(180deg); -moz-transform: rotate(180deg); -o-transform: rotate(180deg);' + 
            '}'
        );
    });
});

itemCommand('flip', 'table', function(rest, player, item, game){
    player.getCurrentRoom().broadcast(
      player.name + ' flips out ' + (tableFlipped ? '(╯°□°）╯︵ ┻━┻' : '┬─┬ノ( º _ ºノ)')
    );
    tableFlipped = !tableFlipped;
    
    player.display.eval(function(){
        jQuery('img#table').toggleClass('flipped');
    }, {tableFlipped: tableFlipped});
});