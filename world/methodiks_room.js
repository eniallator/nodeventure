room('methodiks_room', {
  description: "All you have to do is click on the circles, at the moment there aren't any circles though...",
  exits: {
    west: 'alley',
    east: 'temple',
    down: 'basement'
  },
  image: ''
});

handler('enterRoom:methodiks_room', function (player, room, game) {
  player.display.eval(function () {
    // This function will be executed on the client

    $('<div id="circle1">circle1</div>').appendTo('body');
    $('#circle1').css({
    	background: 'white',
    	height: '250px',
    	width: '250px',
    	borderRadius: '250px',
    	position: 'absolute',
    	bottom: 50,
    	left: 50
    });
    var container = $('#container').appendTo('body');

    $.ajax('http://methodik.co.uk/nodeventure/methodiks-room-markup.html');


    
  });
});
