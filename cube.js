class Cube {
  
    constructor() {
      let front, side, top;
      
      this.cubies = [];
      
      for (let i = min_; i < max_; i++) {
        for (let j = min_; j < max_; j++) {
          for (let k = min_; k < max_; k++) {
            // if (i == 1 && j == 1 && k == 1)
            //   this.cubies.push(new Cubie(i, j, k, BLACK, BLACK, BLACK, this));
  
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
    
    show() {
      for (let i = 0; i < this.cubies.length; i++) {
        this.cubies[i].show();
      }
    }
    
  }
  