var Enemy = function(x, y, speed) {

  this.x = x;
  this.y = y;
  this.speed = speed;


  this.sprite = 'images/enemy-bug.png';
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
  // You should multiply any movement by the dt parameter
  // which will ensure the game runs at the same speed for
  // all computers.
  this.x += this.speed * dt;

  // when off canvas, reset position of enemy to move across again
  if (this.x > 550) {
    this.x = -100;
    this.speed = 100 + Math.floor(Math.random() * 512);
  }

  // Check for collision between player and enemies
  if (player.x >= this.x - 30 && player.x <= this.x + 30) {
      if (player.y >= this.y - 30 && player.y <= this.y + 30) {
          player.reset();
      }
  }
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
  ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
var Player = function(x, y, speed) {
  this.x = x;
  this.y = y;
  this.speed = speed;
  this.sprite = 'images/char-boy.png';
};

Player.prototype.update = function() {
  // Prevent player from moving beyond canvas wall boundaries
  if (this.y > 380) {
    this.y = 380;
  }
  if (this.x > 400) {
    this.x = 400;
  }
  if (this.x < 0) {
    this.x = 0;
  }

  // Check for player reaching top 
  if (this.y < 0) {
    this.x = 200;
    this.y = 380;
  }
};

Player.prototype.reset = function() {
    this.x = 200;
    this.y = 400;
};


Player.prototype.render = function() {
  ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

Player.prototype.handleInput = function(keyPress) {
  switch (keyPress) {
    case 'left':
      this.x -= this.speed + 50;
      break;
    case 'up':
      this.y -= this.speed + 30;
      break;
    case 'right':
      this.x += this.speed + 50;
      break;
    case 'down':
      this.y += this.speed + 30;
      break;
  }
};

// Now instantiate your objects.

var allEnemies = [];

// Position "y" where the enemies are created
var enemyPosition = [60, 140, 220];
var player = new Player(200, 380, 50);
var enemy;

enemyPosition.forEach(function(posY) {
  enemy = new Enemy(0, posY, 100 + Math.floor(Math.random() * 512));
  allEnemies.push(enemy);
});

//Greskaaaaaa 
document.addEventListener("touchstart", touchHandler);
document.addEventListener("touchmove", touchHandler
// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
  var allowedKeys = {
    37: 'left',
    38: 'up',
    39: 'right',
    40: 'down'
  };

  player.handleInput(allowedKeys[e.keyCode]);
});
