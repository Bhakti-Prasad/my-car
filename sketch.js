/* track;
var PLAY=1;
var END=0;
var car,car1;
var gameState=PLAY;
function preload(){
  track=loadImage("track.jpg")
  car=loadImage("car.png")
}
function setup(){
 
}
function draw() {
  image(track,0,-displayHeight*4,displayWidth,displayHeight*5)
  if(gameState===PLAY){
  if(keyIsDown("up")){
   car1.y=car1.y-8
  }
  if(keyIsDown("down")){
    car1.y=car1.y+8
   }
   if(keyDown("right")){
    car1.x=car1.x+3
   }
   if(keyDown("left")){
    car1.x=car1.x-3
   }
  }
  drawSprites();
}*/





var car1, database;
var position;

function preload(){
  track=loadImage("track.jpg")
  car=loadImage("car.png")
}

function setup(){
  database = firebase.database();
  console.log(database);
  canvas=createCanvas(500,500);

  var car1=createSprite(200,200,20,20);
  //car1.addImage("car",car)
  //car1.scale=0.3


  var car1Position = database.ref('car1/position');
  car1Position.on("value", readPosition, showError);
}

function draw(){
  background("white");
  
    if(keyDown(LEFT_ARROW)){
      writePosition(-1,0);
    }
    else if(keyDown(RIGHT_ARROW)){
      writePosition(1,0);
    }
    else if(keyDown(UP_ARROW)){
      writePosition(0,-1);
    }
    else if(keyDown(DOWN_ARROW)){
      writePosition(0,+1);
    }
    drawSprites();
  
}

function writePosition(x,y){
  database.ref('car1/position').set({
    'x': position.x + x ,
    'y': position.y + y
  })
}

function readPosition(data){
  position = data.val();
  console.log(position.x);
  car1.x = position.x;
  car1.y = position.y;
}

function showError(){
  console.log("Error in writing to the database");
}