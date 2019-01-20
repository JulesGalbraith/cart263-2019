// Food
//
// A class to represent food, mostly just involves the ability to be
// a random size and to reset

class Food extends Agent {

  // Constructor
  //
  // Pass arguments on to the super() constructor (e.g. for Agent)
  // Also set a minimum and maximum size for this food object which it
  // will vary between when it resets
  constructor(x,y,minSize,maxSize,colour) {
    super(x,y,random(minSize,maxSize),colour);
    this.minSize = minSize;
    this.maxSize = maxSize;
    this.colour = colour;
    this.colourVal1 = random(100,255);
    this.colourVal2 = random(100,255);
    this.colourVal3 = random(100,255);
    this.maxSpeed = random(-3,3);
    this.vx = 0;
    this.vy = 0;
    this.noiseT = random(0.5);
  }

  // reset()
  //
  // Set position to a random location on the canvas
  // Set the size to a random size within the limits
  reset() {
    this.x = random(0,width);
    this.y = random(0,height);

    this.size = random(this.minSize,this.maxSize,);

    this.colourVal1 = random(100,255);
    this.colourVal2 = random(50,100);
    this.colourVal3 = random(100,255);
    this.colour = color(this.colourVal1,this.colourVal2,this.colourVal2);

    this.vx = random(-this.maxSpeed,this.maxSpeed);
  }


  wrap () {
    if (this.x > width) {
      this.x -= width;
    }
    if (this.x < 0) {
      this.x += width;
    }
    if (this.y < 0) {
      this.y += height;
    }
    if (this.y > height) {
      this.y -= height
    }
  }


update() {

this.vx = this.maxSpeed;
this.vy = random(3,10)*(map(noise(this.noiseT),0,1,-this.maxSpeed,this.maxSpeed));

this.x += this.vx;
this.y += this.vy;

this.noiseT += 0.2;
this.wrap();

}

randomize() {
 this.maxSpeed = random(-this.MaxSpeed,this.maxSpeed);
}

}
