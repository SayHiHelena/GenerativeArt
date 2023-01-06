const lineNum = 50; // each petal consists of 50 lines
const nSeedStep = 0.007;
const lineStep = 0.03; // noise seed increment between each petal line

class Petal {
  
  /*
   * The Petal constructor takes 4 parameters from its 
   * Flower object to create one horizontal petal.
   *
   * controlPointNum: number of control points for each petal line
   * widthFactor: the ratio of the petal's width to length
   * nSeedSetup: noise seed to create control points
   * colourSeed: noise seed to determine the petal's colour
   */
  constructor(controlPointNum, widthFactor, nSeedSetup, colourSeed) {
    this.controlPointNum = controlPointNum;
    this.pWidth = min(width, height) * widthFactor; 
    this.nSeedSetup = nSeedSetup;
    this.colourSeed = random(colourSeed-0.5, colourSeed+0.5); // each petal has a slightly different colour
    
    this.tipNSeed = random(); //a random value to control the movement of the petal tip.
    
    this.ptArray = []; // array to store all the control pts
  }
  
  
  /*
   * Change the colour of the petal,
   * increment the colour seed.
   */
  changeColour() {
    stroke(map(noise(this.colourSeed), 0, 1, 140, 255), 200, map(noise(this.colourSeed + 15) , 0, 1, 140, 255));
    this.colourSeed += nSeedStep;
  }
  
  
  /*
   * Create controlling points or 
   * increment each control point's noise seed
   * to make the petals flow.
   */
  flow() {
    
    // initiate if the controlling point array is empty
    if(this.ptArray.length == 0) {
      
      for(let line = 0; line < lineNum; line++) {
        this.ptArray[line] = [];
        
        // create new control point objects
        for (let pt = 0; pt <= this.controlPointNum; pt++) {
          // control point for the tip of the petal
          if(pt == this.controlPointNum) {
            this.ptArray[line].push(new ControlPt (pt,this.pWidth, this.tipNSeed, this.controlPointNum));
          }
          // other control points
          else{
            this.ptArray[line].push(new ControlPt (pt,this.pWidth, this.nSeedSetup, this.controlPointNum));
          }
          
          this.nSeedSetup += nSeedStep;
        }
        
        this.nSeedSetup += lineStep;
      }
    }
    
    // increment value for the noise seeds to make the petal move
    else {
      // the petal moves each frame at a smoothly changing rate
      let frameStep = noise(frameCount) * 0.2;
      for(let line = 0; line < lineNum; line++) {
        for (let pt = 0; pt <= this.controlPointNum; pt++) {
          this.ptArray[line][pt].nSeed += frameStep;
        }
      }
    }

  }
  
  
  /*
   * draw a petal
   */
  draw() {
    
    this.changeColour();
    
    noFill();
    strokeWeight(0.5);
    
    for(let line = 0; line < this.ptArray.length; line++) {

      beginShape();
      for(let pt = 0; pt < this.ptArray[line].length; pt++) {
        
        // draw the staring and ending control points
        if(pt == 0 || pt == this.ptArray[line].length - 1) {
          curveVertex(this.ptArray[line][pt].getX(), this.ptArray[line][pt].getY());
        }
        curveVertex(this.ptArray[line][pt].getX(), this.ptArray[line][pt].getY());
      }
      endShape();
    }
  }
}


/*
 * Control points that serve as curveVertex for petal lines
 */
class ControlPt {
  
  /*
   * The ControlPt constructor takes 4 parameters
   *
   * pt: the index of the pt within all the pts for the line (0 as the starting point, 3 or 4 as the petal tip)
   * pWidth: the maxinum y value for a control pt
   * nSeedSetup: see Petal constructor
   * controlPointNum: see Petal constructor
   */
  constructor(pt, pWidth, nSeedSetup, controlPointNum) {
    this.pt = pt;
    this.pWidth = pWidth;
    this.nSeed = nSeedSetup;
    this.controlPointNum = controlPointNum;
  }
  
  // get the x value of the control pt
  getX() {
    // starting point
    if(this.pt == 0) {
      return 0;
    }
    
    // petal tip
    else if(this.pt == this.controlPointNum) {
      return min(width, height);
    }
    
    else {
      return map(noise(this.pt * 0.2 * this.nSeed), 0, 1, 
                 0.7 * this.pt * (min(width, height)/this.controlPointNum), 
                 1.3 * this.pt * (min(width, height)/this.controlPointNum));
    }
  }
  
  
  // get the y value of the control pt
  getY() {
    // starting point
    if(this.pt == 0) {
      return 0;
    }
    
    // petal tip
    else if(this.pt == this.controlPointNum) {
      return map(noise(this.nSeed * 0.1), 0, 1, 
                 -this.pWidth/2, this.pWidth/2);
    }
    
    else {
      // nSeed + 10 to avoid linear movement
      return map(noise(this.pt * 0.1 * (this.nSeed + 10)), 0, 1, -this.pWidth, this.pWidth);
    }
  }
  
}