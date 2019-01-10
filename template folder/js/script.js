

var numGuides = 5;
var guideIndex = 0;
var guides = [];
var user;


function setup(){

  createCanvas(windowWidth,windowHeight,WEBGL);
  background(0);

  user = new User(width/2,height/2);
}

function draw(){

moveUser();
displayUser();
displayGuides();

}

function displayGuides() {

 translate (-width/2,-height/3);

  for (i = 0 ; i < 5; i++) {
  guides.push(new Guide(width/5,guideIndex*150,20));
  guideIndex += 1;
  guides[i].display();
  }

  for (i = 5 ; i < 10; i++) {
  guides.push(new Guide(2*width/5,(guideIndex-5)*150,20));
  guideIndex += 1;
  guides[i].display();
  }

  for (i = 10; i < 15; i++) {
  guides.push(new Guide(3*width/5,(guideIndex-10)*150,20));
  guideIndex += 1;
  guides[i].display();
  }

  for (i = 15; i < 20; i++) {
  guides.push(new Guide(4*width/5,(guideIndex-15)*150,20));
  guideIndex += 1;
  guides[i].display();
  }

}
