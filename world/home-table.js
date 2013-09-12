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

itemCommand('flip', 'table', function(rest, player, item, game){

    player.getCurrentRoom().broadcast(
      player.name + ' flips out ' + (tableFlipped ? '(╯°□°）╯︵ ┻━┻' : '┬─┬ノ( º _ ºノ)')
    );
    tableFlipped = !tableFlipped;
    
    player.display.eval(function(){
        jQuery('<style></style>').appendTo('body').text(
            'img#table.flipped {' +
                'transform: rotate(180deg); -webkit-transform: rotate(180deg); -moz-transform: rotate(180deg); -o-transform: rotate(180deg);' +
                'transition: transform; -webkit-transition: transform; -moz-transition: transform; -o-transition: transform;'
            '}'
        );

        jQuery('img#table').toggleClass('flipped');
    }, {tableFlipped: tableFlipped});
});