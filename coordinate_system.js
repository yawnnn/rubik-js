class Coordinate_System {

    constructor() {
        this.x = 0;
        this.y = 0;
        this.z = -len * 1.5;
        
        this.origin = [this.x, this.y, this.z];
        this.ui = [1, 0, 0];
        this.uj = [0, 1, 0];
        this.uk = [0, 0, 1];
        this.base = [this.ui, this.uj, this.uk];

        this.bak_base = [...this.base];
    }

    reset() {
        this.ui = [1, 0, 0];
        this.uj = [0, 1, 0];
        this.uk = [0, 0, 1];
        this.base = [this.ui, this.uj, this.uk];
    }

    rotate(axis, angle) {
        rotate3d(this.ui, axis, angle);
        rotate3d(this.uj, axis, angle);
        rotate3d(this.uk, axis, angle);

        this.bak_base = [...this.base];
    }

    translate_vec(v) {
        return change_of_basis(this.base, v);
    }

    // Mouse click is separate from the main loop
    // And seems to always happen after reset() or something
    translate_vec_backup(v) {
        return change_of_basis(this.bak_base, v);
    }
}