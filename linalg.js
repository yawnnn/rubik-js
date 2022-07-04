function rotate2d(x, y, angle) {
    let x2 = x * cos(angle) - y * sin(angle);
    let y2 = x * sin(angle) + y * cos(angle);

    return [x2, y2];
}
  
function rotate3d(v, axis, angle) {
    let i1 = (axis + 1) % 3;
    let i2 = (axis + 2) % 3;

    let x = v[i1];
    let y = v[i2];

    v[i1] = x * cos(angle) - y * sin(angle);
    v[i2] = x * sin(angle) + y * cos(angle);
}

function rotate3d_static(v, axis, angle) {
    let result = [];
    let i1 = (axis + 1) % 3;
    let i2 = (axis + 2) % 3;

    let x = v[i1];
    let y = v[i2];

    result[axis] = v[axis];
    result[i1] = x * cos(angle) - y * sin(angle);
    result[i2] = x * sin(angle) + y * cos(angle);

    return result;
}

function change_of_basis(base, v) {
    return add3(scalar(v[0], base[0]), 
                scalar(v[1], base[1]), 
                scalar(v[2], base[2]));
}
  
function invert(v) {
    return [v[0] * -1, v[1] * -1, v[2] * -1];
}

function scalar(s, v) {
    return [s * v[0], s * v[1], s * v[2]];
}

function dot(v1, v2) {
    return v1[0] * v2[0] + v1[1] * v2[1];
}

function dot3d(v1, v2) {
    return v1[0] * v2[0] + v1[1] * v2[1] + v1[2] * v2[2];
}

function mult(v1, v2) {
    return [v1[0] * v2[0], v1[1] * v2[1], v1[2] * v2[2]];
}

function add(v1, v2) {
    return [v1[0] + v2[0], v1[1] + v2[1], v1[2] + v2[2]];
}

// Could write a generic version but maybe this is slightly faster
function add3(v1, v2, v3) {
    return [v1[0] + v2[0] + v3[0], v1[1] + v2[1] + v3[1], v1[2] + v2[2] + v3[2]];
}

function sub(v1, v2) {
    return [v1[0] - v2[0], v1[1] - v2[1], v1[2] - v2[2]];
}

// mag is already defined in p5.js
function mag2d(v) {
    return Math.sqrt(Math.pow(v[0], 2) + Math.pow(v[1], 2));
}

function mag3d(v) {
    return Math.sqrt(Math.pow(v[0], 2) + Math.pow(v[1], 2) + Math.pow(v[2], 2));
}

function distance(p1, p2) {
    return Math.sqrt(Math.pow(p2[0] - p1[0], 2) + 
        Math.pow(p2[1] - p1[1], 2));
}

function distance3d(p1, p2) {
    return Math.sqrt(Math.pow(p2[0] - p1[0], 2) + 
        Math.pow(p2[1] - p1[1], 2) + 
        Math.pow(p2[2] - p1[2], 2));
}

function angle_between(v1, v2) {
    return Math.acos((dot(v1, v2)) / (mag2d(v1) * mag2d(v2)));
}

function angle_between3d(v1, v2) {
    return Math.acos((dot3d(v1, v2)) / (mag3d(v1) * mag3d(v2)));
}