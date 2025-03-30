function setup() {
  createCanvas(min(windowWidth, windowHeight), min(windowWidth, windowHeight));
  angleMode(DEGREES);
  rectMode(CENTER);
  noStroke();
  fill(0);
}

function draw() {
  background(255, 240, 220);
  
  let rectNum = 9;
  let size = width / (rectNum + 1);
  
  for(let x = 0; x < rectNum; x++) {
    for(let y = 0; y < rectNum; y++){
      let xPos = map(x, 0, rectNum-1, size, width - size);
      let yPos = map(y, 0 , rectNum-1, size, height - size);
      
      // Determine distance from center to create an animation offset
      let distFromCenter = dist(xPos, yPos, width / 2, height / 2);
      let timeOffset = distFromCenter; 
      let animFactor = sin(millis() * 0.05 + timeOffset);
      
      // Map the animation factor to determine corner rounding size
      let roundSize = map(abs(animFactor), 0, 1, 0, size / 2);
      
      let from = color("#50366F");
      let mid = color("#CD3C73");
      let to = color("#F08C6E");
      
      let colVal;
      if(animFactor < 0){
        // Transition from purple to pink
        let step = map(animFactor, -1, 0, 0, 1);
        colVal = lerpColor(from, mid, step);
      }
      else {
        // Transition from pink to orange
        colVal = lerpColor(mid, to, animFactor);
      }
      
      fill(colVal);
      square(xPos, yPos, size-5, roundSize);
    }
  }
}

function windowResized() {
  resizeCanvas(min(windowWidth, windowHeight), min(windowWidth, windowHeight));
}