let canvas;
let canvasContext;
let headX = 200;
let headY = 200;
let snake = [ {x:headX, y:headY}];
let dx=20;
let dy=0;
let hasCollided=false


window.onload = function() {
  canvas=document.getElementById('game-canvas');
  canvasContext = canvas.getContext('2d');
  setInterval(function() {
    document.addEventListener("keydown", changeDirection)
    drawCanvas();
    moveSnake();
    checkCollision();
    console.log(hasCollided);
    drawApple();
    drawSnake();
  },2000);
};

function drawCanvas() {
  canvasContext.fillStyle='black';
  canvasContext.fillRect(0,0,canvas.width,canvas.height);
};


function moveSnake() {
  const head = {x: snake[0].x + dx, y: snake[0].y + dy};
  snake.unshift(head);
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
};

function drawApple () {
  canvasContext.fillStyle='green';
  canvasContext.fillRect(200,200,10,10);
};

function drawSnake() {  
  snake.forEach(drawSnakeSection);
};

function drawSnakeSection(snakesection) {
  canvasContext.fillStyle='red';
  canvasContext.fillRect(
    snakesection.x,snakesection.y,20,20);
};

document.addEventListener("keydown", changeDirection)

function changeDirection(event) 
{  
  const leftArrow = 37;
  const rightArrow = 39;
  const upArrow = 38;
  const downArrow = 40;
  const pressKey = event.keyCode;

  switch (true) {
    case (pressKey == leftArrow && dx!=20):
      dx = -20; dy = 0; break;
      
    case (pressKey == upArrow && dy!=20):
      dx = 0; dy = -20; break;
      
    case (pressKey == rightArrow && dx!=-20):
      dx = 20; dy = 0; break;
      
    case (pressKey == downArrow && dy!=-20):
      dx = 0; dy = 20; break;
  }
}