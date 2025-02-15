class Cubie {
    constructor(pos, width, faces) {
        this.pos = pos;
        this.faces = faces;

        let half_width = width / 2.;
        this.normals = [
            new Vec(half_width, 0, 0),
            new Vec(0, half_width, 0),
            new Vec(0, 0, half_width),
        ];
    }

    rotate(angle, axis) {
        this.pos.rotate(angle, axis);
        this.normals.forEach(n => n.rotate(angle, axis));
    }

    show() {
        this.faces.forEach(face => {
            let normal = this.normals[face.axis];

            if (face.dir < 0)
                normal = Vec.invert(normal);

            const pos = Vec.add(this.pos, normal);

            const i1 = (face.axis + 1) % 3;
            const i2 = (face.axis + 2) % 3;

            const [x, y, z] = pos;
            const [n1x, n1y, n1z] = this.normals[i1];
            const [n2x, n2y, n2z] = this.normals[i2];

            fill(face.color);
            
            beginShape();
            vertex(x + n1x + n2x, y + n1y + n2y, z + n1z + n2z);
            vertex(x - n1x + n2x, y - n1y + n2y, z - n1z + n2z);
            vertex(x - n1x - n2x, y - n1y - n2y, z - n1z - n2z);
            vertex(x + n1x - n2x, y + n1y - n2y, z + n1z - n2z);
            endShape(CLOSE);
        })
    }
}