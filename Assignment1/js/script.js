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
  b: 100,
  grow: 3,
  shrink: 0.25
}

let food = {
  x: 0,
  y: 0,
  size: 50,
  r: 100,
  g: 204,
  b: 255,
  maxV: 3,
  vx: 1,
  vy: 1,
  }

let appetite;
let deFont;
let direction;

function preload() {
  backgroundImg = loadImage("assets/images/starfield.jpg");
  deFont = loadFont("assets/fonts/lcddot.ttf");
}

function setup() {

  createCanvas(1000, 600);
  textAlign(CENTER);
  randomizeFood();

  setInterval(positionFood,1500);

}

function draw() {
  background(backgroundImg);

  if (avatar.alive) {
    updateAvatar();
    displayAvatar();

    updateFood();
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

  avatar.size -= avatar.shrink;
  avatar.size = constrain(avatar.size, 0, avatar.maxSize);

  if (avatar.size === 0) {
    avatar.alive = false;
  }
}

function displayAvatar() {

  push();
  noStroke();
  fill(avatar.r, avatar.g, avatar.b);
  ellipse(avatar.x, avatar.y, avatar.size);
  pop();
}

function displayFood() {

  push();
  noStroke();
  fill(food.r, food.g, food.b);
  ellipse(food.x, food.y, food.size);
  pop();
}

function collision() {
  appetite = dist(food.x, food.y, avatar.x, avatar.y);

  if (appetite < (food.size / 2 + avatar.size / 2)) {
    avatar.size += avatar.grow;
    avatar.size = constrain(avatar.size, 0, avatar.maxSize);

    randomizeFood();
  }
}

function endGame() {
  background(0);

  push();
  textFont(deFont);
  textSize(100);
  fill(255, 0, 0);
  text("TOUGH LUCK", width / 2, height / 2);
  pop();

  keyPressed();

}

function randomizeFood() {

  food.x = random(0, width);
  food.y = random(0, height);

  food.g = random(0, 255);
  food.r = random(0, 255);

  avatar.b = random(0.255);
  avatar.g = random(0, 255);

}

function updateFood() {

  food.x += food.vx;
  food.y += food.vy;

  if (food.x > width) {
    food.x -= width;
  }
  if (food.x < 0) {
    food.x += width;
  }
  if (food.y > height) {
    food.y -= height;

  }
  if (food.y < 0) {
    food.y += height;
  }
}

function positionFood() {

  food.vx = food.maxV*random(-food.maxV,food.maxV)
  food.vy = food.maxV*random(-food.maxV,food.maxV)

}

function keyPressed() {
  if (keyCode === ENTER) {
    location.reload();
  }
}
