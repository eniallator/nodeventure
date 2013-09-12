var hammer = character('mc-hammer', {

  location: 'home',
  description: 'U Can't Touch This.'

});

handler('tick', function () {

  // every 30 minutes on average
  if (Math.random() * 30 < 1) {
    var room = hammer.getCurrentRoom(),
        exits = _.keys(room.exits),
        i = Math.floor(Math.random()*exits.length),
        exit = exits[i];
    
    hammer.execute('go ' + exit);
    
    room.broadcast('Stop');
    room.broadcast('Hammer Time');
    
    hammer.display.show('http://1.bp.blogspot.com/-q20NhQKVNXk/T88T1y_rCqI/AAAAAAAAAPQ/760_Tip2bBM/s200/MC_Hammer_gif.gif');
    
  }

});
