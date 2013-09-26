var dance = function(player, game) {
  
  // Do a dance
  player.write('This is just an example');
  
}

var monkey = function(player, game) {
  
  // Give the player a Monkey
  player.write('This is just an example');
  
}

var giveWater = function(player, game) {
  
  // Give the player some water
  player.write('This is just an example');
  
}

var showMeSomething = function(player, game) {
  
  return {
    'dance' : ['I would like to see a dance?', dance],
    'monkey' : ['I would like to see a monkey?', monkey]
  }
  
}

var hammer = character('mc-hammer', {

  location: 'home',
  description: 'U Can\'t Touch This.',
  talk: {
    'show' : ['I want to see something', showMeSomething],
    'dance' : ['Just dance', dance],
    'water' : ['I want water', giveWater]
  }

});

handler('tick', function () {

  // every 30 minutes on average
  if (Math.random() * 30 < 1) {
    var room = hammer.getCurrentRoom(),
        exits = _.keys(room.exits),
        i = Math.floor(Math.random()*exits.length),
        exit = exits[i];

    room.broadcast('Stop');
    room.broadcast('Hammer Time');
    
    room.display.show('http://1.bp.blogspot.com/-q20NhQKVNXk/T88T1y_rCqI/AAAAAAAAAPQ/760_Tip2bBM/s200/MC_Hammer_gif.gif');
  
    hammer.execute('go ' + exit);

  }

});

command('touch', function (rest, player, game) {

  var firstParts = [
    "I told you, homeboy",
    "Yeah, that's how we living and you know",
    "Look at my eyes, man",
    "Yo, let me bust the funky lyrics",
    "Yo, I told you",
    "Why you standin' there, man?",
    "Yo, sound the bell, school is in, sucka!",
    "Yeah!",
    "I told you!",
    "Too hype!",
    "Get way outta here!"
  ];

  if (player.getCurrentRoom() === hammer.getCurrentRoom() && rest == hammer.name) {
    // Choose a random first part
    var i = parseInt(Math.random() * firstParts.length);
    player.write(firstParts[i]);
    player.write("You can't touch this!");
  }

});
