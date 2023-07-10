class Petal {
  constructor(posX, posY, growSpeed, flowerID, maxSize, sidePos, tipPos, petalNum, petalCount) {
    this.posX = posX;
    this.posY = posY;
    this.step = 0.2;
    this.growSpeed = growSpeed;
    this.flowerID = flowerID;

    this.sideLen = maxSize * sidePos;
    this.tipLen = maxSize * tipPos;
    this.maxWid = 3 * maxSize/petalNum;

    this.nStep = petalCount;
    this.petalCount = petalCount;
    this.petalNum = petalNum;

    this.stamenSize = random(0.5, 1.5);
  }

  display() {
    push();
    translate(this.posX, this.posY);
    
    // flowers will grow gradually
    scale(this.step);
    
    // petal rotate
    let petalAngle = map(this.petalCount, 0, this.petalNum, 0, 360);
    rotate(petalAngle);
    // subtle moving effect
    rotate(360/this.petalNum * noise(this.nStep + this.flowerID));

    // draw petal
    this.drawPetal();
    
    // draw stamen after all petals are drawn
    if(this.petalCount == this.petalNum - 1)
      this.drawStamen();
    pop();

    // update noise steps
    this.nStep += 0.004;
    this.flowerID += 0.005;
    if (this.step < 1) {
      this.step += this.growSpeed;
    }
  }

  drawPetal() {
    beginShape();
    curveVertex(0, 0);
    curveVertex(0, 0);
    // use noise step to make the petals move slightly, making it feel dynamic
    curveVertex(this.sideLen, -this.maxWid * lerp(0.5, 0.8, noise(this.nStep)));
    curveVertex(this.tipLen, lerp(-this.maxWid, this.maxWid, noise(this.flowerID)));
    curveVertex(this.sideLen, this.maxWid * lerp(0.5, 0.8, noise(this.nStep)));
    curveVertex(0, 0);
    curveVertex(0, 0);
    endShape();
  }

  drawStamen() {
    // restore fill colour and rotation
    push();
    fill(255, 195,0);
    for (let i = 0; i < this.petalNum; i++) {
      rotate(30 * i);
      beginShape();
      vertex(0, 0);
      vertex(0, 0);
      curveVertex(this.tipLen / 5, 0); 
      curveVertex(this.tipLen / 10, this.stamenSize);
      vertex(0,0);
      vertex(0, 0);
      endShape();
    }
    pop();
  }
}


class Flower {
  constructor(posX, posY, flowerPalette, maxSize) {
    this.posX = posX + random(-maxSize, maxSize);
    this.posY = posY + random(-maxSize, maxSize);
    // a random colour from the set colour palette
    this.col = color(random(flowerPalette));
    this.size = random(maxSize / 2, maxSize);
    this.petalLen = random(maxSize / 2, maxSize);
    this.growSpeed = random(0.001, 0.05);
    this.petalNum = floor(random(7, 13)); // each flower will have 7 - 12 petals
    
    // create and store petals
    this.petals = []; 
    this.flowerID = random(500);
    let sidePos = random(0.1, 0.5);
    let tipPos = random(0.7, 1);
    for (let i = 0; i < this.petalNum; i++) {
      this.petals.push(new Petal(this.posX, this.posY, this.growSpeed, this.flowerID, this.size, sidePos, tipPos, this.petalNum, i));
    }
    
    this.isBlown = false;
    this.ripple;
    this.disToRipple;
  }

  display() {
    push();
    fill(this.col);

    // if the petal has been blown, change its X and Y based on the ripple info
    for(let petal of this.petals) {
      if(this.isBlown) {
          this.disToRipple = dist(petal.posX, petal.posY, this.ripple.rippleX, this.ripple.rippleY);
        // only blow the petal if it is within the ripple's effective range
        if(this.disToRipple < this.ripple.rippleR) {
          let blowDirection = createVector(petal.posX - this.ripple.rippleX, petal.posY - this.ripple.rippleY).normalize();
          // the closer it is to the centre of the ripple, the faster it moves
          let vol = blowDirection.mult(this.ripple.rippleR - this.disToRipple);
          petal.posX += vol.x + random(min(width, height) / 100);
          petal.posY += vol.y + random(min(width, height) / 100);
        }
      }
      petal.display();
    }

    // increment the ripple's effective range
    if(this.isBlown)
      this.ripple.rippleR += min(width, height) / 100;

    pop();
  }
  
  // record the ripple's X, Y, initial size
  blow(rippleX, rippleY, rippleR) {
    this.isBlown = true;
    this.ripple = {
      rippleX: rippleX,
      rippleY: rippleY,
      rippleR: rippleR
    };  
  }
}