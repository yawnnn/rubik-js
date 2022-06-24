class Coordinate_System {

    constructor() {
        // this.x = x;
        // this.y = y;
        // this.z = z;
        
        this.origin = [0, 0, 0];
        this.ui = [1, 0, 0];
        this.uj = [0, 1, 0];
        this.uk = [0, 0, 1];
        this.base = [this.ui, this.uj, this.uk];
    }

    reset() {
        //this.origin = [this.x, this.y, this.z];
        this.ui = [1, 0, 0];
        this.uj = [0, 1, 0];
        this.uk = [0, 0, 1];
        this.base = [this.ui, this.uj, this.uk];
    }

    rotate(axis, angle) {
        // rotate3d(this.origin, axis, angle);
        rotate3d(this.ui, axis, angle);
        rotate3d(this.uj, axis, angle);
        rotate3d(this.uk, axis, angle);
    }

    translate_vec(v) {
        return get_vector_in_system(this.origin, this.base, v);
    }
}