// Sets an initial player score of 0.
var score = 0;
document.getElementById('score').innerHTML = score;

// Enemies our player must avoid
var Enemy = function(x, y) {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started
    this.x = x;
    this.y = y;
    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    if (this.x < 505) {
        this.x += (140 * dt);
    }
    else {this.x = -100;}

	// If the enemy and the player collide.
    if(this.x < player.x + 40 &&
       this.x + 80 > player.x && 
       this.y < player.y + 80 && 
       this.y + 40 > player.y) {
		score = 0;
		document.getElementById('score').innerHTML = score;
		player.reset();
    }
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.

var Player = function () {
    this.sprite = 'images/char-boy.png';
    this.x = 210;
    this.y = 330;
};

// Is called every time the player position is updated
Player.prototype.update = function() {
 	
	// If the player reaches the water
	if (player.y < 40) {
	score++;
	document.getElementById('score').innerHTML = score;
	this.reset();
}
};

Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

Player.prototype.handleInput = function(direction) {
    if(direction == 'left' && this.x > 3) {
        this.x -= 60;
    }
    if(direction == 'right' && this.x < 400) {
        this.x += 60;
    }
    if(direction == 'up' && this.y > 3) {
        this.y -= 60;
    }
    if(direction == 'down' && this.y < 400) {
        this.y += 60;
    }
};

// Is called when the player is reset to the starting point
Player.prototype.reset = function() {
    this.x = 210;
    this.y = 330;
};

// Now instantiate your objects.
var enemy1 = new Enemy(-110, 50);
var enemy2 = new Enemy(-190, 150);
var enemy3 = new Enemy(-290, 220);
var enemy4 = new Enemy(-390, 150);
var enemy5 = new Enemy(-490, 50);
var enemy6 = new Enemy(-890, 220);

// Place all enemy objects in an array called allEnemies
var allEnemies = [enemy1, enemy2, enemy3, enemy4, enemy5, enemy6];
// Place the player object in a variable called player
var player = new Player();



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