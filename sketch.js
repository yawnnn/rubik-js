const len = 80;
const min_ = -1;
const max_ = 2;

// half of the diagonal of the cubes
const max_dist = (Math.sqrt(2) * len * 3) / 2;
const max_dist_cubie = (Math.sqrt(2) * len) / 2 ;

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

function mousePressed() {
  let mx = map(mouseX, 0, width, -width/2, width/2);
  let my = map(mouseY, 0, height, -height/2, height/2);
  
  if (Math.sqrt(mx * mx + my * my) <= max_dist) {
    cube.clicked(mx, my);
    cube.mouse_twist.set(mx, my);
  }
}

function mouseReleased() {
  if (cube.mouse_twist.is_set()) {
    cube.released();
    cube.mouse_twist.reset();
  }
}

function mouseDragged() { 
  if (cube.mouse_twist.is_set() && !cube.mouse_twist.is_done()) {
    let mx = map(mouseX, 0, width, -width/2, width/2);
    let my = map(mouseY, 0, height, -height/2, height/2);

    if (cube.mouse_twist.mag(mx, my) > 15) {
      cube.twist_by_mouse(mx, my);
      cube.mouse_twist.done();
    }
  } else if (!cube.mouse_twist.is_set()) {
    ay += map(pmouseX - mouseX, 0, width, 0, PI);
    ax += map(pmouseY - mouseY, 0, height, 0, PI);
  }
  
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