var oldlady = character('oldlady', {
  location: 'dollhouse',
  description: 'An old lady. She seems strangely interested in one of the dolls in particular.',
  onReceive: function(player, item) {

    player.write(item.name);
  }
});

handler('tick', function () {
  // every 20 seconds on average
  if (Math.random() * 40 < 1) {
    oldlady.execute('say Oh my poor poor dear');
  }  
});

