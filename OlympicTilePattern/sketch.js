let colourPalettes = [
  ['#102D69', '#2298DF', '#2298DF', '#F5C3DD', '#F5C3DD', '#F5C3DD', '#FFFFFF', '#D5C584'],
  ["#003854", "#1AB8B0", "#FAA8CC", "#FFFFFF"],
  ['#331261', '#7C85C1', '#FAA8CC', '#D6C278', '#FFFFFF'],
  // ['#570047', '#FAA8CC', '#FF5758','#F990A8'],
  // ['#CADCFC', '#8AB6F9', '#00246B'],
  // ['#CEE6F2', '#E3867D', '#962E2A'],
  // ['#DDDBDE', '#656E77', '#3B373B']
];
let gridSize = 80;
let gridNum = 5;
let selectedPal;
let circles = [];
let tiles = [];

class Tile {
  constructor(x, y, colPal) {
    this.x = x;
    this.y = y;
    this.colPal = colPal;
    this.bgCol = random(this.colPal);
    this.patternCol = random(this.colPal);
    this.size = gridSize;
    this.angle = random([0, HALF_PI, PI, HALF_PI * 3]);
    this.pattern = random(); // assign a random value to decide pattern
  }

  display() {
    push();
    translate(this.x, this.y);
    rotate(this.angle);
    fill(this.bgCol);
    square(0, 0, this.size);
    fill(this.patternCol);

    // double scale pattern
    // if (this.pattern >0.8){
    //   scale(2)
    //   translate(-this.size/4, -this.size/4)
    // }

    if (this.pattern > 0.8) {
      // semi circle
      arc(0, -this.size / 2, this.size, this.size, 0, PI);
    } else if (this.pattern > 0.03) {
      // quater
      arc(
        -this.size / 2,
        -this.size / 2,
        this.size * 2,
        this.size * 2,
        0,
        HALF_PI
      );
    }
    pop();
  }
}

function setup() {
  createCanvas(400, 400);
  selectedPal = random(colourPalettes); // select the colour palette
  background(255);
  noStroke();
  rectMode(CENTER);

  let seed = floor(random() * 1000);
  randomSeed(seed);

  for (let x = 0; x < gridNum; x++) {
    tiles[x] = [];
    let xPos = map(x, 0, gridNum, 0 + gridSize / 2, width + gridSize / 2);
    for (let y = 0; y < gridNum; y++) {
      let yPos = map(y, 0, gridNum, 0 + gridSize / 2, height + gridSize / 2);
      tiles[x].push(new Tile(xPos, yPos, selectedPal));
    }
  }
}

function draw() {
  for (let col of tiles) {
    for (let tile of col) {
      tile.display();
    }
  }
}

// click on a tile to rotate the tile
function mouseClicked() {
  if (
    mouseX >= 0 &&
    mouseX <= gridSize * gridNum &&
    mouseY >= 0 &&
    mouseY <= gridSize * gridNum
  ) {
    let selectedX = floor(mouseX / gridSize);
    let selectedY = floor(mouseY / gridSize);
    tiles[selectedX][selectedY].angle += HALF_PI;
  }
}

// hover over a tile and tap space bar to regenerate that specific tile
function keyPressed() {
  // press any key to change the tile's pattern
  if (
    mouseX >= 0 &&
    mouseX <= gridSize * gridNum &&
    mouseY >= 0 &&
    mouseY <= gridSize * gridNum
  ) {
    let selectedX = floor(mouseX / gridSize);
    let selectedY = floor(mouseY / gridSize);
    let selectedTile = tiles[selectedX][selectedY];
    selectedTile.pattern = random();
    selectedTile.bgCol = random(selectedTile.colPal);
    selectedTile.patternCol = random(selectedTile.colPal);
  }
}
