var bg,bgImg
var ninja,ninjaImg
var monster,monsterImg
var obstacle1,obstacle2,obstacle3
var obstaclesGroup
var invisibleBg;
var gameState="PLAY"
var ninjaStoping,monsterStoping;
var gameOver,gameOverImg
var restart,restartImg
var jump,gameOverSD
var Score=0

function setup() {
  createCanvas(1200,600);
 bg=createSprite(600,300, 1200, 800);
 bg.addImage(bgImg);
 bg.scale=0.85;
 bg.velocityX=-4

 ninja=createSprite(600,510)
ninja.addAnimation("player",ninjaImg);
ninja.addAnimation("stop",ninjaStoping)
//ninja.debug=true
ninja.setCollider("rectangle",0,0,40,180)


monster=createSprite(280,480)
monster.addAnimation("villain",monsterImg);
monster.addAnimation("monster",monsterStoping)
monster.scale=2

invisibleBg=createSprite(600,600,1200,10)

gameOver=createSprite(600,200)
gameOver.addImage(gameOverImg);


restart=createSprite(620,330)
restart.addImage(restartImg);
restart.scale=0.2

obstaclesGroup=new Group()
}

function preload(){
ninjaImg=loadAnimation("images/ninja-1.png","images/ninja-2.png","images/ninja-3.png","images/ninja-4.png","images/ninja-5.png","images/ninja-6.png","images/ninja-7.png","images/ninja-8.png","images/ninja-9.png","images/ninja-10.png")
bgImg=loadImage("images/jungle.jpg")
monsterImg=loadAnimation("images/m-1.png","images/m-2.png","images/m-3.png","images/m-4.png","images/m-5.png","images/m-6.png","images/m-7.png")
obstacle1=loadImage("images/c1-.png")
obstacle2=loadImage("images/c2.png")
obstacle3=loadImage("images/c3.png")
ninjaStoping=loadImage("images/ninja-1.png")
monsterStoping=loadImage("images/m-1.png")
gameOverImg=loadImage("images/GameOver.png")
restartImg=loadImage("images/reset.png")
jump=loadSound("jump sound .mp3");
gameOverSD=loadSound("Game Over .mp3");
}






function draw() {
  background(255,255,255);
  
  if(gameState==="PLAY"){
    bg.velocityX=-4
    gameOver.visible=false
    restart.visible=false
   
    Score=Score+Math.round(getFrameRate()/60)
    console.log(ninja.y)
  if(keyDown("space")&&ninja.y>=505){
    
    ninja.velocityY=-10
    jump.play()
  }
 ninja.velocityY=ninja.velocityY+0.3
 ninja.collide(invisibleBg);
  if(bg.x<500){
    bg.x=700
  }
  spawnObstacles();
  for(var i=0;i<obstaclesGroup.length;i++){
    if(monster.isTouching(obstaclesGroup)){
      obstaclesGroup.get(i).destroy(i)
    }
  }
  if(monster.isTouching(obstaclesGroup)){
    obstaclesGroup.destroyEach()
  }
  if(ninja.isTouching(obstaclesGroup)){
    gameState="END"
    gameOverSD.play()
  }
}
if(gameState==="END"){
  gameOver.visible=true
  restart.visible=true

  bg.velocityX=0;
  obstaclesGroup.setVelocityXEach(0);
  ninja.velocityY=0
  ninja.changeAnimation("stop")
  monster.changeAnimation("monster")
  obstaclesGroup.setLifetimeEach(-1)
  if(mousePressedOver(restart)){
    reset();
  }
}
  drawSprites();
  fill("blue")
  textSize(30)
  text("Score="+Score,600,50)

}

function spawnObstacles() {
  if(frameCount % 120 === 0) {
    var obstacle = createSprite(1200,530,10,40);
    //obstacle.debug = true;
    obstacle.velocityX =-5
    
    //generate random obstacles
    var rand = Math.round(random(1,3));
    switch(rand) {
      case 1: obstacle.addImage(obstacle1);
              break;
      case 2: obstacle.addImage(obstacle2);
              break;
      case 3: obstacle.addImage(obstacle3);
              break;
    
    }
    
    //assign scale and lifetime to the obstacle           
    obstacle.scale = 1;
    obstacle.lifetime = 300;
    //add each obstacle to the group
    obstaclesGroup.add(obstacle);
  }
}

function reset(){
  gameState = "PLAY";
  gameOver.visible = false;
  restart.visible = false;
  
  obstaclesGroup.destroyEach();

  
  ninja.changeAnimation("player",ninjaImg);
  monster.changeAnimation("villain",monsterImg)
  
  
 
  
  score = 0;
  
}
