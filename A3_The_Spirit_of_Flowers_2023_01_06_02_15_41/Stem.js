// The code is modified from:
// https://p5js.org/examples/motion-moving-on-curves.html

class Stem {
  
  /*
   * The Stem constructor takes x and y coordinates of
   * the centre of the flower and grow from the bottom.
   */
  constructor(endX, endY) {
    this.endX = endX; // Final x coordinate
    this.endY = endY; // Final y coordinate
    
    this.beginX = endX + random([1, -1]) * random(width/5)// Initial x coordinate
    this.beginY = height // Initial y coordinate
    this.distX = this.endX - this.beginX; // X-axis distance to move
    this.distY = this.endY - this.beginY; // Y-axis distance to move
    
    this.exponent = 4; // Determines the curve
    this.x = 0; // Current x-coordinate
    this.y = 0; // Current y-coordinate
    this.step = 0.01; // Size of each step for stem dots along the path
    this.pct = 0; // Percentage traveled (0.0 - 1.0)
    
    this.stemDots = [];

  }
  
  
  /*
   * Called when creating a stem.
   * If the begin point is outside the canvas,
   * reassign its x coordinate.
   */
  create() {
    while(this.beginX < 0 || this.beginX > width) {
      this.beginX = this.endX + random([1, -1]) * random(200);
      this.distX = this.endX - this.beginX;
    } 
  }
  
  
  /*
   * Grow new stem dots in the shape of an 
   * exponential curve.
   */
  grow() {
    this.pct += this.step;
    this.x = this.beginX + pow(this.pct, this.exponent) * this.distX;
    this.y = this.beginY + this.pct * this.distY;
    
    this.stemDots.push(createVector(this.x, this.y));
  }
  
  
  /*
   * Remove the elements from the end of the stemDots 
   * array so the stem wither from the top.
   */
  wither() {
    this.stemDots.pop();
  }
  
  
  /*
   * Drw the stem
   */
  draw() {
    noStroke();
    fill(200,255,220);
    for(let dot of this.stemDots) {
      ellipse(dot.x, dot.y, 2, 2);
    }  
  }
  
}

