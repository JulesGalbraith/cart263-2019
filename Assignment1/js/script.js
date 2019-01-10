"use strict";

let backgroundImg;
let avatar = {
  x: 0,
  y: 0,
  maxSize: 100,
  size: 100,
  alive: true,
  r: 255,
  g: 226,
  b: 100
}

let food = {
  x: 0,
  y: 0,
  size: 50,
  r: 100,
  g: 204,
  b: 255
}

let appetite;
let deFont;


function preload() {
  backgroundImg = loadImage("assets/images/starfield.jpg");
  deFont = loadFont("assets/fonts/lcddot.ttf");
}

function setup() {
  createCanvas(1000,600);

  textAlign(CENTER);

  food.x = random(0,width);
  food.y = random(0,height);

}

function draw() {
 background(backgroundImg);

 if (avatar.alive) {
 updateAvatar();
 displayAvatar();

 displayFood();
 collision();
}

else {
  endGame();
}

}

function updateAvatar() {
  avatar.x = mouseX;
  avatar.y = mouseY;

  avatar.size -= 0.25;
  avatar.size = constrain(avatar.size,0,avatar.maxSize);

  if (avatar.size === 0) {
    avatar.alive = false;
  }
}

function displayAvatar() {

  push();
  noStroke();
  fill(avatar.r,avatar.g,avatar.b);
  ellipse(avatar.x,avatar.y,avatar.size);
  pop();
}

function displayFood() {

  push();
  noStroke();
  fill(food.r,food.g,food.b);
  ellipse(food.x,food.y,food.size);
  pop();
}

function collision() {
  appetite = dist(food.x,food.y,avatar.x,avatar.y);

  if (appetite < (food.size/2 + avatar.size/2) ){
    avatar.size += 3
    avatar.size = constrain (avatar.size,0,avatar.maxSize);

    food.x = random(0,width);
    food.y = random(0,height);

    food.g = random(0,255);
    food.r = random(0,255);

    avatar.b = random(0.255);
    avatar.g = random(0,255);
  }
}

function endGame() {
  background(0);

  push();
  textFont(deFont);
  textSize(100);
  fill(255,0,0);
  text("TOUGH LUCK",width/2,height/2);
  pop();

  keyPressed();

}

function keyPressed() {
  if (keyCode === ENTER) {
    location.reload();
  }
}
