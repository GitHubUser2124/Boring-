const Engine = Matter.Engine;
const World = Matter.World;
const Bodies = Matter.Bodies;
const Body = Matter.Body;

var world,engine;

var player;
var rightArrow, leftArrow;
var platform, platform2, platform3, platform4;


function setup() {
  createCanvas(windowWidth,windowHeight);

  engine = Engine.create();
  world = engine.world;

  //Creating Player and Properties
  var playerOptions = {
    isStatic: false
    
  }
  player = Bodies.rectangle(width/2, height-height+30, 20, 20, playerOptions);
  World.add(world, player);

  //Creating Right Arrow
  rightArrow = createImg("Assets/Right Arrow.png");
  rightArrow.position(width/2+400, height-600);
  rightArrow.size = 0.5;
  rightArrow.mouseClicked(rightForce);

  //Creating Left Arrow
  leftArrow = createImg("Assets/Left Arrow.png");
  leftArrow.position(width/2-600, height-600);
  leftArrow.size = 0.5;
  leftArrow.mouseClicked(leftForce);
  
  //Creating kill bricks
  platform = new Platforms(width/2-100, height/2+200, 50, 20);
  platform2 = new Platforms(width/2-200, height/2, 50, 20);
  platform3 = new Platforms(width/2, height/2+50, 50, 20);
  platform4 = new Platforms(width/2+100, height/4, 50, 20);


  //Changing engine speed
  engine.timing.timeScale = 0.5;

  
}

function draw() 
{
  background(51);
  Engine.update(engine);

  //Showing win text
  if(player.position.y>height){
    fill("white");
    textSize(40);
    textFont("Franklin Gothic");
    text("GOOD JOB!", width/2-100, height/2);
  }

  //Showing Lose text
  if(player.position.y<height-height || player.position-platform.position<=0 || player.position.x>width || player.position.x<width/2){
    fill("white");
    textSize(40);
    textFont("Franklin Gothic");
    text("OH NO!!!", width/2-100, height/2);
  }

  //Displaying kill brick
  platform.display();
  platform2.display();
  platform3.display();
  platform4.display();

  //Displaying Player
  rect(player.position.x, player.position.y, 20, 20);
}

function rightForce(){
  Body.applyForce(player, {x:0, y:0}, {x:0.08, y:0});
}

function leftForce(){
  Body.applyForce(player, {x:0, y:0}, {x:-0.08, y:0});
}