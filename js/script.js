const canvas = document.getElementById("gamePole");
const ctx = canvas.getContext("2d");

const cell = 50;
let cellsInRow = 10;
let gameAreaSize = cell * cellsInRow;
let vectorX = 0;
let vectorY = 0;
let vectorXDelta = 0;
let vectorYDelta = 0;
let previousLastSnakeElemCoords = {
    x: 0,
    y: 0
};

canvas.setAttribute("width", gameAreaSize);
canvas.setAttribute("height", gameAreaSize + 100);

function drawScore() {
    ctx.fillStyle = "#8FBC8F";
    ctx.fillRect(0,gameAreaSize, gameAreaSize, 100)

    ctx.fillStyle = "black";
    ctx.font = "50px Georgia";
    ctx.fillText(score, cell, gameAreaSize + 50);
}

function drawGameArea() {
    ctx.fillStyle = "#228B22";
    ctx.fillRect(0,0, gameAreaSize, gameAreaSize)

    drawScore();

    ctx.fillStyle = "#006400";
    for(let i = 0; i < cellsInRow/2; i++) {
        for (let j = 0; j < cellsInRow / 2; j++) {
            ctx.fillRect((cell * j * 2), (cell*2*i), cell, cell);
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

function reset () {
    isDead = false;
    ignoreTurn = false;
    snake = [];
    snake[0] = {
	x: gameAreaSize/2,
	y: gameAreaSize/2
    };
    vectorX = 0;
    vectorY = 0;
    vectorXDelta = 0;
    vectorYDelta = 0;
    food = {
        x: Math.floor((Math.random() * cellsInRow)) * cell,
        y: Math.floor((Math.random() * cellsInRow)) * cell
    };
    score = 0;
    timeScore = defaultTimeScore;
    previousLastSnakeElemCoords = {
        x: -1,
        y: -1
    };
    drawGameArea();
}

document.addEventListener("keydown", direction);
let ignoreTurn = false;

function direction(event) {

        if ([37, 65].includes(event.keyCode) && vectorX == 0) {
            //left
            vectorXDelta = -cell;
            vectorYDelta = 0;
            ignoreTurn = true;
        } else if ([38, 87].includes(event.keyCode)&& vectorY == 0) {
            //up
            vectorXDelta = 0;
            vectorYDelta = -cell;
            ignoreTurn = true;
        } else if ([39, 68].includes(event.keyCode) && vectorX == 0) {
            //right
            vectorXDelta = cell;
            vectorYDelta = 0;
            ignoreTurn = true;
        } else if ([40, 83].includes(event.keyCode) && vectorY == 0) {
            //down
            vectorXDelta = 0;
            vectorYDelta = cell;
            ignoreTurn = true;
    }

    if (event.keyCode == 32) {
        //restart
        reset();
    }

}

function isEatTale(snakeHead, snake) {
    for (let i = 0; i < snake.length; i++) {
        if (snakeHead.x == snake[i].x && snakeHead.y == snake[i].y) {
            return true;
           }
        }
    return false;
    }

let snake = [];

function drawFoodAndSnake() {

    ctx.drawImage(foodImg, food.x, food.y, cell, cell);

    for (let i = snake.length - 1; i >= 0; i--) {
        ctx.fillStyle = i == 0 ? "black" : "#2b2b2b";
        ctx.fillRect(snake[i].x, snake[i].y, cell, cell);
    }

    if (previousLastSnakeElemCoords.x != null && previousLastSnakeElemCoords.y != null) {
        if ((previousLastSnakeElemCoords.x / cell) % 2 == 0 && (previousLastSnakeElemCoords.y / cell) % 2 != 0) {
            ctx.fillStyle = "#228B22";
        } else if ((previousLastSnakeElemCoords.x / cell) % 2 != 0 && (previousLastSnakeElemCoords.y / cell) % 2 != 0) {
            ctx.fillStyle = "#006400";
        } else if ((previousLastSnakeElemCoords.x / cell) % 2 == 0 && (previousLastSnakeElemCoords.y / cell) % 2 == 0) {
            ctx.fillStyle = "#006400";
        } else if ((previousLastSnakeElemCoords.x / cell) % 2 != 0 && (previousLastSnakeElemCoords.y / cell) % 2 == 0) {
            ctx.fillStyle = "#228B22";
        }
        ctx.fillRect(previousLastSnakeElemCoords.x, previousLastSnakeElemCoords.y, cell, cell)
    }
    setTimeout(drawFoodAndSnake, 10);
}

function gameStart() {
    if(!isDead) {
        if (vectorXDelta != 0 || vectorYDelta != 0){
            vectorX = vectorXDelta;
            vectorY = vectorYDelta;
            vectorXDelta = 0;
            vectorYDelta = 0;
        }

        if (vectorX == 0 && vectorY == 0){
            setTimeout(gameStart, timeScore);
            return;
        }

        let snakeX = snake[0].x;
        let snakeY = snake[0].y;


        if (snakeX + vectorX < 0 || snakeX + vectorX >= cell * cellsInRow ||
            snakeY + vectorY < 0 || snakeY + vectorY >= cell * cellsInRow) {
            vectorX = 0;
            vectorY = 0;
            isDead = true;
        } else {
            previousLastSnakeElemCoords.x = snake[snake.length - 1].x;
            previousLastSnakeElemCoords.y = snake[snake.length - 1].y;
        }

        snakeX += vectorX;
        snakeY += vectorY;


        if (snakeX == food.x && snakeY == food.y) {
            score++;
            drawScore();
            timeScore -= (timeScoreDelta > timeScore ? 0 : timeScoreDelta);
            food = {
                x: Math.floor((Math.random() * cellsInRow)) * cell,
                y: Math.floor((Math.random() * cellsInRow)) * cell
            };
        } else if (!isDead) {
            snake.pop();
        }

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
    setTimeout(drawFoodAndSnake, 100);
    gameStart();