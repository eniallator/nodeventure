var hammer = character('mc-escher', {

  location: 'home',
  description: 'Goin\' up the stairs and going down the stairs, now going up the sideways stairs.'

});

handler('tick', function () {

  // every 30 minutes on average
  if (Math.random() * 30 < 1) {
    var room = hammer.getCurrentRoom(),
        exits = _.keys(room.exits),
        i = Math.floor(Math.random()*exits.length),
        exit = exits[i];
    
    hammer.execute('go ' + exit);
    
    room.broadcast('Going up the stairs and going down the stairs.');
    
    room.display.show('http://24.media.tumblr.com/tumblr_lgftr4ArdG1qfaiwro1_400.gif');
    
  }

});
