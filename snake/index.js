const gameBoard = document.querySelector("#gameBoard");
const ctx = gameBoard.getContext("2d");
const scoreText = document.querySelector("#scoreText");
const resetBtn = document.querySelector("#resetBtn");
const gameWidth = gameBoard.width;
const gameHeight = gameBoard.height;
const boardBackground = "green";
const snakeColor = "purple";
const snakeBoarder = "black";
const foodColor = "red";
const poisonColor = "yellow";
const unitSize = 25;
const startBtn = document.getElementById("startBtn");
const DOWN = 40;
const LEFT = 37;
const RIGHT = 39;
const UP = 38;

let running = false;
let xVelocity = unitSize;
let yVelocity = 0;
let foodX;
let foodY;
let poisonX;
let poisonY;
let score = 0;
let snake = [
        {x:unitSize * 4, y:0},
        {x:unitSize * 3, y:0},
        {x:unitSize * 2, y:0},
        {x:unitSize, y:0},
        {x:0, y:0}
];

window.addEventListener("keydown", changeDirection);
resetBtn.addEventListener("click", resetGame);


//gameStart()
//createFood();
//drawFood();

startBtn.addEventListener("click", function() {
    gameStart();
});


function startGame() {
    running = true;
    score = 0;
    snake = [        {x:unitSize * 4, y:0},        {x:unitSize * 3, y:0},        {x:unitSize * 2, y:0},        {x:unitSize, y:0},        {x:0, y:0}    ];
    xVelocity = unitSize;
    yVelocity = 0;
    createFood();
    createPoison();
    scoreText.textContent = score;
    clearBoard();
    drawFood();
    drawPoison();
    drawsSnake();
    nextTick();
}


function gameStart(){
    running = true;
    console.log(scoreText)
    scoreText.textContent = score;
    createFood();
    createPoison();
    drawFood();
    drawPoison(); 
    nextTick();
}; 


function nextTick(){
    if(running){
        setTimeout(()=>{
            clearBoard();
            drawFood();
            drawPoison(); 
            moveSnake();
            drawsSnake();
            checkGameOver();
            nextTick();            
        }, 75)
    }
    else{
        displayGameOver();
    }
};
function clearBoard(){
    ctx.fillStyle = boardBackground;
    ctx.fillRect(0, 0, gameWidth, gameHeight);
};
function createFood(){
    function randomFood(min, max){
        const randNum = Math.round((Math.random() * (max - min) + min) / unitSize) * unitSize;
        return randNum;
    }
    foodX = randomFood(0, gameWidth - unitSize);
    foodY = randomFood(0, gameWidth - unitSize);
};
function drawFood(){
    ctx.fillStyle = foodColor;
    ctx.fillRect(foodX, foodY, unitSize, unitSize);
};

function createPoison(){
    function randomPoison(min, max){
        const randNum = Math.round((Math.random() * (max - min) - min) / unitSize) * unitSize;
        return randNum;
    }
    poisonX = randomPoison(0, gameWidth - unitSize);
    poisonY = randomPoison(0, gameWidth - unitSize);
};
function drawPoison(){
    ctx.fillStyle = poisonColor;
    ctx.fillRect(poisonX, poisonY, unitSize, unitSize);
};


function moveSnake(){
    const head = {x: snake[0].x + xVelocity,
                  y: snake[0].y + yVelocity};
    snake.unshift(head);
    //if food is eaten
    if(snake[0].x == foodX && snake[0].y === foodY){
        score+=1;
        scoreText.textContent = score;
        createFood();
    } else if (snake[0].x == poisonX && snake[0].y == poisonY) {
        score-=1;
        scoreText.textContent = score;
        createPoison();
    } else {
        snake.pop();
    } 
};

function drawsSnake(){
    ctx.fillStyle = snakeColor;
    ctx.strokeStyle = snakeBoarder;
    snake.forEach(snakePart => {
        ctx.fillRect(snakePart.x, snakePart.y, unitSize, unitSize);
        ctx.strokeRect(snakePart.x, snakePart.y, unitSize, unitSize);
    })
};


function changeDirection(event, keyCode) {
    const keyPressed = event ? event.keyCode : keyCode;
    const LEFT = 37;
    const UP = 38;
    const RIGHT = 39;
    const DOWN = 40;
  
    const goingUP = (yVelocity == -unitSize);
    const goingDOWN = (yVelocity == unitSize);
    const goingRIGHT = (xVelocity == unitSize);
    const goingLEFT = (xVelocity == -unitSize);
    
    switch(true) {
      case (keyPressed === LEFT && !goingRIGHT):
        xVelocity = -unitSize;
        yVelocity = 0;
        break;
      case (keyPressed === UP && !goingDOWN):
        xVelocity = 0;
        yVelocity = -unitSize;
        break;
      case (keyPressed === RIGHT && !goingLEFT):
        xVelocity = unitSize;
        yVelocity = 0;
        break;
      case (keyPressed === DOWN && !goingUP):
        xVelocity = 0;
        yVelocity = unitSize;
        break;    
      default:
        break;
    }
  }
  
  const upBtn = document.getElementById("upBtn");
  const lefBtn = document.getElementById("lefBtn");
  const rigBtn = document.getElementById("rigBtn");
  const dowBtn = document.getElementById("dowBtn");
  
  upBtn.addEventListener("click", function() {
    changeDirection(null, UP);
  });
  
  lefBtn.addEventListener("click", function() {
    changeDirection(null, LEFT);
  });
  
  rigBtn.addEventListener("click", function() {
    changeDirection(null, RIGHT);
  });
  
  dowBtn.addEventListener("click", function() {
    changeDirection(null, DOWN);
  });
  
  document.addEventListener("keydown", function(event) {
    changeDirection(event, null);
});
function checkGameOver(){
    switch(true){
        case (snake[0].x < 0):
            running = false;
            break;
        case (snake[0].x >= gameWidth):
            running = false;
            break;
        case (snake[0].y < 0):
                running = false;
                break;
        case (snake[0].y >= gameHeight):
                running = false;
                break;
    }
    for(let i = 1; i < snake.length; i+=1){
        if(snake[i].x == snake[0].x && snake[i].y == snake[0].y){
            running = false;
        }
    }
};
function displayGameOver(){
    ctx.font = "50px MV Boli";
    ctx.fillStyle = "black";
    ctx.textAlign = "center";
    ctx.fillText('GAME OVER!', gameWidth / 2, gameHeight / 2);
    running = false;
};
function resetGame(){
    score = 0;
    xVelocity = unitSize;
    yVelocity = 0;
    snake = [
        {x:unitSize * 4, y:0},
        {x:unitSize * 3, y:0},
        {x:unitSize * 2, y:0},
        {x:unitSize, y:0},
        {x:0, y:0}
    ];
    gameStart();
};  