let canvas;
let canvasContext;
let headX = 200;
let headY = 200;
let snake = [ {x:headX, y:headY}];
let dx=10;
let dy=0;


window.onload = function() {
  canvas=document.getElementById('game-canvas');
  canvasContext = canvas.getContext('2d');
  setInterval(function() {
    console.log(headX);
    document.addEventListener("keydown", changeDirection)
    drawCanvas();
    moveSnake();
    drawApple();
    drawSnake();
  },250);
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
    case (pressKey == leftArrow && dx!=10):
      dx = -10; dy = 0; break;
      
    case (pressKey == upArrow && dy!=10):
      dx = 0; dy = -10; break;
      
    case (pressKey == rightArrow && dx!=-10):
      dx = 10; dy = 0; break;
      
    case (pressKey == downArrow && dy!=-10):
      dx = 0; dy = 10; break;
  }
}