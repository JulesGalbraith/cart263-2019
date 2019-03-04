class Deco {
  constructor(x,y,size) {
    this.x = x;
    this.y =y;
    this.size = size;
    this.vx = 0;
    this.vy = 0;
    this.speed = 9;
    this.colour = 0;
    this.t = 0.1;
  }



display() {

  this.colour = (noise(this.t)*255)*1.5;
  push();
  noStroke();
  fill(this.colour);
  ellipse(this.x,this.y,this.size);
  pop();

  this.t += 0.1;

}

update() {

  this.setVelocity();

  this.x += this.vx;
  this.y += this.vy;

  if (this.x > width) {
    this.vx = random(-this.speed,0)*this.vx;
  }
  if (this.x < 0){
    this.vx = random(-this.speed,0)*this.vx;
  }
  if (this.y > height) {
    this.vy = random(-this.speed,0)*this.vy;
  }
  if (this.y < 0){
    this.vy = random(-this.speed,0)*this.vy;
  }

}


setVelocity() {
  this.vx = random(-this.speed,this.speed);
  this.vy = random(-this.speed,this.speed);
}

}
