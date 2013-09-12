room("forest", {
  description: "You find yourself surrounded by a forest. Trees stretch as far as you can see in every direction. Looking around you realise that the door you have entered through has vanished. The sun shines through a canopy of branches creating a dappled effect of light and dark across the ground.  In the distance a bird warbles sleepily. As you step forwards something connects with your foot. It is an abandoned pair of sunglasses.",
  exits: {
    north: "canal",
    east: "volcano",
    south: "butterfly"
    
  }
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







// ==============================
/*




room("NAME", {
  description: "DESCRIPTION",
  exits: {
    north: "NAME"
  }
});


*/
