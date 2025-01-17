/*
 * Nodeventure client JS
 */

/*global io */
(function () {
  "use strict";
  
  var
  socket = io.connect(location.href),
  lineFeed = [],
  inputPress = 0,

  // dividers
  dividerTimeout = null,
  dividerTime = 2000,
  divider = "---";


  // function to add new text to the page
  function addLine(string, opts) {
    if (!opts) opts = {};
    var line = $('<pre>');
    if(opts.cls) line.addClass(opts.cls);

    if (opts.html) {
      line.html(string);
    } else {
      line.text(string);
    }
    $('#output').append(line);
    $('#output').animate({scrollTop: $("#output")[0].scrollHeight}, 'slow');
  }


  // add divider
  function dividerMessage() {
    addLine(divider);
  }

  // Start countdown to add divider
  function dividerMessageTrigger() {
    dividerTimeout = setTimeout(dividerMessage, dividerTime);
  }


  // set up sockets
  socket.on('write', function (message) {
    if (message.string) {
      addLine(message.string);
    }

    if (message.html) {
      addLine(message.html,{ html: true });
    }

    if (message.effect) {
      window[message.effect]();
    }

    if (message.display) {
      window.display[message.display.command].apply(window.display, message.display.arguments || []);
    }

    if (message.error) {
      addLine(message.error.string, { cls: message.error.type||"warn"});
      console.log(message.error.string);
    }
  });

  socket.on('disconnect', function () {
    addLine('DISCONNECTED!');
    connect();
  });


  // function to send data
  function sendCommand() {
    var theCommand = $('#command').val();
    addLine(theCommand, {cls:"user"});
    socket.emit('command', theCommand);
    $('#command').val('').focus();

    lineFeed.unshift(theCommand);

    if (lineFeed.length === 50) {
      lineFeed.pop();
    }

    $('#output').animate({scrollTop: $("#output")[0].scrollHeight}, 'slow');

    // divider...
    clearTimeout(dividerTimeout);
    dividerMessageTrigger();
  }


  // function to deal with key up and down line feed
  function recallCommand() {
    var lastCommand = lineFeed[inputPress];
    $('#command').val(lastCommand);

    if (inputPress < 0) {
      inputPress = 0;
    }

    if (inputPress > lineFeed.length) {
      inputPress = lineFeed.length;
    }
  }


  // command form submit
  $('#send').click(sendCommand);
  $('#command').keyup(function (e) {
    if (e.keyCode === 13) {
      inputPress = 0;
      sendCommand();
    }
  });
  $('#command').keyup(function (e) {
    if (e.keyCode === 38) {
      recallCommand();
      inputPress++;
    }
  });
  $('#command').keyup(function (e) {
    if (e.keyCode === 40) {
      recallCommand();
      inputPress--;
    }
  });


  // init the page on load
  function init() {
    var welcome, $line, counter, length;
    welcome = '              _                 _       \n _ _  ___  __| |_____ _____ _ _| |_ _  _ _ _ ___ \n| \' \\/ _ \\/ _` / -_) V / -_) \' \\  _| || | \'_/ -_)\n|_||_\\___/\\__,_\\___|\\_/\\___|_||_\\__|\\_,_|_| \\___|';
    $line = $('<pre id="welcome">');
    $('#output').append($line);

    counter = 0;
    length = welcome.length;
    addChar();

    // add characters, one at a time
    function addChar() {
      $line.append(welcome.charAt(counter));
      
      // are we still adding chars?
      if (counter++ < length) {

        // don't delay on spaces
        if (welcome.charAt(counter) === " ") {
          addChar();
        } else {
          setTimeout(addChar, 15);
        }
        
        // we've finished adding characters, init
      }
    }
  }


  function getColor(){
    var colorParts = [];

    for (var i = 0; i < 3; i++) {
      colorParts[i] = Math.floor(Math.random()*255);
    }

    return 'rgb('+colorParts[0]+','+colorParts[1]+','+colorParts[2]+')';
  }


  // locally store the username
  var storedUsername = localStorage.getItem("username") || "";
  var username;
  while (!username) {
    username = prompt("Name?", storedUsername);
  }
  localStorage.setItem("username", username);


  // INIT !
  function connect() {
    socket.emit('login', username);
    init();
    addLine('Connecting...');
    $("input#command").focus();
  }
  connect();

})();
