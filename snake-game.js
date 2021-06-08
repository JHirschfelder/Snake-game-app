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
let travelDirection="right";
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
  switch (travelDirection) {
    case "left":
      velocityX = -20; velocityY = 0; break;
      
    case "up":
      velocityX = 0; velocityY = -20; break;
      
    case "right":
      velocityX = 20; velocityY = 0; break;
      
    case "down":
      velocityX = 0; velocityY = 20; break;
  };
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
    canvasContext.beginPath();
    canvasContext.arc(appleX+10, appleY+10, 9.75, 0, Math.PI*2,true);
    canvasContext.fill();
  };
  if (appleIsEaten==true) {
    generateNewApple();
    canvasContext.fillStyle='green';
    canvasContext.beginPath();
    canvasContext.arc(appleX+10, appleY+10, 9.75, 0, Math.PI*2,true);
    canvasContext.fill();
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
  let counter=0 
  snake.forEach(function(snakesection) {
    const ninetyDegrees=Math.PI/2
    canvasContext.fillStyle='red';
    if (counter==0) {
      switch(travelDirection) {
        case "left":
          canvasContext.beginPath();
          canvasContext.arc(snakesection.x+9.75, snakesection.y+10, 9.75, -ninetyDegrees, Math.PI-ninetyDegrees, true);
          canvasContext.fill();
          canvasContext.fillRect(snakesection.x+8.75, snakesection.y+.25, 10.75,19.5)
          break;
        case "right":
          canvasContext.beginPath();
          canvasContext.arc(snakesection.x+9.75, snakesection.y+10, 9.75, -ninetyDegrees, Math.PI-ninetyDegrees, false);
          canvasContext.fill();
          canvasContext.fillRect(snakesection.x+.25, snakesection.y+.25, 10.75,19.5)
          break;
        case "up":
          canvasContext.beginPath();
          canvasContext.arc(snakesection.x+10, snakesection.y+9.75, 9.75, 0, Math.PI, true);
          canvasContext.fill();
          canvasContext.fillRect(snakesection.x+.25, snakesection.y+8.75, 19.5,10.75)
          break;
        case "down":
          canvasContext.beginPath();
          canvasContext.arc(snakesection.x+10, snakesection.y+9.75, 9.75, 0, Math.PI, false);
          canvasContext.fill();
          canvasContext.fillRect(snakesection.x+.25, snakesection.y+.25, 19.5,10.75)
          break;
      }
    } else {
      canvasContext.fillRect(snakesection.x, snakesection.y, 19.5, 19.5)
    };
    counter+=1
  });
};

function changeDirection(event) 
{  
  const leftArrow = 37;
  const rightArrow = 39;
  const upArrow = 38;
  const downArrow = 40;
  const pressKey = event.keyCode;

  switch (true) {
    case (pressKey == leftArrow && velocityX!=20): travelDirection="left"; break;
    
    case (pressKey == upArrow && velocityY!=20): travelDirection="up"; break;
      
    case (pressKey == rightArrow && velocityX!=-20): travelDirection="right"; break;
      
    case (pressKey == downArrow && velocityY!=-20): travelDirection="down"; break;
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