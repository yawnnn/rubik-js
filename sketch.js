const len = 50;
const min_ = 0;
const max_ = 3;

const verx = len * -1.5;
const very = len * -1.5;
const verz = len * -1.5;

let WHITE, YELLOW, RED, ORANGE, GREEN, BLUE, BLACK;

let ax = 0;
let ay = 0;

let system;
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
  
  system = new Coordinate_System(verx, very, verz);
  cube = new Cube();
}

function draw() {
  background(220);

  system.rotate(1, PI/4 - ay);
  system.rotate(0, -PI/8 + ax);
  
  cube.show();

  // Gotta reset, matrix mult is NOT commutative
  system.reset();
}

function mouseDragged() { 
  ay += map(pmouseX - mouseX, 0, width, 0, PI/3);
  ax += map(pmouseY - mouseY, 0, height, 0, PI/3);
}