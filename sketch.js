const len = 80;
const min_ = -1;
const max_ = 2;

// const verx = len * -1.5;
// const very = len * -1.5;
// const verz = len * -1.5;

let WHITE, YELLOW, RED, ORANGE, GREEN, BLUE, BLACK;

let ax = 0;
let ay = 0;

let system;
let cube;

function setup() {
  createCanvas(len * 10, len * 10, WEBGL);

  WHITE = color('##F3F3F3');
  YELLOW = color('#FE0');
  RED = color('#F00');
  ORANGE = color('#F90');
  GREEN = color('#0C0');
  BLUE = color('#00F');
  BLACK = color('#000');
  
  system = new Coordinate_System();
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
  ay += map(pmouseX - mouseX, 0, width, 0, PI);
  ax += map(pmouseY - mouseY, 0, height, 0, PI);
}

function keyPressed() {
  let dir = keyIsDown(SHIFT) ? -1 : 1;
  
  switch(key.toLowerCase()) {
    case 'w':
      cube.twist(1, min_, dir);
      break;
    case 's':
      cube.twist(1, max_-1, dir);
      break;
    case 'a':
      cube.twist(0, min_, dir);
      break;
    case 'd':
      cube.twist(0, max_-1, dir);
      break;
    case 'q':
      cube.twist(2, min_, dir);
      break;
    case 'e':
      cube.twist(2, max_-1, dir);
      break;
  }
}