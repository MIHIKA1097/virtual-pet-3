//Create variables here
var dog , happyDog , database , foodS ,foodStock , dogImage;
var foodObj,fedTime,lastFed;
var bedroomImage,gardenImage,washroomImage;
var readState,changeState;
var bedroom,garden,washroom;

function preload()
{
  //load images here
  dogImage = loadImage("images/dogImg.png");
  happyDog = loadImage("images/dogImg1.png");
  bedroomImage = loadImage("virtual pet images/Bed Room.png")
  gardenImage = loadImage("virtual pet images/Garden.png")
  washroomImage = loadImage("virtual pet images/Wash Room.png")

}

function setup() {
  database=firebase.database();
	createCanvas(500, 500);
  dog = createSprite(50,50)
  dog.addImage(dogImage)
  dog.scale=0.15;
  // var dogposition = database.ref('dog/position')
  // dogposition.on("value",readPosition,showError)
  foodStock = database.ref('Food')
  foodStock.on("value",readStock)

  feed = createButton("FEED THE DOG")
  feed.position(700,95)
  feed.mousePressed(feedDog);

  addFood = createButton("ADD FOOD")
  addFood.position(800,95)
  addFood.mousePressed(addFoods);

  readState = database.ref('gameState');
  readState.on("value",function(data){
    gameState = data.val();
  })
}


 
function draw() {  
background(46,139,87)

//if(keyWentDown(UP_ARROW)){
 // writeStock(foodS);
  //dog.addImage(happyDog);
//}
  drawSprites();
  fill(255,255,254);
  stroke("black");
  text("Food remaining : "+foodS,170,200);
  textSize(13);
  
  fedTime = database.ref('FeedTime')
  fedTime.on("value",function(data){lastFed=data.val()
  });
if(lastFed >= 12){
  text("LAST FEED :"+ lastFed%12 + "PM",350,30);
}else if(lastFed===0){
  text("Last Fed : 12AM",350,30)
}else{
  text("Last Fed : "+lastFed+"AM",350,30)
}
if(gameState!="Hungry"){
  feedDog.hide();
  addFood.hide();
  dog.remove();
}else{
  feedDog.show();
  addFood.show();
  dog.addImage(sadDog);
}
drawSprites();
}
function readStock(data){
  foodS = data.val();
  }
  //Function to write values in DB
function writeStock(x){
  if(x<=0){
    x=0;
  }else{
    x=x-1;
  } 
  database.ref('/').update({
    Food:x
  })
}
function feedDog(){
  dog.addImage(happyDog)

  foodObj.updateFoodStock(foodObj.getFoodStock()-1);
  database.ref('/').update({
    Food:foodObj.getFoodStock(),
    FeedTime:hour()
  })
}
function addFoods(){
  foodS++;
  database.ref('/').update({
    Food:foodS
  })
}
