room("broom cupboard", {
  description: "It's dusty and dark, but relaxingly quiet.",
  exits: {
    west: "home2"
  }
});

item("home", "map", {
    description: "A magical map. It smarkles with magic",
    short: 'map',
    respwnTime: 3600,
});
const max_w = 20;
const max_h = 10;

const getIndex = function(x,y){
    return x+max_w*y;
}

const iterateMap = function(room,game,ttl,mapArr,data,rooms){
    console.log(`next room: ${room} ${ttl} ${data.x} ${data.y} ${data.d}`);
    if(ttl<0){
        return;
    }
    if(data.y>=max_h || data.y<0){
        return;
    }
    if(data.x>=max_w || data.x<0){
        return;
    }
    
    var exits = room.exits;
    var order = [[0,1,'|'],[1,0,'-'],[-1,0,'-'],[0,-1,'|'],[1,1,'/'],[-1,1,'\\'],[-1,-1,'/']];
    var i = -1;
    var orderIndex = (i+data.d)%order.length;
    mapArr[getIndex(data.x,data.y)] = ttl.toString();
    if(ttl==0){
        return;
    }
    for(var n in exits){
        var step1, step2;
        do{
            i++;
            orderIndex = (i+data.d)%order.length;
            if(i>=order.length){
                game.warn('no directions left');
                return;
            }
            step1 = {x:data.x+order[orderIndex][0],y:data.y+order[orderIndex][1]};
            step2 = {x:data.x+2*order[orderIndex][0],y:data.y+2*order[orderIndex][1]};
        } while( mapArr[getIndex(step1.x,step1.y)]!=null || mapArr[getIndex(step2.x,step2.y)]!=null );
        mapArr[getIndex(step1.x,step1.y)] = order[orderIndex][2];
        var nextRoom = game.rooms[room.exits[n]];
        if(!nextRoom){
            mapArr[getIndex(step2.x,step2.y)] = "X";
            game.warn(`room ${room.exits[n]} not found. ${ttl}`);
        }else {
            var nextRoomData = Object.create(data);
            nextRoomData.x = step2.x;
            nextRoomData.y = step2.y;
            nextRoomData.d = orderIndex;
            rooms.push(iterateMap.bind(null,nextRoom,game,ttl-1,mapArr,nextRoomData,rooms));
            //recurseMap(nextRoom,game,ttl-1,mapArr,step2.x,step2.y);
        }
    }
};

const readMap = function(rest,player,item,game){
    var room = player.getCurrentRoom();
    var w = 20;
    var h = 10;
    var mapArr = new Array(w*h);
    player.write("you read the map");
    
    roomQueue = [];
    iterateMap(room,game,4,mapArr,{x:5,y:5,d:0},roomQueue);
    while(roomQueue.length>0){
        roomQueue.shift()();
    }
    
    for(var j=0;j<10;j++){
        var line = "";
        for(var i=0;i<20;i++){
            var c = mapArr[getIndex(i,j,w)];
            if( c ){
                line+=c;
            }
            else
                line+=' ';
        }
        
        player.write(line);
    }
};


itemCommand("read", "map", "peer at the map", readMap);
itemCommand("use", "map", "peer at the map", readMap);

