const Axis = (() => {
    return Object.freeze({
        X: 0,
        Y: 1,
        Z: 2,
    });
})();

const Faces = (() => {
    // Color is late-initialized, so i need to store a function to it
    const Face = (axis, dir, colorGetter, str) => ({
        axis: axis,
        dir: dir,
        get color() { return colorGetter(); },
        str: str,
    });

    return Object.freeze({
        RIGHT: Face(Axis.X, 1, () => Color.RED, "RIGHT"),
        LEFT: Face(Axis.X, -1, () => Color.ORANGE, "LEFT"),
        DOWN: Face(Axis.Y, 1, () => Color.YELLOW, "DOWN"),
        UP: Face(Axis.Y, -1, () => Color.WHITE, "UP"),
        FRONT: Face(Axis.Z, 1, () => Color.GREEN, "FRONT"),
        BACK: Face(Axis.Z, -1, () => Color.BLUE, "BACK"),
    });
})();

class Cube {
    constructor(width, dimensions, framerate) {
        this.width = width;
        this.dimensions = dimensions;
        this.move_animation = null;
        this.framerate = framerate;

        let cubies_width = this.width / this.dimensions;

        // working from the center
        let min = -Math.floor(dimensions / 2.);
        let max = Math.ceil(dimensions / 2.);

        this.cubies = [];

        for (let i = min; i < max; i++) {
            for (let j = min; j < max; j++) {
                for (let k = min; k < max; k++) {
                    if (i == 0 && j == 0 && k == 0)
                        continue;

                    let pos = Vec.mult(new Vec(i, j, k), cubies_width);
                    let faces = [];

                    if (i == min)
                        faces.push(Faces.LEFT);
                    else if (i == max - 1)
                        faces.push(Faces.RIGHT);

                    if (j == min)
                        faces.push(Faces.UP);
                    else if (j == max - 1)
                        faces.push(Faces.DOWN);

                    if (k == min)
                        faces.push(Faces.BACK);
                    else if (k == max - 1)
                        faces.push(Faces.FRONT);

                    this.cubies.push(new Cubie(pos, cubies_width, faces));
                }
            }
        }
    }

    move(face, clockwise) {
        if (this.move_animation && this.move_animation.in_progress()) {
            console.log("Move in progress");
            return;
        }

        let to_move = [];
        let cubies_width = this.width / this.dimensions;

        this.cubies
            .filter(cubie => Math.abs(cubie.pos[face.axis] - cubies_width * face.dir) < 0.01)
            .forEach(cubie => to_move.push(cubie));

        let rotate_dir = clockwise ? 1 : -1;

        this.move_animation = new Animation(this.framerate, () => {
            to_move.forEach(cubie => cubie.rotate(PI / (2 * this.framerate) * rotate_dir, face.axis));
        });
    }

    show() {
        // fill(0)
        // box(rubik.width * (dim - 2), rubik.width * (dim - 2), rubik.width * (dim - 2), 0, 0)

        this.cubies.forEach(cubie => cubie.show());
    }

    update() {
        if (this.move_animation)
            this.move_animation.step();
    }
}
