const canvas = document.getElementById("game");
const ctx = canvas.getContext("2d");

const ground = new Image();
ground.src = "img/ground.png";

const foodImg = new Image();
foodImg.src = "img/food.png";

let box = 32;
let score = 0;
let timeScore = 200;

let food = {
  x: Math.floor(Math.random() * 17 + 1) * box,
  y: Math.floor(Math.random() * 15 + 3) * box
};

let snake = [];
snake[0] = {
	x: 9 * box,
	y: 10 * box
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

function isEatTale(snakeHead, snake) {
    for (let i = 0; i < snake.length; i++){
        if (snakeHead.x == snake[i].x && snakeHead.y == snake[i].y){
            console.log("pizdik")
            clearTimeout(gameStart);
        }
    }
}

let counter = 200;


function gameStart(){

    ctx.drawImage(ground, 0, 0);
    ctx.drawImage(foodImg, food.x, food.y);

    for (let i = 0; i < snake.length; i++) {
        ctx.fillStyle = i == 0 ? "green" : "red";
        ctx.fillRect(snake[i].x, snake[i].y, box, box);

    }

    ctx.fillStyle = "white";
    ctx.font = "50px Arial";
    ctx.fillText( score, box * 2.5, box * 1.7 );

    let snakeX = snake[0].x;
    let snakeY = snake[0].y;

    if(snakeX == food.x && snakeY == food.y) {
        score++;
        //counter-=50;
        //timeScore-=100;
        food = {
            x: Math.floor((Math.random() * 17 + 1)) * box,
            y: Math.floor((Math.random() * 15 + 3)) * box,
        };
    } else
        snake.pop();

    if (snakeX < box || snakeX > box * 17 ||
        snakeY < 3 * box || snakeY > box * 17)
        console.log("chirik")
        //clearTimeout(gameStart);

    if(dir == "left") snakeX -= box;
    if(dir == "right") snakeX += box;
    if(dir == "up") snakeY -= box;
    if(dir == "down") snakeY += box;

    let newHead = {
        x: snakeX,
        y: snakeY
    };
    console.log(newHead);
    isEatTale(newHead, snake);

    snake.unshift(newHead);

    setTimeout(gameStart, counter);
    

    }

let game = gameStart();


//let game = setInterval(drawGame, timeScore);
