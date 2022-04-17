var PLAY = 1;
var END = 0;
var gameState = PLAY;

var swimmer, swimmer_running, trex_diving;
var sea, invisibleGround, seaImage ,invisibleGround2;

var islandsGroup, islandImage;
var obstaclesGroup, obstacle1, obstacle2, obstacle3, obstacle4;

var score=0;

var gameOver, restart;



function preload(){
  swimmer_swimming =   loadAnimation("swimmer1.png","swimmer2.png");
  
  swimmer_diving = loadAnimation("swimmerdiving.png")
  
  seaImage = loadImage("ground.png");
  
  islandImage = loadImage("island.png");
  
  obstacle1 = loadImage("obstacle1.png");
  obstacle2 = loadImage("obstacle2.png");
  obstacle3 = loadImage("obstacle3.png");
  obstacle4 = loadImage("obstacle4.png");
  
  
  gameOverImg = loadImage("gameOver.png");
  restartImg = loadImage("restart.png");
  gameOverSharkImg = loadImage("gameovershark.png")
}

function setup() {
  createCanvas(800,600);
  
  
  
  sea = createSprite(400,300,5000,20);
  sea.addImage("ground",seaImage);
  
  sea.scale = 1
  

  swimmer = createSprite(150,315,20,50);
  
  swimmer.addAnimation("swimming", swimmer_swimming);
  swimmer.addAnimation("diving", swimmer_diving);

  
 
  swimmer.scale = 0.5;
  
  gameOver = createSprite(width/2,height/2-100);
  gameOver.addImage(gameOverImg);

  gameOverShark = createSprite(width/2,height/2+80);
  gameOverShark.addImage(gameOverSharkImg);
  
  restart = createSprite(width/2,height/2-50);
  restart.addImage(restartImg);
  
  gameOver.scale = 0.5;
  restart.scale = 0.5;
  gameOverShark.scale = 0.25

  gameOver.visible = false;
  restart.visible = false;
  gameOverShark.visible = false

  
  invisibleGround = createSprite(width/2,590,width,20);
  invisibleGround.visible = false;

  invisibleGround2 = createSprite(width/2,280,width,20);
  invisibleGround2.visible = false;
  
  islandsGroup = new Group();
  obstaclesGroup = new Group();

  swimmer.setCollider("rectangle",0,0,100,20)
 
  
}

function draw() {
 
  background("gray");
  console.log(swimmer.y)
 
  
  
  if (gameState===PLAY){
    score = score + Math.round(getFrameRate()/60);
    sea.velocityX = -(6 + 3*score/100);

    if(swimmer.collide(invisibleGround)){
      swimmer.changeAnimation("swimming",swimmer_swimming)
    }
  
    if(keyDown("space") ) {      
      
      swimmer.changeAnimation("diving",swimmer_diving)
      swimmer.velocityY = 2
    }
  
    if(keyDown("Up") ) {
      swimmer.velocityX = 1
      swimmer.velocityY = -2
       
       swimmer.changeAnimation("swimming",swimmer_swimming)
     }

     
    

   // swimmer.velocityY = swimmer.velocityY + 0.8
  
    if (sea.x < 300){
      sea.x = sea.width/2;
    }
  
    swimmer.collide(invisibleGround2);
    spawnIslands();
    spawnObstacles();
  
    if(obstaclesGroup.isTouching(swimmer)){
        gameState = END;
    }
  }
  else if (gameState === END) {
    gameOver.visible = true;
    restart.visible = true;
    gameOverShark.visible = true
    
    
    
    sea.velocityX = 0;
    swimmer.velocityY = 0;
    obstaclesGroup.setVelocityXEach(0);
    islandsGroup.setVelocityXEach(0);
    
    
    
    obstaclesGroup.setLifetimeEach(-1);
    islandsGroup.setLifetimeEach(-1);
    
    if(touches.length>0 || mousePressedOver(restart)) {
      reset()
      touches = [];
    }
  }
  
  
  drawSprites();
  text("Score: "+ score, 500,50);
}

function spawnIslands() {

  if (frameCount % 120 === 0) {
    var island = createSprite(width,height-180,40,10);
    island.y = Math.round(random(200,380));
    island.addImage(islandImage);
    island.scale = 0.2;
    island.velocityX = -3;
    
     
    island.lifetime = 400;
    
    
    island.depth = swimmer.depth;
    swimmer.depth = swimmer.depth + 1;
    
    
    islandsGroup.add(island);
  }
  
}

function spawnObstacles() {
  if(frameCount % 100 === 0) {
    var obstacle = createSprite(width,height-45,10,40);
    
    obstacle.velocityX = -(6 + 3*score/100);
    
    
  var rand = Math.round(random(1,6));
      switch(rand) {
      case 1: obstacle.addImage(obstacle1);
              break;
      case 2:  obstacle.addImage(obstacle2);
              break;
    case 3: obstacle.addImage(obstacle3);
              break;
        case 4: obstacle.addImage(obstacle4);
              break;
      default: break;
    }
    
              
    obstacle.scale = 0.3;
    obstacle.lifetime = 800;
    obstaclesGroup.add(obstacle);
  }
}

function reset(){
  gameState = PLAY;
  gameOver.visible = false;
  restart.visible = false;
  gameOverShark.visible = false
  swimmer.x = 150;
  swimmer.y = 315
  
  obstaclesGroup.destroyEach();
  islandsGroup.destroyEach();
  
  swimmer.changeAnimation("swimming",swimmer_swimming);
  
 
  
  score = 0;
  
}