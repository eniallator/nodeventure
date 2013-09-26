room('the_uncreative_room', {
  description: "A bleak dark room, void of anything withholding or substantial. All that can be made out is a lone object sitting in the only pool of light. Being here creates a feeling that imagination and creativity is sapped away moment by moment.",
  image: "http://www.koreanbeacon.com/wp-content/uploads/2011/06/20-lee_ufan_naoshima_museum_silence_room.jpg",
  exits: { south: 'westbeach', west: 'hove_W', east: 'spinning_cube'  }, 
  items: [
    {
      name: 'An uncoloured shapeless mass',
      short: 'shapeless mass',
      description: 'A colourless and shapeless mass that has no apparent reason for existance.',
      respawnTimer: 60
    }
  ]
});
