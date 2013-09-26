var request = require('request').defaults({
        encoding: 'utf8',
        jar: false,
        timeout: 240 * 1000
    }),
    jsdom = require('jsdom'),
    mister_horse = character('horse_ebooks', {
      location: 'home',
      description: 'You too can be part of an exciting new'
    });

handler('enterRoom', function(){
  request({
        uri: 'https://twitter.com/Horse_ebooks',
        method: 'GET'
    }, function(err, res, data){
      jsdom.env({
        html: data,
        scripts: ['http://code.jquery.com/jquery-2.0.3.min.js'],
        done: function(err, window){
          if(err){
            // who cares?
          }
          var $ = window.jQuery,
              $body = $('body'),
              $tweets = $body.find('.tweet-text'),
              numtweets = $tweets.length;
          mister_horse.execute('say ' + $($tweets.get(Math.floor(Math.random()*numtweets))).text());
        }
      });

    });

  
});

// var dopefish = character('dopefish', {
//   location: 'beige',
//   description: 'the second-dumbest creature in the universe'
// });

// handler('tick', function () {
//   // every 30 seconds on average
//   if (Math.random() * 30 < 1) {
//     var room = dopefish.getCurrentRoom(),
//         exits = _.keys(room.exits),
//         i = Math.floor(Math.random()*exits.length),
//         exit = exits[i];
    
//     var roomPlayers = room.getPlayers();
    
//     var i = parseInt(Math.random() * roomPlayers.length);
    
//     roomPlayers[i].write("The dopefish says \"Duh!\"");
//     roomPlayers[i].display.show('http://pressthebuttons.typepad.com/photos/uncategorized/dopefish.png');
//   }
// });

// handler('playerTalk', function (player, message) {
//   if (player.getCurrentRoom() === dopefish.getCurrentRoom() && dopefish !== player && /shut ?up/i.test(message)) {
//     dopefish.execute('say I am a very useful creature. Admire my lovely green skin!');
//   }
// });