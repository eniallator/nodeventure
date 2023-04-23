handler('enterRoom', function (player, room, game) {
    if (room.name === ''){
      player.display.eval(function(){
        var body = jQuery('body'),
            canvas = jQuery('<canvas></canvas>'),
            ctx = canvas.getContext('2d');
            
      var canvas;  
var ctx;

var ang = 0;
var decay = 1;
var grow = 1;

var x = 800;
var y = 600;
var w = 200;
var v = 200;
var con = 224;

var dx = 2;
var dy = 4;

var WIDTH = 800;
var HEIGHT = 600; 

function circle(x,y,r) {
  ctx.beginPath();
  ctx.arc(x, y, r, 0, Math.PI*2, true);
  ctx.fill();
}

function rect(x,y,w,h) {
  ctx.beginPath();
  ctx.rect(x,y,w,h);
  ctx.closePath();
  ctx.fill();
}

 
function clear() {
  ctx.clearRect(0, 0, WIDTH, HEIGHT);
}

function init() {
  canvas = document.getElementById("canvas");
  ctx = canvas.getContext("2d");
  return setInterval(draw, 10);
}


function draw() {

  dx = 999*dx/1000;
  dy = 999*dy/1000;
  
  grow = grow * 1.0001;
  
  decay = decay * 999/1000;
  ang = ang + 3;
  
  r = x + decay*76*Math.cos(ang/50);
  s = y + decay*76*Math.sin(2*ang/50);
  
  clear();
  ctx.fillStyle = "aqua";
  rect(0,0,WIDTH,HEIGHT);
  
  ctx.fillStyle = "#444444";
  circle(x, y, 25);
  
  ctx.fillStyle = "#110099";
  circle(r, s , 7);
  
  ctx.fillStyle = "#550022";
  circle(150, 270 , grow);



  if (x + dx > WIDTH || x + dx < 0)
    dx = -dx;
  if (y + dy > HEIGHT || y + dy < 0)
    dy = -dy;

  x += dx;
  y += dy;
  
  

}


      });
    }
});
