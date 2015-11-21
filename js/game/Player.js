var facingDirection;

var Player = function(game, x, y, gameState){
    Phaser.Sprite.call(this, game, x, y, 'player');
    this.anchor.setTo(0.5, 0.5);

    this.game = game;
    this.gameState = gameState;
    this.game.physics.enable(this, Phaser.Physics.ARCADE);
    this.body.gravity.y = 300;
    this.body.collideWorldBounds = true;

    this.animations.add('left', [0, 1, 2, 3], 10, true);
    this.animations.add('right', [5, 6, 7, 8], 10, true);


    //Input
    this.game.input.keyboard.addKeyCapture([Phaser.Keyboard.SPACEBAR]);
    var shootKey = this.game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
    shootKey.onDown.add(this.shoot, this);

    facingDirection = 4;
}

Player.prototype = Object.create(Phaser.Sprite.prototype);
Player.prototype.constructor = Player;

Player.prototype.create = function() {


}

Player.prototype.update = function(){

    this.body.velocity.x = 0;

    if (this.gameState.cursors.left.isDown)
    {
        this.body.velocity.x = -150;
        this.animations.play('left');
        facingDirection = 0;
    }
    else if (this.gameState.cursors.right.isDown)
    {
        this.body.velocity.x = 150;
        this.animations.play('right');
        facingDirection = 7;
    }
    else
    {
        this.animations.stop();
        this.frame = facingDirection;
    }

    if (this.gameState.cursors.up.isDown && this.body.touching.down)
    {
        this.body.velocity.y = -250;
    }
}

Player.prototype.shoot = function(){
    missile = new Missile(this.game, 150, 150, this)
    this.gameState.missiles.add(missile);
}
