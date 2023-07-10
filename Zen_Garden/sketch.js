/* 
 * Zen Garden version 1.0
 * Author: Helena Cui
 * Date: April 2023
 * 
 * Drag on the screen to create flowers. Each drag will produce flowers of the similar colour.
 * Press space to create a ripple and blow off all the flowers and leaves.
 */


// initialise variables to handle messages
let touchID;
let mode;

// full colour palette and each touch's flower palette
let colPalette = [];
let flowerPalett = [];

let flowers = [];
let leaves = [];

let rippleX;
let rippleY;
let rippleR;

/* 
// Here I've blocked the audio components due to copyright reason.

// sounds
let bgm;
let rippleSfx;
let touchSfx = [];

function preload() {
  bgm = loadSound('assets/background.mp3');
  rippleSfx = loadSound('assets/ripple.mp3');
  // load the whole series of touch sfx
  for(let i = 1; i <= 7; i++) {
    touchSfx.push(loadSound('assets/touch' + i + '.wav'));
  }
}

*/

function setup() {
  createCanvas(windowWidth, windowHeight);

  noStroke();
  angleMode(DEGREES);
  
  // bgm.loop();
  
  // initialise colour palette
  colPalette = [
    ['rgba( 65, 143, 191,0.3)', 'rgba( 108, 175, 217, 0.3)', 'rgba(119, 189, 217, 0.3)','rgba(155, 218, 242, 0.3)'], // light blue palette
    ['rgba(18,100,130,0.3)', 'rgba(5,67,111, 0.3)', 'rgba(137,171,218, 0.3)','rgba(53, 78, 107, 0.3)'], // blue palette
    ['rgba(237,109,70,0.3)', 'rgba(210,58,24, 0.3)', 'rgba(171,29,33, 0.3)','rgba(193,44,31, 0.3)'], // red palette
    ['rgba(176,69,82,0.3)', 'rgba(200,150,169, 0.3)', 'rgba(220,107,130, 0.3)','rgba(184,26,53, 0.3)'], // pink palette
    ['rgba(219, 196, 255,0.3)', 'rgba(180, 160, 230, 0.3)', 'rgba(242, 200, 242, 0.4)','rgba(59, 2, 115, 0.3)'], // purple palette
    ['rgba(250, 173, 20,0.3)', 'rgba(251, 185, 141, 0.3)', 'rgba(240,100,70, 0.3)','rgba(220, 145, 60, 0.3)'] // orange palette
  ];
  flowerPalette = random(colPalette);
}

function draw() { 
  background(244, 240, 230, 100);

  // use touchID to control colour palette
  // make sure each continuous touch will generate flowers with similar colour
  let colPalIdx = touchID % colPalette.length;
  flowerPalette = colPalette[colPalIdx];

  // generate flowers and leaves
  if (mode == "flower") { 
    // 1/5 chance of creating a new flower
    let createFlower = random() < 0.2? true : false;
    if(createFlower) {
      flowers.push(new Flower( mouseX, mouseY, flowerPalette, min(width, height)/15));
      // a random bell sound will be triggered when a flower is created
      // random(touchSfx).play(); 
    }
    else { // create a new leaf
      leaves.push(new Leaf(mouseX, mouseY, min(width, height)/20));
    }

    mode = "";
  }
  
  // create a ripple to blow away all the objects
  if(mode == "water") {
    // blown away sound effect
    // rippleSfx.play();
    
    // store the data about the ripple
    rippleX = mouseX;
    rippleY = mouseY;
    rippleR = min(width, height) / 15;

    // blow all the leaves and flowers
    for(let leaf of leaves) 
      leaf.blow(rippleX, rippleY, rippleR);
    for(let flower of flowers) 
      flower.blow(rippleX, rippleY, rippleR);

    mode = "";
  }
  
  // limit the maximum number of flowers can be drawn to avoid lagging
  while (flowers.length > 30){
    flowers.shift();
  }
  while (leaves.length > 150){
    leaves.shift();
  }
  
  //draw all the leaves
  for (let leaf of leaves){
    leaf.display();
  }
  //draw all the flowers
  for (let flower of flowers){
    flower.display();
  }
}

// events for mouse testing
function mousePressed() {
  touchID = floor(random(500));
  mode = "flower";
}

function mouseDragged() {
  mode = "flower";
}

// trigger ripple
function keyPressed() {
  mode = "water";
}