room("forest", {
  description: "You find yourself surrounded by a forest. Trees stretch as far as you can see in every direction. Looking around you realise that the door you have entered through has vanished. The sun shines through a canopy of branches creating a dappled effect of light and dark across the ground.  In the distance a bird warbles sleepily. As you step forwards something connects with your foot. It is an abandoned pair of sunglasses.",
  exits: {
    north: "canal",
    east: "volcano",
    south: "butterfly"
  }
});

item('forest', 'sunglasses', {
  image: 'http://www.prettygreen.com/images/productimage-picture-silver-pg-383-sunglasses-6003.jpg',
  respawnTime: 60,
  width:'80%',
  height:'80%',
  top:50,
  left:20,
  short: 'a pair of sunglasses',
  description: 'a slightly scuffed pair of sunglasses'
});

itemCommand('take', 'sunglasses', 'There is something unusual about these glasses', function(rest, player, item, game){
  player.write('There is a blinding light, you can\'t see anything! You take them off again');
});

room("volcano", {
  description: "The air is so hot and smokey you can barely breathe. Your eyes begin to well up with tears as the fumes reach them. You can make out a rocky landscape graduating upwards towards a mountain top. Lava is trickling down in a fiery orange stream towards you. This does not seem a safe place to stay. For some unknown reason there is a tent set up to the South. In the North a small crevice in the mountainside looks large enough to enter, you may be able to shelter inside. To the East and the West huge stone archways stand on their own. You can walk through them but they do not look like they lead anywhere.",
  exits: {
    north: "canal",
    east: "swimmingpool",
    west: "forest",
    south: "crystal"

  }
});

room("swimmingpool", {
  description: "You are standing by the edge of an indoor swimming pool. The water glints invitingly, you are reminded of happy childhood memories swimming with your friends. Large windows surround the room showing a view of a landscaped area and pathway outside. The only exit is the one you have entered from to the West. Nearby a towel hangs over a metal railing. On a chair is a spare swimsuit which looks like it would fit you. Lying on the tiled floor are a pair of armbands.",

  exits: {
    west: "volcano"
  }
});

item('swimmingpool', 'towel', {
  image: 'http://philsfittips.files.wordpress.com/2012/07/towel.jpg',
  respawnTime: 60,
  width:50,
  height:50,
  top:20,
  left:20,
  short: 'a towel',
  description: 'a blue and white striped towel'
});

item('swimmingpool', 'armbands', {
  image: 'http://www.wigglestatic.com/images/speedo-8-069201288-aw11-zoom.jpg',
  respawnTime: 60,
  width:60,
  height:60,
  top:100,
  left:70,
  short: 'a pair of armbands',
  description: 'They are orange. There is nothing more to be said for them'
});

item('swimmingpool', 'swimsuit', {
  image: 'http://t1.gstatic.com/images?q=tbn:ANd9GcQjL3YYjboUV_14FOM_05ZVcG2sLqGkt6cjznvRUM3RByXWZD_Mrw',
  respawnTime: 60,
  width:60,
  height:60,
  top:140,
  left:20,
  short: 'swimsuit',
  description: 'Reminds you of a swimsuit you used to have a long time ago.'
});

room("crystal", {
  description: "You are in utter darkness. A faint glow begins to eminate from various points around you. You are clearly not in a tent. Crystaline clusters are producing the light in a pulsating rainbow of colour. From what you can see of your surroundings you are in an underground cavern. The crystals begin singing to you in a language you almost understand. As they sing they grow brighter and brighter until you are forced to shield your eyes. Maybe it is time to leave. There is a door ot the side of you.",
  exits: {
    north: "volcano"
  }
});
