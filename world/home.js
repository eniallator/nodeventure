handler('enterRoom:home', function (player, room, game) {
  player.display.eval(function () {
    // This function will be executed on the client

    $('<h1>' + foo + '</h2>').appendTo('body').css({top: 0, left: 0; 'z-index': 999});
    
 }, {foo: 'bar'});
});
