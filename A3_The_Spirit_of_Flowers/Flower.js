// the flower blooms/withers at a fixed volocity of 6° per frame
const bloomAngleStep = 6; 

class Flower {
  
  /*
   * The Flower constructor takes the x and y coordinates 
   * of the centre of the flower.
   */
  constructor(centreX, centreY) {
    this.centreX = centreX;
    this.centreY = centreY;
    
    // randomly generated values
    this.pWidthFactor = random(0.1, 0.7); // the ratio of the petals' width to length
    this.petalNum = floor(random(10, 30)); // number of patels
    this.sizeFactor = random(0.1, 0.4); // the ratio of the petals' length to the canvas' min(width, height)
    this.pLength = this.sizeFactor * min(width, height); // the length of the patel
    this.colourSeed = floor(random(10)); // base noise seed to determine the petals' colour
    this.controlPointNum = random([3,4]); // number of control points for each petal line
    this.lifetime = floor(random(5*FPS, 10*FPS)); // the max lifetime of a flower (between 5-10s)
    
    // variables to store parts of the flower
    this.stem = new Stem(this.centreX, this.centreY);
    this.petals = [];
    
    // state detection variables
    this.tCount = 0; // time count
    this.isAlive = true; // if the flower is alive/withering
    this.isBlooming = true; // if the flower is blooming/hiding as a bud
    this.stemAngle = 0; // the angle that the stem is pointing towards
    this.bloomAngle = 0; // the angle of the bloom on each side of the stem
    this.bloomCount = 0; // keep track of the time of a flower in the form of the bud
  }
  
  
  /*
   * Play the sound while making the flower wither.
   */
  kill() {
    disappearSfx.play();
    this.isAlive = false;
  }

  
  /*
   * Update the growing status.
   */
  growLogic(){
    
    // create the stem as the Flower object is created
    if(this.tCount == 0) {
      this.stem.create();
    }
    
    else{
      // grow the stem if the flower is alive
      if(this.isAlive) {
        
        if(this.stem.pct <= 1) { // stem is growing
          this.stem.grow();
          
          // calculate the stem angle once it's fully grown
          if(this.tCount == 100) {
            // calculation method based on: 
            // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/atan2
            let x = this.stem.stemDots[99].x - this.stem.stemDots[98].x;
            let y = this.stem.stemDots[99].y - this.stem.stemDots[98].y;
            
            this.stemAngle = Math.atan2(y,x) * (180/PI); // radians to degrees
          }
        }
        
        else { // stem fully grown
          // the flower start to wither once it reached lifetime even without mouse stimulation
          if(this.tCount == this.lifetime) {
            this.kill();
            this.tCount = 0;
          }
        } 
        
      }
      
      // stem withers if the flower is no longer alive
      else {
        this.stem.wither();
      }
    }
    
    this.tCount ++;
  }
  
  
  /*
   * Calculate the bloom angle.
   */
  calcBloomAngle() {
    
    let dist = distance(this.centreX, this.centreY);

    if(this.isBlooming) {
      // if the mouse is too close to a blooming flower, it will feel intimidated and hide as a bud
      if(this.bloomAngle >= 36 && dist <= this.pLength) {
        this.isBlooming = false;
      }
      else if(this.bloomAngle < 180) { // flower blooming
        this.bloomAngle += bloomAngleStep;
      }
    }
    
    else { 
      // the flower is hiding as a bud
      if(this.bloomAngle > 36) {
        this.bloomAngle -= bloomAngleStep;
      }
      // once stimulated, the flower will maintain the form of a bud for at least 20 frames or until the mouse moves away
      else if(this.bloomAngle == 36) {
        this.bloomCount++;
        if(dist > this.pLength && this.bloomCount >= 20) {
          // flower starts to bloom
          this.isBlooming = true;
          this.bloomCount = 0;
        }
      }
    }
    
  }
  
  
  /*
   * Draw the petals based on blooming angle.
   */
  drawPetals() {
    push();
    translate(this.centreX,this.centreY);
    // petals pointing towards the same direction as the stem
    rotate(this.stemAngle);
    scale(this.sizeFactor);
    
    // initialise the petals of the flower
    if(this.petals.length == 0) {
      for(let i = 0; i < this.petalNum; i++) {
        this.petals.push(new Petal(this.controlPointNum, this.pWidthFactor, random(i * 100), this.colourSeed)); 
      }
    }
    
    // map the rotating angle for each petal, draw the petal
    else {
      let theta; // the rotating angle for each petal
      
      for(let i = 0; i <this.petals.length; i++) {
        theta = map(i, 0, this.petals.length, -this.bloomAngle, this.bloomAngle);
        
        push();
          rotate(theta);
          this.petals[i].flow();
          this.petals[i].draw();
        pop();
      }
    }
    pop();
  }

  
  /*
   * Draw each part of the flower.
   */
  draw() {
    this.growLogic();
    this.stem.draw();
    
    // draw the flower if its stem has fulling grown
    if(this.isAlive && this.tCount >100) {
      this.calcBloomAngle();
      this.drawPetals();
    } 
  }
  
}