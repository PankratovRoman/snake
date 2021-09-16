const canvas = document.getElementById("gamePole");
const ctx = canvas.getContext("2d");

const cell = 50;
let cellsInRow = 10;
let gameAreaSize = cell * cellsInRow;
let vectorX = 0;
let vectorY = 0;

canvas.setAttribute("width", gameAreaSize);
canvas.setAttribute("height", gameAreaSize + 100);

function drawGameArea() {
    ctx.fillStyle = "#228B22";
    ctx.fillRect(0,0, gameAreaSize, gameAreaSize)

    ctx.fillStyle = "#8FBC8F";
    ctx.fillRect(0,gameAreaSize, gameAreaSize, 100)

    ctx.fillStyle = "#006400";
    for(let i = 0; i < cellsInRow/2; i++) {
        for (let j = 0; j < cellsInRow / 2; j++) {
            ctx.fillRect((cell * j * 2), (cell*2*i), cell, cell);
            //console.log("X: "+(cell * j * 2)+". Y: "+(cell*2*i))
        }
        for (let j = 0; j < cellsInRow / 2; j++) {
            ctx.fillRect(cell + (cell * j * 2), cell+(cell*2*i), cell, cell);
        }
    }
}

const foodImg = new Image();
foodImg.src = "img/food.png";

let score = 0;
const defaultTimeScore = 500;
const timeScoreDelta = 25;
let timeScore = defaultTimeScore;
let isDead = false;

let food = {
  x: Math.floor((Math.random() * cellsInRow)) * cell,
  y: Math.floor((Math.random() * cellsInRow)) * cell
};

console.log(food.x + "  " + food.y + "       " +food.x/cellsInRow/cell + "       "+food.y/cellsInRow/cell)

let snake = [];


function reset (){
    isDead = false;
    ignoreTurn = false;
    snake = [];
    snake[0] = {
	x: gameAreaSize/2,
	y: gameAreaSize/2
    };
    vectorX = 0;
    vectorY = 0;
    food = {
        x: Math.floor((Math.random() * cellsInRow)) * cell,
        y: Math.floor((Math.random() * cellsInRow)) * cell
    };
    score = 0;
    timeScore = defaultTimeScore;
}

document.addEventListener("keydown", direction);
//let dir = "";
let ignoreTurn = false;
function direction(event) {
    if(!ignoreTurn) { //защита от быстрого нажатия
        if (event.keyCode == 37 && vectorX == 0) {
            //left
            vectorX = -cell;
            vectorY = 0;
            ignoreTurn = true;
        }
        else if(event.keyCode == 38 && vectorY == 0){
            //up
            vectorX = 0;
            vectorY = -cell;
            ignoreTurn = true;
        }
        else if(event.keyCode == 39 && vectorX == 0){
            //right
            vectorX = cell;
            vectorY = 0;
            ignoreTurn = true;
        }
        else if(event.keyCode == 40 && vectorY == 0){
            //down
            vectorX = 0;
            vectorY = cell;
            ignoreTurn = true;
        }
    }
    if (event.keyCode == 32){
        //restart
        reset();
    }

    // if(event.keyCode == 37 && dir != "right")
    //     dir = "left";
    // else if(event.keyCode == 38 && dir != "down")
    //     dir = "up";
    // else if(event.keyCode == 39 && dir != "left")
    //     dir = "right";
    // else if(event.keyCode == 40 && dir != "up")
    //     dir = "down";
}

function isEatTale(snakeHead, snake) {
    for (let i = 0; i < snake.length; i++){
        if (snakeHead.x == snake[i].x && snakeHead.y == snake[i].y){
            return true;
           }
        }
    return false;
    }


function draw() {
    drawGameArea();
    ctx.drawImage(foodImg, food.x, food.y, cell, cell);

    for (let i = snake.length - 1; i >= 0; i--) {
        ctx.fillStyle = i == 0 ? "black" : "grey";
        ctx.fillRect(snake[i].x, snake[i].y, cell, cell);
    }
    ctx.fillStyle = "black";
    ctx.font = "50px Georgia";
    ctx.fillText(score, cell, gameAreaSize + 50);
    setTimeout(draw, 10);
}

function gameStart(){
    if(!isDead) {


        let snakeX = snake[0].x;
        let snakeY = snake[0].y;

        if (snakeX < 0 || snakeX >= cell * cellsInRow ||
            snakeY < 0 || snakeY >= cell * cellsInRow) {
            vectorX = 0;
            vectorY = 0;
            isDead = true;
        }

        snakeX += vectorX;
        snakeY += vectorY;
        ignoreTurn = false;

        if (snakeX == food.x && snakeY == food.y) {
            score++;
            timeScore -= (timeScoreDelta > timeScore ? 0 : timeScoreDelta);
            food = {
                x: Math.floor((Math.random() * cellsInRow)) * cell,
                y: Math.floor((Math.random() * cellsInRow)) * cell
            };
        } else if (!isDead)
            snake.pop();

        // if(dir == "left") snakeX -= cell;
        // if(dir == "right") snakeX += cell;
        // if(dir == "up") snakeY -= cell;
        // if(dir == "down") snakeY += cell;

        let newHead = {
            x: snakeX,
            y: snakeY
        };

        isDead = isDead || isEatTale(newHead, snake);
        snake.unshift(newHead);

    }
    setTimeout(gameStart, timeScore);
    }
reset();
setTimeout(draw, 100);
gameStart();
