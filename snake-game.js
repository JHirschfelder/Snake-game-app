let canvas;
let canvasContext;
let headX = 200;
let headY = 200;
let snake = [ {x:headX, y:headY}];
let appleX;
let appleY;
let appleIsEaten = false
let velocityX=20;
let velocityY=0;
let hasCollided=false;
let gameStart = "off";
let gameTic;


window.onload = function() {
  canvas=document.getElementById('game-canvas');
  canvasContext = canvas.getContext('2d');
  document.getElementById("start-button").addEventListener("click", startButton);
  if (gameStart=="off") {
    drawCanvas();
    drawSnake();
    generateNewApple();
  };
};


function startButton() {
  if (gameStart=="off") {gameStart="on"; runGame();}
  console.log(gameStart);
};

function runGame() {
  gameTic=setInterval(function() {
    document.addEventListener("keydown", changeDirection)
    drawCanvas();
    moveSnake();
    checkCollision();
    drawApple();
    drawSnake();
  },1000);
}

function drawCanvas() {
  canvasContext.fillStyle='black';
  canvasContext.fillRect(0,0,canvas.width,canvas.height);
};

function moveSnake() {
  const head = {x: snake[0].x + velocityX, y: snake[0].y + velocityY};
  snake.unshift(head);
  checkApple();
  if (appleIsEaten != true)
  snake.pop();
};

function checkCollision() {
  for( let snakepiece=1; snakepiece<snake.length; snakepiece++) {
    if (snake[snakepiece].x == snake[0].x && 
    snake[snakepiece].y == snake[0].y)
      hasCollided=true;
  };

  if (
    snake[0].x < 0 || 
    snake[0].x >= canvas.width || 
    snake[0].y < 0 || 
    snake[0].y >= canvas.height
    )
    hasCollided=true;

  if (hasCollided==true) {
    gameStart=false;
    clearInterval(gameTic);
    gameOver.render('Game Over!');
  }
};

function checkApple() {
  if (snake[0].x == appleX && snake[0].y == appleY)
  appleIsEaten = true;
};

function drawApple () {
  if (appleIsEaten==false) {
    canvasContext.fillStyle='green';
    canvasContext.fillRect(appleX,appleY,20,20);
  };
  if (appleIsEaten==true) {
    generateNewApple();
    canvasContext.fillStyle='green';
    canvasContext.fillRect(appleX,appleY,20,20);
    appleIsEaten=false
  }
};

function generateNewApple() {
  let openSpaces = [];
  let currentSnakePositions = []

  for (let xCoordinate=0; xCoordinate < canvas.width; xCoordinate++) {
    for (let yCoordinate=0; yCoordinate < canvas.height; yCoordinate++) {
      if (xCoordinate % 20==0 && yCoordinate % 20==0) {
        openSpaces.push({x:xCoordinate, y:yCoordinate});
      };
    };
  };

  for (let gameCoordinate=0; gameCoordinate < openSpaces.length; gameCoordinate++) {
    for (let snakeCoordinate=0; snakeCoordinate < snake.length; snakeCoordinate++) {
      if (openSpaces[gameCoordinate].x==snake[snakeCoordinate].x && 
        openSpaces[gameCoordinate].y==snake[snakeCoordinate].y) {
          currentSnakePositions.push(gameCoordinate);
      };
    };
  };

  for (var i = currentSnakePositions.length -1; i >= 0; i--) {
    openSpaces.splice(currentSnakePositions[i], 1);
  };

  randomCoordinate=Math.floor(Math.random()*openSpaces.length);
  appleX=openSpaces[randomCoordinate].x;
  appleY=openSpaces[randomCoordinate].y;
};

function drawSnake() {  
  snake.forEach(drawSnakeSection);
};

function drawSnakeSection(snakesection) {
  canvasContext.fillStyle='red';
  canvasContext.fillRect(
    snakesection.x,snakesection.y,20,20);
};

function changeDirection(event) 
{  
  const leftArrow = 37;
  const rightArrow = 39;
  const upArrow = 38;
  const downArrow = 40;
  const pressKey = event.keyCode;

  switch (true) {
    case (pressKey == leftArrow && velocityX!=20):
      velocityX = -20; velocityY = 0; break;
      
    case (pressKey == upArrow && velocityY!=20):
      velocityX = 0; velocityY = -20; break;
      
    case (pressKey == rightArrow && velocityX!=-20):
      velocityX = 20; velocityY = 0; break;
      
    case (pressKey == downArrow && velocityY!=-20):
      velocityX = 0; velocityY = 20; break;
  }
}

const gameOver = new gameOverAlert();

function gameOverAlert(){
  this.render = function(){
      let gameOver = document.getElementById('game-over-popup');
      gameOver.style.display = "block";
      document.getElementById('closeModal').innerHTML = '<button onclick="gameOver.ok()">OK</button>';
  }

this.ok = function(){
  window.location.reload();
  }
}