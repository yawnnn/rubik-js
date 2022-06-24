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
      
      this.colors = [side, top, front]
    }
    
    show() {
      let pos = system.translate_vec(dot(len, this.slot));
      let l = len;

      for (let i = 0; i < 2; i++) {
        let mods = [dot(l, system.get_uv(0)), dot(l, system.get_uv(1)), dot(l, system.get_uv(2))];
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
        l = -len;
      }
    }
  }