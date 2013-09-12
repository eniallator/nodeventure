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

    $('<div id="circle1" class="circle"></div>').appendTo('body');
    $('<div id="circle2" class="circle"></div>').appendTo('body');
    $('<div id="circle3" class="circle"></div>').appendTo('body');
    $('.circle').css({
    	background: 'white',
    	height: '250px',
    	width: '250px',
    	borderRadius: '250px'
    });
    var container = $('#container').appendTo('body');

    // styles
    $('#circle1').css({
    	position: 'absolute',
    	bottom: 50,
    	left: 50
    })
    $('#circle2').css({
    	position: 'absolute',
    	bottom: 50,
    	left: 300
    });
    $('#circle3').css({
    	position: 'absolute',
    	bottom: 50,
    	left: 600
    });


    


    
  });
});
