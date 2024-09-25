// function setup() {
//   createCanvas(400, 400);
//   let numPoints = 10;

//   // Define control points for the Bezier curve
//   let x1 = 50, y1 = 300;
//   let x2 = 150, y2 = 100;
//   let x3 = 250, y3 = 300;
//   let x4 = 350, y4 = 100;

//   // Draw the Bezier curve
//   noFill();
//   stroke(0);
//   bezier(x1, y1, x2, y2, x3, y3, x4, y4);
  
//   // Get and draw evenly spaced points on the curve
//   for (let i = 0; i <= numPoints; i++) {
//     let t = i / numPoints;
    
//     // Get the x and y positions at parameter t
//     let x = bezierPoint(x1, x2, x3, x4, t);
//     let y = bezierPoint(y1, y2, y3, y4, t);
    
//     // Draw a circle at the point
//     fill(255, 0, 0);
//     ellipse(x, y, 5, 5);
//   }
// }

let leaf

let winWidth;
let winHeight;

function setup() {
  createCanvas(windowWidth, windowHeight);
  rectMode(CENTER);
  angleMode(DEGREES);
  noLoop();

  winWidth = random(200, 400);
  winHeight = random(500, height/3);
  // Create and display a leaf
  leaf = new Leaf(400, 400, 45, 100, color(50, 180, 170));
  
}

function draw() {
  // background('#EECEC1');

  
  // Draw the brick texture on the wall
  // drawBrickWall(0, 0, width, height);

  // drawWindowFrame(width/2, height/2, winWidth, winHeight, random(width/50, width/25), '#B1827A');

  // // Draw a plant at the bottom left corner
  // drawPlant(width/2 - winWidth/2 + 50, height/2 + winHeight/2, 50);
console.log(leaf);
  leaf.display();
}

// Function to draw brick texture
function drawBrickWall(x, y, w, h) {
  let brickWidth = 50;
  let brickHeight = 20;
  let offset = 5;

  stroke(200, 150, 100); // Brick line color
  noFill();
  
  for (let i = y; i < h; i += brickHeight + offset) {
    let isOffsetRow = (i / (brickHeight + offset)) % 2 == 1; // Alternate rows
    for (let j = x; j < w; j += brickWidth) {
      let xPos = j + (isOffsetRow ? brickWidth / 2 : 0); // Shift every other row
      if(random() > 0.8)
      rect(xPos, i, brickWidth, brickHeight);
    }
  }
}

function drawWindowFrame(x, y, w, h, thickness, frameCol){
  push();
  
  noStroke();
  fill('#5F494E');
  rect(x, y, w, h);
  arc(x , y- h/2, w, h/2,  -180, 0);


  noFill();
  stroke(frameCol);
  strokeWeight(thickness);
  //sash bar
  line(x, y - h * 3/4, x, y + h/2); //vertical
  line(x - w/2, y - h/8, x + w/2, y- h/8); //horizontal

  //frame
  line(x - w/2, y - h/2, x - w/2, y + h/2) //left
  line(x - w/2, y + h/2, x + w/2, y + h/2) // bottom
  line(x + w/2, y - h/2, x + w/2, y + h/2) // right
  arc(x , y- h/2, w, h/2,  -180, 0);

  pop();
}

function drawPlant(x, y, height) {
  push();
  stroke(50, 160, 180);
  strokeWeight(4);
  
  // Draw the stem
  line(x, y, x, y - height);
  
  // Draw leaves
  for (let i = 0; i < 5; i++) {
    let leafLength = 20;
    let offset = i * 10;
    
    // Left leaf
    line(x, y - offset, x - leafLength, y - offset - leafLength);
    
    // Right leaf
    line(x, y - offset, x + leafLength, y - offset - leafLength);
  }

  pop();
}


function windowResized() {
  createCanvas(windowWidth, windowHeight);
  draw();
}