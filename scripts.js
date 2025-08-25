function setup() {
  createCanvas(900, 600); // Previous values 665, 480
  bgColor = 'black';
  alienPic = createImg('Smiley.png');
  alienPic.hide();
  alienX = 0;
  alienY = 430;
  alienWidth = 60;
  alienHeight = 60;
  alienSpeed = 0.03;
  points = 0;
  frameRate(60);
  noLoop();
  // create button
  button = createButton('Start');
  button.position(-400, -580, 'relative');
  button.size(80, 25);
  button.style('background', 'lime');
  button.style('color', 'white');
  button.style('font-size', '60');
  button.mouseClicked(startGame);
  // create text
  gameMessage = createElement('h1');
  gameMessage.position(815, 400);  
  gameMessage.style('color', 'black');
  gameMessage.style('font-style', 'georgia');
  endGame = createElement('h3');
  endGame.position(815, 450);
  endGame.style('color', 'white');
  endGame.style('font-style', 'georgia');  
  newSession = true;
}

function draw() {
  background(bgColor);
  // draws alien image
  image(alienPic, alienX, alienY, alienWidth, alienHeight);
  textSize(30);
  fill('white');
  text(points, 850, 48);
  textSize(30);
  fill('red');
  text('Level: ' + stage, 550, 50);
  // makes the alien follow the mouse
  distanceX = mouseX - alienX;
  alienX = distanceX * alienSpeed + alienX;
  distanceY = mouseY - alienY;
  alienY = distanceY * alienSpeed + alienY;
  // keeps alien inside the canvas
  alienX = constrain(alienX, 0, width - alienWidth);
  alienY = constrain(alienY, 0, height - alienHeight);
  // if alien touches mouse, stop game
  if (mouseX >= alienX - 1 && mouseX <= alienX + alienWidth && mouseY >= alienY - 1 && mouseY <= alienY + alienHeight) {
    gameMessage.html('Game Over');
    stopGame(); 
  }
  if (mouseX > width || mouseX < 0 || mouseY > height || mouseY < 0) {
    gameMessage.html('Out of Bounds');
    stopGame();
  }
  if (newSession === true) {
    gameMessage.html('Click start to begin');
  }
  if (frameCount % 60 === 0) {
    points++;
    if (points % 10 === 0) {
      alienSpeed = alienSpeed + 0.03;
      changeBgColor(points);
    }
  }
}

function stopGame() {
  background('white');
  textSize(30);
  fill('white');
  text(points, 850, 48);
  noLoop();
  alienX = 50;
  alienY = 550;
}

function startGame() {
  stage = 'Easy';
  points = 0;
  gameMessage.html('');
  bgColor = 'black';
  newSession = false;
  alienSpeed = 0.03;
  loop();
}

function theEnd() {
  noStroke();
  fill('white');
  ellipseMode(CENTER);
  ellipse(450, 300, 250, 250);
  noLoop();
  fill('black');
  textSize(40);
  strokeWeight(2);
  text('The end :)', 360, 300);
  fill('black');
  textSize(25);
  text('Start again ↑', 380, 340);
  bgColor = 'black';
}

function changeBgColor(points) {
  switch (points) {
    case 10:
      bgColor = '#50C878';
      stage = 'Intermediate';
      break;
    case 20:
      bgColor = '#87CEEB';
      stage = 'Hard';
      break;
    case 30:
      bgColor = '#FADA5E';
      stage = 'Advanced';
      break;
    case 40:
      bgColor = '#d4a2f5';
      stage = 'Expert';
      break;
    case 50:
      bgColor = '#ff9bec';
      stage = 'Boss';
      break;
    case 60:
      stage = 'The end';
      bgColor = '#000000';      
      theEnd();
      break;
  }
}
