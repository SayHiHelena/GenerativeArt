class Leaf {
  constructor(posX, posY, maxSize) {
    // leaves are created as if they are scattered around the mouse
    this.posX = posX + random(-maxSize, maxSize);
    this.posY = posY + random(-maxSize, maxSize);
    // random green colour
    this.col = color(random(150, 160), random(190, 200), random(160, 180), random(20));
    this.maxR = random(maxSize, maxSize * 2);
    // each leaf is consist of 20 circles to mimic the look of ink spot
    this.noiseSteps = [];
    for(let i = 0; i < 20; i++) {
      this.noiseSteps.push(random(100));
    }

    this.ripple;
    this.isBlown = false;
  }

  display() {
    noStroke();
    fill(this.col);

    // if the leaf has been blown, change its X and Y based on the ripple info
    if(this.isBlown) {
        this.disToRipple = dist(this.posX, this.posY, this.ripple.rippleX, this.ripple.rippleY);
      // only blow the leaf if it is within the ripple's effective range
      if(this.disToRipple < this.ripple.rippleR) {
        // use vector to decide moving direction
        let blowDirection = createVector(this.posX - this.ripple.rippleX, this.posY - this.ripple.rippleY).normalize();
        // the closer it is to the centre of the ripple, the faster it moves
        let vol = blowDirection.mult(this.ripple.rippleR - this.disToRipple);
        this.posX += vol.x;
        this.posY += vol.y;
      }
      // increment the ripple's effective range
      this.ripple.rippleR += min(width, height) / 100;
    }
    
    
    for (let i = 0; i < this.noiseSteps.length; i++) {
    let xx = this.posX + lerp(-this.maxR/2, this.maxR/2, noise(this.noiseSteps[i] + 10));//r * cos(angle);
    let yy = this.posY + lerp(-this.maxR/2, this.maxR/2, noise(this.noiseSteps[i])); //r * sin(angle);
    let distToLeafCentre = dist(xx, yy, this.posX, this.posY);

    if(distToLeafCentre< this.maxR / 2) {
      let r = map(distToLeafCentre, 0, this.maxR / 2, this.maxR/1.2, 3)
      circle(xx, yy, r);
    }
    
      
    this.noiseSteps[i] += 0.003;
    }
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
  