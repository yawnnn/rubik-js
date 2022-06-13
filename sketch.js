const len = 50;
const min_ = 0;
const max_ = 3;

const verx = len * -1.5;
const very = len * -1.5;
const verz = len * -1.5;

let WHITE, YELLOW, RED, ORANGE, GREEN, BLUE, BLACK;

let origin;
let ui, uj, uk;
let base;

let ax = 0;
let ay = 0;

let cube;

// STANDARDIZE FUNCTION NAMES

function setup() {
  createCanvas(len * 10, len * 10, WEBGL);

  WHITE = color('##F3F3F3');
  YELLOW = color('#FE0');
  RED = color('#F00');
  ORANGE = color('#F90');
  GREEN = color('#0C0');
  BLUE = color('#00F');
  BLACK = color('#000');
  
  cube = new Cube();
}

function draw() {
  background(220);

  // Gotta reset, matrix mult is NOT commutative
  origin = [verx, very, verz];
  ui = [1, 0, 0];
  uj = [0, 1, 0];
  uk = [0, 0, 1];
  base = [ui, uj, uk];

  rotate_global(1, PI/4 - ay);
  rotate_global(0, -PI/8 + ax);
  
  cube.show();
}

function mouseDragged() { 
  ay += map(pmouseX - mouseX, 0, width, 0, 3 * PI/2);
  ax += map(pmouseY - mouseY, 0, height, 0, 3 * PI/2);
}

function rotate_global(axis, angle) {
  rotate3d(origin, axis, angle);
  rotate3d(ui, axis, angle);
  rotate3d(uj, axis, angle);
  rotate3d(uk, axis, angle);
}