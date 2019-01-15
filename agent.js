class Agent {
  constructor(x, y, size, colour) {
    this.x = x;
    this.y = y;
    this.size = size;
    this.colour = colour;
    this.alive = true;
  }

  overlap(agent) {


       let distance = dist(this.x, this.y, agent.x, agent.y);

       if (distance < (agent.size / 2 + this.size / 2)) {
         return true;
       }
       else {
         return false;
       }
       
  }

  display() {

    if (this.alive === true) {
      push();
      noStroke();
      fill(this.colour);
      ellipse(this.x, this.y, this.size);
      pop();
    }
  }


}
