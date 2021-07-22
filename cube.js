class Cube {
  
  constructor(dim) {
    let front, side, top;
    
    this.movement = {
      tomove: [],
      frames_left: 0,
      axis: 0,
      dir: 0,
    }
    
    this.cubies = [];
    
    for (let i = -min_; i < max_; i++) {
      for (let j = -min_; j < max_; j++) {
        for (let k = -min_; k < max_; k++) {
          if (i != -min_ && i != max_-1 && j != -min_ && j != max_-1 && k != -min_ && k != max_-1)
            continue;
          if (i == -min_)
          side = ORANGE;
          if (i == max_ - 1)
            side = RED;

          if (j == -min_)
            top = WHITE;
          if (j == max_ - 1)
            top = YELLOW;

          if (k == -min_)
            front = BLUE;
          if (k == max_ - 1)
            front = GREEN;
          
          this.cubies.push(new Cubie(i, j , k, front, side, top));
        }
      }
    }
  }

  animate(axis, dir) {
    this.movement.tomove = [];
    this.movement.frames_left = aframes;
    this.movement.axis = axis;
    this.movement.dir = dir;
  }
  
  update() {
    if (this.movement.frames_left > 0) {
      for (let i = 0; i < this.movement.tomove.length; i++) {
        this.movement.tomove[i].rotate(PI/(2 * aframes) * this.movement.dir, this.movement.axis);
      }
      this.movement.frames_left--;
    }
  }
  
  rotate(axis, dir, depth) {
    if (this.movement.frames_left <= 0) {
      this.animate(axis, dir);
      
      for (let i = 0; i < this.cubies.length; i++) {
        if (abs(this.cubies[i].pos[axis] - l * depth) < 0.01) {
          this.movement.tomove.push(this.cubies[i]);
        }
      }
    }
  }
  
  show() {
    for (let i = 0; i < this.cubies.length; i++) {
      this.cubies[i].show();
    }
  }
  
  touched(x, y) {
    
  }
  
}
