class Leaf {
    constructor(x, y, angle, size, color) {
      this.x = x;
      this.y = y;
      this.angle = angle;
      this.size = size;
      this.color = color;
      this.shapeType = "cordate"; // 'cordate', 'obovate', 'reniform'
    }
  
    display() {
        push();
        translate(this.x, this.y);
        rotate(radians(this.angle));
    
        fill(this.color);
        noStroke();
    
        // Draw leaf shape
        beginShape();
        for (let t = 0; t <= 360; t += 1) {
          let r = this.getRadius(t);  // Get the radius based on the angle and shape type
          let x = r * cos(t);
          let y = r * sin(t);
          vertex(x, y);
          console.log(x, y)
        }
        endShape(CLOSE);
    
        pop();
      }
    
      // Function to calculate radius for different leaf shapes
      getRadius(t) {
        let theta = t;
        let r = this.size;
    
        switch (this.shapeType) {
          case 'cordate': // Heart-shaped leaf
            return r * (1 - sin(theta)) * cos(theta) ;
            
          case 'obovate': // Egg-shaped leaf
            return r * (1 + 0.4 * cos(2 * theta));
          case 'reniform': // Kidney-shaped leaf
            return r * (1 - sin(theta)) * (1.5 + cos(theta));
          default:
            return r * cos(theta);  // Default to a circle if the shape is unknown
        }
      }
  }