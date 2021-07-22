let WHITE, YELLOW, RED, ORANGE, GREEN, BLUE;

let l = 50;
let hl = l/2.;
let dim = 3;
let min_ = Math.floor(dim/2.);
let max_ = Math.ceil(dim/2.);
let aframes = 10;

let ax = 0;
let ay = 0;

let rubik;

function setup() {
  createCanvas(500, 500, WEBGL);
  
  WHITE = color('##F3F3F3');
  YELLOW = color('#FE0');
  RED = color('#F00');
  ORANGE = color('#F90');
  GREEN = color('#0C0');
  BLUE = color('#00F');
  
  rubik = new Cube(dim);
}

function draw() {
  background(220);
  rotateX(-PI/8 + ax);
  rotateY(PI/4 - ay);
  
  fill(0)
  box(l*(dim - 2), l*(dim - 2), l*(dim - 2), 0, 0)
  
  rubik.update();
  rubik.show();
}

function mousePressed() {
  
}

function mouseDragged() {
  ay += map(pmouseX - mouseX, 0, width, 0, PI);
  ax += map(pmouseY - mouseY, 0, height, 0, PI);
}

function keyPressed() {
  let dir = keyIsDown(SHIFT) ? -1 : 1;
  
  switch(key.toLowerCase()) {
    case 'w':
      rubik.rotate(1, dir, -min_);
      break;
    case 's':
      rubik.rotate(1, dir, max_-1);
      break;
    case 'a':
      rubik.rotate(0, dir, -min_);
      break;
    case 'd':
      rubik.rotate(0, dir, max_-1);
      break;
    case 'q':
      rubik.rotate(2, dir, -min_);
      break;
    case 'e':
      rubik.rotate(2, dir, max_-1);
      break;
  }
}