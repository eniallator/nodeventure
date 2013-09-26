room('island', {
  description: "You approach an island. The island is a mix of tropical paridise and artic tundra. Its a magic island, that how. You spy a landing spot ahead to the South",
  image: "http://farm4.staticflickr.com/3504/3881947955_cc2a0e7546.jpg",
  exits: { north: 'sea', south: 'island_beach' },
});

room('island_beach', {
  description: "The Sailboat is moored up on a loose rock on a small sandy beach on the island.",
  exits: { west: 'island_walrus_beach', south: 'island_inland', east: 'island_treeshouse_base' },
});

room('island_walrus_beach', {
  description: "A rocky beach that normally should be full of Walrus",
  exits: { east: 'island_beach' },
});

room('island_treehouse_base', {
  description: "It looks like this is where the marooned guy was taking shelter",
  exits: { west: 'island_beach', up: 'island_treehouse' },
});

room('island_treehouse', {
  description: "You enter the Marroned guys treehouse, you spy a chest in the corner",
  exits: { down: 'island_treehouse_base' },
});

room('island_inland', {
  description: "The island jungle",
  exits: { north: 'island_beach', west: 'island_jungle_west', east: 'island_jungle_east', south: 'island_crashsite' },
});

room('island_jungle_west', {
  description: "More Island Jungle",
  exits: { east: 'island_inland' },
});

room('island_jungle_east', {
  description: "More Island Jungle",
  exits: { west: 'island_inland' },
});

room('island_crashsite', {
  description: "You come accross the Crash site where Marroned Guys plane went down. Lluggage is thrown everywhere.",
  exits: { north: 'island_inland' },
});

room('under_sea', {
  description: "You dive off the boat and take a look underwater. As fishs swim past you, you spy in the disance depths what looks like a sunken Galleon. You ponder returning here when you have a diving suit.",
  exits: { up: 'sea' },
});

room('galleon', {
  description: "You dive off the boat and take a look underwater. As fishs swim past you, you spy in the disance depths what looks like a sunken Galleon. You ponder returning here when you have a diving suit.",
  exits: { west: 'galleon_bridge', down: 'galleon_below_deck' },
});

room('galleon_bridge', {
  description: "The bridge of the sunken Galleon. The captians skelekton is still here, at least he went down with his ship.",
  exits: { east: 'galleon' },
});

room('galleon_below_deck', {
  description: "Below deck the galleon looks like it may be crumbling after being here for years. You spy a door towrds what could have been the captains quarters",
  exits: { up: 'galleon', east: 'galleon_captians_quarters' },
});

room('galleon_captians_quarters', {
  description: "The captains quarters look in fine shape considering the state of the reast of the ship. There may even be treasure here.",
  exits: { west: 'below_deck' },
});
