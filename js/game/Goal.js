var Goal = function(game, x, y, gameState){
    Phaser.Sprite.call(this, game, x, y, 'rocket');
    this.anchor.setTo(0.5, 0.5);

    this.game = game;
    this.gameState = gameState;
    this.game.physics.enable(this, Phaser.Physics.ARCADE);

}


Goal.prototype = Object.create(Phaser.Sprite.prototype);
Goal.prototype.constructor = Goal;

Goal.prototype.update = function(){


}
