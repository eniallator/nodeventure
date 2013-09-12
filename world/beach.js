room('beach', {
  description: "waves crash upon a stony beach.",
  image: "http://farm9.staticflickr.com/8248/8502899877_19c3a4a6f7.jpg",
  exits: { north: 'beachpath', west: 'westbeach' },
  items: [
    {
      name: 'bottle',
      short: 'a bottle',
      description: 'It looks like there is some sort of paper stuffed inside it.',
      respawnTimer: 60
    },
    {
      name: 'boat',
      short: 'a boat',
      description: 'a fine looking seaworthy craft, if only the sails wernt missing.',
      respawnTimer: 60
    },
    {
      name: 'sail',
      short: 'a sail',
      description: 'a worn sail that may or may not be seaworthy. Its up to you to decide if you\'ll risk it.',
      respawnTimer: 60
    }
  ]
});

itemCommand("open", "bottle", "Open something", function(rest, player, item, game){
  player.write("Inside the bottle you find a message scawled up inside it. It says 'Help! I've been marroned on an island for the last 5 years! My only friend is a Walrus who i've decided to name 'Gregory' since I was needing company. Bring help and fish sticks for Gregory, since he likes those and I have run out.")
});

function findItem(room, name) {
  return _.find(room.items, function(item) { return item.name == 'boat'; });
}

itemCommand('use', 'sail', 'Use something.', function(rest, player, item, game) {
    var room = player.getCurrentRoom();
    var boat = findItem(room, "boat");
    
    if(boat) {
        boat.name = 'sailboat';
        boat.short = 'A boat with a sail';
        boat.description = 'a boat with a sail';
        player.write('Now the boat has a sail. Type "sail" to sail into the ocean.');
    } else {
        player.write('Use the sail with what?');
    }
});

command('sail', function(rest, player, game) {
    var room = player.getCurrentRoom();
    var boat = findItem(room, "sailboat");
    
    if(room.id == "beach" && boat != null) {
      player.write('You sail off and appear...');
      player.setCurrentRoom('sea');
    } else {
      player.write('Sail in what, exactly?');
    }
});
