class Cube {
  
    constructor() {
      let front, side, top;
      
      this.cubies = [];
      
      for (let i = min_; i < max_; i++) {
        for (let j = min_; j < max_; j++) {
          for (let k = min_; k < max_; k++) {
            if (i == 0 && j == 0 && k == 0)
              continue;
  
            if (i == min_)
              side = ORANGE;
            else if (i == max_ - 1)
              side = RED;
  
            if (j == min_)
              top = WHITE;
            else if (j == max_ - 1)
              top = YELLOW;
  
            if (k == min_)
              front = BLUE;
            else if (k == max_ - 1)
              front = GREEN;
            
            this.cubies.push(new Cubie(i, j , k, front, side, top));
          }
        }
      }
    }

    twist(axis, side, dir) {
      for (let i = 0; i < this.cubies.length; i++) {
        if (abs(this.cubies[i].slot[axis] - side) <= 0.01) {
          this.cubies[i].rotate(axis);
        }
      }
    }
    
    show() {
      for (let i = 0; i < this.cubies.length; i++) {
        this.cubies[i].show();
      }
    }
    
  }
  