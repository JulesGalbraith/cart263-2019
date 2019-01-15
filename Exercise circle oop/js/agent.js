class Agent {
constructor (x,y,size,colour) {
  this.x = x;
  this.y = y;
  this.size = size;
  this.colour = colour;
  this.alive = true;
}

display() {

  if (this.alive === true) {
    push();
    noStroke();
    fill(this.colour);
    ellipse(this.x,this.y,this.size);
    pop();
  }

}
}
