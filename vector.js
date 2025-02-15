class Vec {
    constructor(x, y, z) {
        this.v = [x, y, z];
    }

    get 0() { return this.v[0]; }
    get 1() { return this.v[1]; }
    get 2() { return this.v[2]; }

    *[Symbol.iterator]() { yield* this.v; }

    // Static method for rotating a vector
    static rotate(vec, angle, axis) {
        const i1 = (axis + 1) % 3;
        const i2 = (axis + 2) % 3;

        const [x, y] = [vec.v[i1], vec.v[i2]];
        const cosA = Math.cos(angle);
        const sinA = Math.sin(angle);

        let result = [...vec.v];
        result[i1] = x * cosA - y * sinA;
        result[i2] = x * sinA + y * cosA;

        return new Vec(...result);
    }

    // Instance method for rotation (updates this.v)
    rotate(angle, axis) {
        this.v = Vec.rotate(this, angle, axis).v;
    }

    // Static method for inverting a vector
    static invert(vec) {
        return new Vec(...vec.v.map(coord => -coord));
    }

    // Instance method for inverting (updates this.v)
    invert() {
        this.v = Vec.invert(this).v;
    }

    // Static method for adding two vectors
    static add(vec1, vec2) {
        return new Vec(...vec1.v.map((coord, index) => coord + vec2.v[index]));
    }

    // Instance method for adding another vector
    add(other) {
        this.v = Vec.add(this, other).v;
    }

    // Static method for multiply vector by scalar
    static mult(vec, factor) {
        return new Vec(...vec.v.map((coord) => coord * factor));
    }

    // Instance method for multiply by scalar
    mult(factor) {
        this.v = Vec.mult(this, factor);
    }
}
