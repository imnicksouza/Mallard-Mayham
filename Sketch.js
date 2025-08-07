let duck;
let duckY, duckVY;
let gravity = 0.8;
let jumpPower = -12;
let groundY = 300;
let obstacles = [];
let score = 0;
let gameSpeed = 5;
let gameOver = false;

function preload() {
  duck = loadImage('assets/duck.png'); // placeholder sprite
}

function setup() {
  createCanvas(600, 400);
  duckY = groundY - 40;
  duckVY = 0;
}

function draw() {
  background(205, 228, 233);

  // Ground
  fill(150, 200, 150);
  rect(0, groundY, width, height - groundY);

  // Duck logic
  duckVY += gravity;
  duckY += duckVY;

  if (duckY > groundY - 40) {
    duckY = groundY - 40;
    duckVY = 0;
  }

  image(duck, 80, duckY, 40, 40);

  // Obstacles
  if (frameCount % 90 === 0) {
    obstacles.push({ x: width, w: 30, h: random(20, 60) });
  }

  for (let i = obstacles.length - 1; i >= 0; i--) {
    let obs = obstacles[i];
    obs.x -= gameSpeed;

    fill(80);
    rect(obs.x, groundY - obs.h, obs.w, obs.h);

    // Collision
    if (
      80 + 40 > obs.x &&
      80 < obs.x + obs.w &&
      duckY + 40 > groundY - obs.h
    ) {
      gameOver = true;
    }

    // Remove off-screen
    if (obs.x + obs.w < 0) {
      obstacles.splice(i, 1);
      if (!gameOver) score++;
    }
  }

  // Score
  fill(0);
  textSize(16);
  text(`Score: ${score}`, 10, 20);

  // Game Over
  if (gameOver) {
    noLoop();
    textSize(32);
    text("Game Over", width / 2 - 90, height / 2);
  }
}

function keyPressed() {
  if (key === ' ' && duckY >= groundY - 40) {
    duckVY = jumpPower;
  }
}
