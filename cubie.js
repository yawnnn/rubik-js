class Cubie {
  
  constructor(i, j, k, front, side, top) {
    if (i === -min_ && j === -min_ && k === -min_)
      this.highlight = true;
    else 
      this.highlight = false;

    this.faces_to_draw = [];
    
    if (i === max_-1)
      this.faces_to_draw.push(0)
    if (i === -min_)
      this.faces_to_draw.push(3)
    
    if (j === max_-1)
      this.faces_to_draw.push(1)
    if (j === -min_)
      this.faces_to_draw.push(4)
    
    if (k === max_-1)
      this.faces_to_draw.push(2)
    if (k === -min_)
      this.faces_to_draw.push(5)
    
    this.pos = [i * l, j * l, k * l];
    this.n = [[hl, 0, 0],
              [0, hl, 0],
              [0, 0, hl]];
    
    this.colors = [side, top, front]
  }
  
  _rotate2d(x, y, angle) {
    let x2 = x * cos(angle) - y * sin(angle);
    let y2 = x * sin(angle) + y * cos(angle);
    
    return [x2, y2];
  }
  
  rotate(angle, axis) {
    let i1 = (axis + 1) % 3;
    let i2 = (axis + 2) % 3;
    
    let r = this._rotate2d(this.pos[i1], this.pos[i2], angle);
    this.pos[i1] = r[0];
    this.pos[i2] = r[1];
    
    for (let i = 0; i < 3; i++) {
      r = this._rotate2d(this.n[i][i1], this.n[i][i2], angle);
      this.n[i][i1] = r[0];
      this.n[i][i2] = r[1];
    }
  }
  
  invert(v) {
    return [v[0] * -1, v[1] * -1, v[2] * -1];
  }
  
  add_vec(v1, v2) {
    return [v1[0] + v2[0], v1[1] + v2[1], v1[2] + v2[2]];
  }
  
  value_in_vec(v, val) {
    for (let i = 0; i < v.length; i++) {
      if (v[i] === val)
        return true;
    }
    
    return false;
  }
  
  show() {
    let pos, i1, i2, n1, n2;

    // if (this.highlight === true) {
    //   push()
    //   stroke(255, 0, 0)
    //   strokeWeight(4)
    //   pos = this.add_vec(this.pos, this.invert(this.n[0]))
    //   pos = this.add_vec(pos, this.invert(this.n[1]))
    //   pos = this.add_vec(pos, this.invert(this.n[2]))
    //   point(pos[0], pos[1], pos[2])
    //   pop()
    // } else {
      
    // }

    for (let j = 0; j < 6; j++) {
      if (!this.value_in_vec(this.faces_to_draw, j)) 
        continue;
        
      if (j < 3)
        pos = this.add_vec(this.pos, this.n[j % 3]);
      if (j >= 3)
        pos = this.add_vec(this.pos, this.invert(this.n[j % 3]));
      i1 = ((j % 3) + 1) % 3;
      i2 = ((j % 3) + 2) % 3;
      n1 = this.n[i1];
      n2 = this.n[i2];
      
      fill(this.colors[j % 3]);
      beginShape();
      vertex(pos[0] + n1[0] + n2[0], pos[1] + n1[1] + n2[1], pos[2] + n1[2] + n2[2]);
      vertex(pos[0] - n1[0] + n2[0], pos[1] - n1[1] + n2[1], pos[2] - n1[2] + n2[2]);
      vertex(pos[0] - n1[0] - n2[0], pos[1] - n1[1] - n2[1], pos[2] - n1[2] - n2[2]);
      vertex(pos[0] + n1[0] - n2[0], pos[1] + n1[1] - n2[1], pos[2] + n1[2] - n2[2]);
      endShape(CLOSE);
    }
    
    
  }
}