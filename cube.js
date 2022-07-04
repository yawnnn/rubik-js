class Cube {
  
  constructor() {
    let front, side, top;
    
    this.clicked_ff;  // Front-facing
    this.cubies = [];

    this.mouse_twist = {
      clicking: false,
      twisted: false,
      start_x: 0,
      start_y: 0,
    
      set: function(x, y) {
        this.clicking = true;
        this.start_x = x;
        this.start_y = y;
      },
    
      reset: function() {
        this.clicking = false;
        this.twisted = false;
        return false;
      },
    
      done: function() {
        this.twisted = true;
      },
    
      get_drag: function(x, y) {
        return [this.start_x - x, this.start_y - y];
      },
    
      is_set: function() {
        return this.clicking;
      },
    
      is_done: function() {
        return this.twisted;
      },
    
      mag: function(x, y) {
        return mag2d(this.get_drag(x, y));
      },
    };
    
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

  clicked(x, y) {
    let clicked = [];

    for (let cubie of this.cubies) {
      if (cubie.is_clicked(x, y))
        clicked.push(cubie);
    }

    this.clicked_ff = clicked[0];

    for (let cubie of clicked) {
      if (this.clicked_ff.get_pos()[2] < cubie.get_pos()[2])
        this.clicked_ff = cubie;
    }

    this.clicked_ff.highlight();
  }

  released() {
    this.clicked_ff.unhighlight();
  }

  twist_by_mouse(x, y) {
    let up = [0, 1];
    let down = [0, -1];
    let left = [1, 0];
    let right = [-1, 0];

    if (angle_between(this.mouse_twist.get_drag(x, y), up) < PI/4) {
      console.log("UP")
    }

    if (angle_between(this.mouse_twist.get_drag(x, y), down) < PI/4) {
      console.log("DOWN")
    }

    if (angle_between(this.mouse_twist.get_drag(x, y), left) < PI/4) {
      console.log("LEFT")
    }

    if (angle_between(this.mouse_twist.get_drag(x, y), right) < PI/4) {
      console.log("RIGHT")
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