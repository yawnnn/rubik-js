// late-initialized
let Color = {
    WHITE: null,
    YELLOW: null,
    RED: null,
    ORANGE: null,
    GREEN: null,
    BLUE: null,
}

let rubik = null;
let angle_x = 0;
let angle_y = 0;

function setup() {
    createCanvas(500, 500, WEBGL);

    // color() is not visible before this
    Color.WHITE = color("##F3F3F3");
    Color.YELLOW = color("#FE0");
    Color.RED = color("#F00");
    Color.ORANGE = color("#F90");
    Color.GREEN = color("#0C0");
    Color.BLUE = color("#00F");

    rubik = newCube();
}

function draw() {
    background(220);
    rotateX(-PI / 8 + angle_x);
    rotateY(PI / 4 - angle_y);

    rubik.update();
    rubik.show();
}

function mouseDragged() {
    angle_y += map(pmouseX - mouseX, 0, width, 0, PI);
    angle_x += map(pmouseY - mouseY, 0, height, 0, PI);
}

function keyPressed() {
    let clockwise = !keyIsDown(SHIFT);

    switch (key.toUpperCase()) {
        // Moves
        case 'E':
            rubik.move(Faces.FRONT, clockwise);
            break;
        case 'Q':
            rubik.move(Faces.BACK, clockwise);
            break;
        case 'D':
            rubik.move(Faces.RIGHT, clockwise);
            break;
        case 'A':
            rubik.move(Faces.LEFT, clockwise);
            break;
        case 'W':
            rubik.move(Faces.UP, clockwise);
            break;
        case 'S':
            rubik.move(Faces.DOWN, clockwise);
            break;

        // Reset cube
        case 'R':
            rubik = newCube();
            break;
    }
}

function newCube() {
    const width = 150;
    const dimensions = 3;
    const framerate = 10;

    return new Cube(width, dimensions, framerate);
}

// runs console.log the first 20 times only
const debug = (function () {
    let count = 0;

    return (...data) => {
        if (count < 20) {
            console.log(data);
            count++;
        }
    };
})();