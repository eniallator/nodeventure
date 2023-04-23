room('garden', {
  description: "The garden is overgrown with weeds, to the point where you can't see what's growing in it at all! There is a hoe nearby- use it. ",
  image: "http://cabinetmagazine.org/issues/2/beige.jpg",
  exits: { east: 'home', backalong: 'soup kitchen' front: 'spiderweb' },
  items: [
  
  
  ], 
  pourWater: function(player) {
      player.inventory.push({
        name: 'herbs',
        short: 'herbs for tasty food',
        description: 'herbs emerge!'
      });
    }
});



