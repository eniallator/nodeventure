var spider = character('spider', {
  location: 'garden',
  description: 'A very friendly looking spider who is busy spinning a web.'
});

handler('tick', function () {
  // every 20 seconds on average
  if (Math.random() * 20 < 1) {
    spider.execute('say *squeak squeak* Busy busy busy! *squeak squeak*');
  }  
});
