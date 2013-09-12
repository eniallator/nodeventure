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
    	paddingTop: '30%',
    	width: '30%',
    	borderRadius: '250px'
    });
    var container = $('#container').appendTo('body');

    // styles
    $('#circle1').css({
    	position: 'absolute',
    	bottom: 50,
    	left: 0,
    	background: '#7affca'
    })
    $('#circle2').css({
    	position: 'absolute',
    	bottom: 50,
    	left: '50%',
    	marginLeft: '-15%',
    	background: '#233d52'
    });
    $('#circle3').css({
    	position: 'absolute',
    	bottom: 50,
    	right: 0,
    	background: '#b1c7bc'
    });


    


    
  });
});
