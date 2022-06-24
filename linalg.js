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

function get_vector_in_system(origin, base, v) {
    // v_OB = O + ui * v.x + uj * v.y + uk * v.z

    return add(origin, 
        add3(dot(v[0], base[0]), 
            dot(v[1], base[1]), 
            dot(v[2], base[2])));
}
  
function invert(v) {
    return [v[0] * -1, v[1] * -1, v[2] * -1];
}

function dot(s, v) {
    return [s * v[0], s * v[1], s * v[2]];
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