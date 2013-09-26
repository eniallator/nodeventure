var oldlady = character('oldlady', {
  location: 'dollhouse',
  description: 'An old lady. She seems strangely interested in one of the dolls in particular.'
});

handler('tick', function () {
  // every 20 seconds on average
  if (Math.random() * 20 < 1) {
    oldlady.execute('say Oh my poor poor dear');
  }  
});
