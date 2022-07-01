class Cubie {

    constructor(i, j, k, front, side, top) {
      this.faces_to_draw = [];
      this.first = true;
      
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

    rotate(axis) {
      rotate3d(this.slot, axis, PI/2);
      rotate3d(this.dir[0], axis, PI/2);
      rotate3d(this.dir[1], axis, PI/2);
      rotate3d(this.dir[2], axis, PI/2);
    }

    is_inside(x, y) {
      let pos = system.translate_vec(dot(len, this.slot));
      return Math.sqrt(Math.pow((x - pos[0]), 2), Math.pow((y - pos[1]), 2)) <= max_dist_cubie;
    }

    highlight() {
      this.colors = [color('#0'), color('#0'), color('#0')];
    }

    unhighlight() {
      this.colors = [...this.bak];
    }
    
    show() {
      let center = system.translate_vec(dot(len, this.slot));

      let offset = add3(...this.dir);
      offset = dot(-len/2, offset);
      offset = system.translate_vec(offset);

      let pos = add(center, offset);
      pos = add(pos, system.origin);

      let mult = [1, -1];

      for (let i = 0; i < 2; i++) {
        let mods = this.dir.map((elmt) => system.translate_vec(dot(len * mult[i], elmt)));
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