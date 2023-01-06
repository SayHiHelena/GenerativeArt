class Firefly {

  /*
   * The Firefly constructor takes the initial position
   * (x and y coordinates) of the Firefly object.
   */
  constructor(x, y) {
    this.pos = createVector(x, y);
    // fixed velocity
    this.vel = p5.Vector.random2D().mult(0.7); 
    // size of firefly
    this.size = random(4,9);
    // firefly's breathing frequency
    this.breathFreq = random(1, 2); 
  }
  
  
  /*
   * Make the firefly reverse its moving direction if it
   * touches the boundary of the canvas.
   */
  touchBoundary() {
    // reverse the x vel when touching left/right boudary
    if(this.pos.x <= 0 || this.pos.x >= width) {
      this.vel.x *= -1;
    }
    // reverse the y vel when touching top/bottom boudary
    else if(this.pos.y <= 0 || this.pos.y >= height) {
      this.vel.y *= -1;
    }
  }
  

  /*
   * let the firefly fly around.
   * If there is at least one flower, the fireflies fly
   * back when touches the boudary, otherwise fly away.
   */
  fly() {
    if(flowerArray.length > 0) {
      this.touchBoundary();
    }
    this.pos.add(this.vel);
  }
  
  
  /*
   * draw the firefly
   */
  draw() {
    this.fly();
    noStroke();
    fill(255,243,161,100);
    // halo
    ellipse(this.pos.x, this.pos.y, this.size + sin(frameCount * this.breathFreq) * this.size);
    // firefly
    ellipse(this.pos.x, this.pos.y, this.size);
  }
}