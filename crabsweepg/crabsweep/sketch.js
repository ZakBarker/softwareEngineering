function makeField(cols, rows) {
    let field = new Array(cols);
    for (let i = 0; i < field.length; i++) {
        field[i] = new Array(rows);
    }
    return field;
}

let flagger;
let cols;
let rows;
let l = 50;
let grid;
let allCrabs = 20;
let gg = false;
let score = 0;
let start = false;
let revealCount = 0;
let gridSize = 0;

function setup() {
    createCanvas(541, 601);
    flagger = new Flagger(90, 40, 50, treetree)
    cols = 10; //floor(width / l);
    rows = 10; //floor(height / l);
    grid = makeField(cols, rows);
    for (let i = 0; i < cols; i++) {
        for (let j = 0; j < rows; j++) {
            gridSize++;
            grid[i][j] = new Cell(i, j, l);

        }
    }

    let options = [];
    for (var i = 0; i < cols; i++) {
        for (var j = 0; j < rows; j++) {
            options.push([i, j]);
        }
    }

    for (var n = 0; n < allCrabs; n++) {
        let index = floor(random(options.length));
        let choice = options[index];
        let i = choice[0];
        let j = choice[1];
        options.splice(index, 1);
        grid[i][j].crab = true;
    }

    for (let i = 0; i < cols; i++) {
        for (let j = 0; j < cols; j++) {
            grid[i][j].countCrabs();
        }
    }
}


function mouseClicked() {
    start = true;
    flagger.click();
    for (let i = 0; i < cols; i++) {
        for (let j = 0; j < rows; j++) {
            if (grid[i][j].click(mouseX, mouseY)) {
                grid[i][j].flag();
            }
        }
    }
}

function lose() {
    for (let i = 0; i < cols; i++) {
        for (let j = 0; j < rows; j++) {
            let cc = grid[i][j];
            if (cc.reveal == false && cc.crab) {
                cc.reveal = true;
            }
        }
        gg = true;
        score = 'You Lose';
    }
}

function win() {
    gg = true;
    score = 'Congratz, your score is ' + score;
}

function draw() {
    drawBackground();
    flagger.show();
    displayTimer();
    for (let i = 0; i < cols; i++) {
        for (let j = 0; j < rows; j++) {
            grid[i][j].show();
        }
    }
}

function countTime() {
    if (!gg && start) {
        if (frameCount % 60 == 0) {
            score++;
        }
    }
}

function displayTimer() {
    countTime();
    textSize(20);
    textAlign(CENTER);
    fill('orange');
    text('Score: ' + score, width / 2, 50);
}

function drawBackground() {
    background('#111E6C');
    rectMode(CENTER);
    noStroke();
    fill('#000080');
    rect(width / 2, height / 2 + 35, 520, 520);
    rectMode(CORNER);
}
