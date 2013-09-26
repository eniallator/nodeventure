room('The uncreative room', {
  description: "A bleak dark room, void of anything withholding or substantial. Being here creates a feeling that imagination and creativity is sapped away moment by moment.",
  image: "http://farm9.staticflickr.com/8116/8661273072_50e771036e.jpg",
  exits: { east: 'beach' },
  items: [
    {
      name: 'An uncoloured shapeless mass',
      short: 'shapeless mass',
      description: 'A colourless and shapeless mass that has no apparent reason for existance.',
      respawnTimer: 60
    }
  ]
});
