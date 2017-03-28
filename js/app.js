// Enemies our player must avoid
var Enemy = function(x, y, speed) {
    'use strict';
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
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

    if (this.x > 505) {
        this.x = -158;
    }
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};


// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.

var Player = function(x, y, sprite){
    this.speed = 50;
    this.sprite = 'images/char-boy.png';
    this.reset();
};

// Reset method
Player.prototype.reset = function() {
    this.x = 200;
    this.y =400;
};

Player.prototype.update = function(dt) {
    this.checkCollision();

    if (this.y < 20) {
        $('#won').show();  //for a popup window
        $('.success').click(function() {
            $('#won').hide();
            document.location.reload();
        });
        this.reset();
    }
};

Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Assigning the keyboard keys for the player movement
Player.prototype.handleInput = function(keypress) {
    // to restrict player movement, a constant is used instead of direct magic number(400).
    var borderEdge = 400;
    if (keypress === 'left' && this.x > 0) {
        this.x -= this.speed;
    } else if (keypress === 'right' && this.x < borderEdge) {
        this.x += this.speed;
    } else if (keypress === 'up' && this.y > 0) {
        this.y -= this.speed;
    } else if (keypress === 'down' && this.y < borderEdge ) {
        this.y += this.speed;
    }
};


// To check if the player is colliding with the enemy

Player.prototype.checkCollision = function() {
    for(i = 0; i < 5; i++) {   // index of allEnemies array
        if (allEnemies[i].x < this.x + 70 &&
            allEnemies[i].x + 70 > this.x &&
            allEnemies[i].y < this.y + 70 &&
            70 + allEnemies[i].y > this.y) {
            console.log("player collided with the enemy!");
            this.reset();
        }
    }
};


// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player

var enemy1 = new Enemy(-325, 50, 50);
var enemy2 = new Enemy(-270, 150, 100);
var enemy3 = new Enemy(-100, 220, 130);
var enemy4 = new Enemy(-20, 150, 90);
var enemy5 = new Enemy(-150, 50, 175);

var allEnemies = [enemy1, enemy2, enemy3, enemy4, enemy5];
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

