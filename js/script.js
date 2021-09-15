const canvas = document.getElementById("gamePole");
const ctx = canvas.getContext("2d");

const cell = 32;
let cellsInRow = 10;
let gameAreaSize = cell*cellsInRow;

canvas.setAttribute("width", gameAreaSize);
canvas.setAttribute("height", gameAreaSize);

function drawGameArea() {
    ctx.fillStyle = "yellow";
    ctx.fillRect(0,0, gameAreaSize, gameAreaSize)

    ctx.fillStyle = "black";
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
let timeScore = 200;

let food = {
  x: Math.floor((Math.random() * cellsInRow)) * cell,
  y: Math.floor((Math.random() * cellsInRow)) * cell
};

console.log(food.x + "  " + food.y + "       " +food.x/cellsInRow/cell + "       "+food.y/cellsInRow/cell)

let snake = [];
snake[0] = {
	x: gameAreaSize/2,
	y: gameAreaSize/2
};

document.addEventListener("keydown", direction);

let dir = "";

function direction(event) {
    if(event.keyCode == 37 && dir != "right")
        dir = "left";
    else if(event.keyCode == 38 && dir != "down")
        dir = "up";
    else if(event.keyCode == 39 && dir != "left")
        dir = "right";
    else if(event.keyCode == 40 && dir != "up")
        dir = "down";
}
//
// function isEatTale(snakeHead, snake) {
//     for (let i = 0; i < snake.length; i++){
//         if (snakeHead.x == snake[i].x && snakeHead.y == snake[i].y){
//             console.log("pizdik")
//             clearTimeout(gameStart);
//         }
//     }
// }
//
let counter = 200;

function gameStart(){
    drawGameArea();
    ctx.drawImage(foodImg, food.x, food.y);

    for (let i = 0; i < snake.length; i++) {
        ctx.fillStyle = i == 0 ? "green" : "red";
        ctx.fillRect(snake[i].x, snake[i].y, cell, cell);
    }

    // ctx.fillStyle = "white";
    // ctx.font = "50px Arial";
    // ctx.fillText( score, cell * 2.5, cell * 1.7 );

    let snakeX = snake[0].x;
    let snakeY = snake[0].y;

    if(snakeX == food.x && snakeY == food.y) {
        score++;
        //counter-=50;
        //timeScore-=100;
        food = {
            x: Math.floor((Math.random() * cellsInRow)) * cell,
            y: Math.floor((Math.random() * cellsInRow)) * cell
        };
    } else
        snake.pop();

    if (snakeX < cell || snakeX > cell * 17 ||
        snakeY < 3 * cell || snakeY > cell * 17)
        console.log("chirik")
        //clearTimeout(gameStart);

    if(dir == "left") snakeX -= cell;
    if(dir == "right") snakeX += cell;
    if(dir == "up") snakeY -= cell;
    if(dir == "down") snakeY += cell;

    let newHead = {
        x: snakeX,
        y: snakeY
    };

    //isEatTale(newHead, snake);

    snake.unshift(newHead);

    setTimeout(gameStart, counter);


    }

gameStart();
//
//
// //let game = setInterval(drawGame, timeScore);
