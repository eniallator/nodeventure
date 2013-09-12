room('beach', {
  description: "waves crash upon a stony beach.",
  image: "http://farm9.staticflickr.com/8248/8502899877_19c3a4a6f7.jpg",
  exits: { south: 'sea', north: 'beachpath', west: 'westbeach' },
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
  ]
});
