class Cubie {

  constructor(i, j, k, front, side, top) {
    this.faces_to_draw = [];
    
    if (i === max_-1)
      this.faces_to_draw.push(3)
    if (i === min_)
      this.faces_to_draw.push(0)
    
    if (j === max_-1)
      this.faces_to_draw.push(4)
    if (j === min_)
      this.faces_to_draw.push(1)
    
    if (k === max_-1)
      this.faces_to_draw.push(5)
    if (k === min_)
      this.faces_to_draw.push(2)
    
    this.slot = [i, j, k];
    this.dir = [[1, 0 ,0 ],
                [0, 1, 0],
                [0, 0, 1]];
    
    this.colors = [side, top, front]
    this.bak = [side, top, front];
  }

  get_pos() {
    let pos = system.translate_vec_backup(scalar(len, this.slot));
    pos = add(pos, system.origin)

    // let offset = add3(...this.dir);
    // offset = scalar(-len/2, offset);
    // offset = system.translate_vec(offset);
    // pos = add(pos, offset);

    return pos;
  }

  rotate(axis) {
    rotate3d(this.slot, axis, PI/2);
    rotate3d(this.dir[0], axis, PI/2);
    rotate3d(this.dir[1], axis, PI/2);
    rotate3d(this.dir[2], axis, PI/2);
  }

  is_clicked(x, y) {
    return distance(this.get_pos(), [x, y]) <= max_dist_cubie;
  }

  highlight() {
    this.colors = [color('#ffe1d2'), color('#ffe1d2'), color('#ffe1d2')];
    // this.colors = [...this.colors
    //   .map((x) => color(x.levels
    //   .map((x) => abs(x - 50))))];
  }

  unhighlight() {
    this.colors = this.bak;
  }
  
  show() {
    let center = system.translate_vec(scalar(len, this.slot));

    let offset = add3(...this.dir);
    offset = scalar(-len/2, offset);
    offset = system.translate_vec(offset);

    let pos = add(center, offset);
    pos = add(pos, system.origin);

    let mult = [1, -1];

    for (let i = 0; i < 2; i++) {
      let mods = this.dir.map((elmt) => system.translate_vec(scalar(len * mult[i], elmt)));
      let mod_ij = add(mods[0], mods[1]);
      let mod_ik = add(mods[0], mods[2]);
      let mod_jk = add(mods[1], mods[2]);

      if (this.faces_to_draw.includes(0 + (3 * i))) {
        fill(this.colors[0])
        beginShape();
        vertex(...pos);
        vertex(...add(pos, mods[2]))
        vertex(...add(pos, mod_jk))
        vertex(...add(pos, mods[1]))
        endShape(CLOSE);
      }
      
      if (this.faces_to_draw.includes(1 + (3 * i))) {
        fill(this.colors[1])
        beginShape();
        vertex(...pos);
        vertex(...add(pos, mods[2]))
        vertex(...add(pos, mod_ik))
        vertex(...add(pos, mods[0]))
        endShape(CLOSE);
      }
      
      if (this.faces_to_draw.includes(2 + (3 * i))) {
        fill(this.colors[2])
        beginShape();
        vertex(...pos);
        vertex(...add(pos, mods[0]))
        vertex(...add(pos, mod_ij))
        vertex(...add(pos, mods[1]))
        endShape(CLOSE);
      }

      pos = add(pos, add3(...mods));
    }
  }
  
}