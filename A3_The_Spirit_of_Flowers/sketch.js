/* USER GUIDE
 *
 * Oh hi there my little firefly!
 * Welcome to the firefly garden.
 * 
 * Click to awake a flower.
 * |´∀｀) Hover over a blooming flower to see it get shy.
 * Don't worry, it will bloom again when you move further.
 * Click a flower and it will wither.
 * Of course, you can choose not to kill it. When the time come, it will accept its fate.
 *
 * Best experienced with headphone.
 *
 * Please enjoy.
 */

let FPS;
let flowerArray = [];
let fireflyArray = [];

let bgm;
let newFlowerSfx;
let disappearSfx;

function preload(){
  
  soundFormats('mp3');
  
  // "harp heaven" by X3nus
  // https://freesound.org/people/X3nus/sounds/476782/
  bgm = loadSound("harp_heaven.mp3");
  
  // sound effect for creating new flower
  // https://mixkit.co/free-sound-effects/magic/
  newFlowerSfx = loadSound('newFlower.mp3');
  
  // sound effect for flower disappearing
  // https://www.zapsplat.com/sound-effect-category/fairy/
  disappearSfx = loadSound('glow.mp3');

}


function setup() {
  
  createCanvas(windowWidth, windowHeight);
  angleMode(DEGREES);
  rectMode(CENTER);
  
  noCursor();
  
  FPS = 60;
  frameRate(FPS);
  
  bgm.loop();
  
  print("Welcome to the firefly garden!");
}


/*
 * Create new fireflies when a flower withers,
 * remove any dead flower, and
 * draw the flowers, fireflies, and the cursor.
 */
function draw() {

  background(12,20,69);

  let deadFlower = -1;
  
  for(let i = 0; i < flowerArray.length; i++) {
    // draw flower
    flowerArray[i].draw();
    
    //create 3-6 fireflies when a flower withers
    if(!flowerArray[i].isAlive && flowerArray[i].tCount == 1) {
      let fireflyNum = floor(random(3, 7));
      for(let j = 0; j < fireflyNum; j++) {
          fireflyArray.push(new Firefly(flowerArray[i].centreX, flowerArray[i].centreY));
        }
    }

    // if a flower is fully withered, it's regarded as dead
    if(!flowerArray[i].isAlive && flowerArray[i].tCount >=100) {
      // record the index of the flower to be removed
      deadFlower = i; 
    }
  } 
  
  // remove any marked dead flower
  if(deadFlower != -1) {
    flowerArray.splice(deadFlower, 1);
  } 
  
  // draw firefly
  for(let firefly of fireflyArray){
    firefly.draw();
  }

  // draw cursor
  noStroke();
  fill(255,243,161,100);
  // halo
  ellipse(mouseX, mouseY,  sin(frameCount) * 20);
  // firefly
  fill(255,243,161,180);
  ellipse(mouseX, mouseY, 8);
}


/*
 * Click to grow a flower or kill a flower.
 */
function mouseClicked() {
  let killFlowerNum = 0;
  
  // map mouseX to a panning degree
  // between -1.0 (left) and 1.0 (right)
  // modified from: 
  // https://p5js.org/reference/#/p5.SoundFile/pan
  let panning = map(mouseX, 0, width,-1.0, 1.0);
  newFlowerSfx.pan(panning);
  disappearSfx.pan(panning);
  
  
  // if click on a fully grown flower, the flower withers
  // If two flowers overlap, the latest one withers.
  for(let i = flowerArray.length - 1; i >= 0; i--) {
    
    // calc distance bwetween the mouse and the centre of the flower
    let dist = distance(flowerArray[i].centreX, flowerArray[i].centreY);
    
    // clicking a fully grown flower to make it wither
    if(dist <= flowerArray[i].pLength) {
      // Make sure only one flower withers at one click.
      if(flowerArray[i].isAlive && flowerArray[i].tCount >100 && killFlowerNum == 0) {
        
        flowerArray[i].kill();
        flowerArray[i].tCount = 0; // restart the time count
        killFlowerNum++;
        
      }  
    }
  }
  
  // if no flower has been killed, create a new Flower object
  if(killFlowerNum == 0) {
    flowerArray.push(new Flower(mouseX, mouseY));
    newFlowerSfx.play();
  }   

}


/*
 * Calculate the distance between current mouse position
 * and the target's position.
 */
function distance(targetX, targetY) {
  return Math.sqrt(Math.pow(mouseX - targetX, 2) + Math.pow(mouseY - targetY, 2));
}


/*
 * Resize the canvas according to the window size
 */
function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}