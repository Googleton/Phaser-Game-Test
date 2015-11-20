var facingDirection;

var Enemy = function(game, x, y, gameState, target){
    Phaser.Sprite.call(this, game, x, y, 'enemy');
    this.anchor.setTo(0.5, 0.5);

    this.game = game;
    this.gameState = gameState;
    this.game.physics.enable(this, Phaser.Physics.ARCADE);
    this.body.gravity.y = 300;
    this.body.collideWorldBounds = true;
    this.target = target;

    this.animations.add('left', [0, 1], 10, true);
    this.animations.add('right', [2, 3], 10, true);

    MIN_DISTANCE = 32;
    MAX_SPEED = 250
}

Enemy.prototype = Object.create(Phaser.Sprite.prototype);
Enemy.prototype.constructor = Enemy;

Enemy.prototype.create = function() {


}

Enemy.prototype.update = function(){

    this.body.velocity.x = 0;

    var distance = this.game.math.distance(this.x, this.y, this.target.x, this.target.y);

    if (distance > MIN_DISTANCE) {
        var rotation = this.game.math.angleBetween(this.x, this.y, this.target.x, this.target.y);

        if(Math.cos(rotation) * MAX_SPEED > 0){
            this.animations.play('right');
            facingDirection = 2;
        } else {
            this.animations.play('left');
            facingDirection = 1;
        }
        this.body.velocity.x = Math.cos(rotation) * MAX_SPEED;
        //this.body.velocity.y = Math.sin(rotation) * MAX_SPEED;
    } else {
        this.body.velocity.setTo(0, 0);
        this.frame = facingDirection;
    }

    if(this.body.velocity.x == 0){
        this.frame = facingDirection;
    }

}
