var Missile = function(game, x, y, gameState) {
    Phaser.Sprite.call(this, game, x, y, 'rocket');

    this.anchor.setTo(0.5, 0.5);
    this.game.physics.enable(this, Phaser.Physics.ARCADE);
    this.gameState = gameState;

    this.SPEED = 250;
    this.TURN_RATE = 5;
    this.WOBBLE_LIMIT = 15;
    this.WOBBLE_SPEED = 250;
    this.SMOKE_LIFETIME = 1000;

    this.wobble = this.WOBBLE_LIMIT;
    this.game.add.tween(this)
        .to(
            { wobble: -this.WOBBLE_LIMIT },
            this.WOBBLE_SPEED, Phaser.Easing.Sinusoidal.InOut, true, 0,
            Number.POSITIVE_INFINITY, true
        );

    this.smokeEmitter = this.game.add.emitter(0, 0, 100);

    this.smokeEmitter.gravity = 0;
    this.smokeEmitter.setXSpeed(0, 0);
    this.smokeEmitter.setYSpeed(-80, -50);

    this.smokeEmitter.setAlpha(1, 0, this.SMOKE_LIFETIME,
        Phaser.Easing.Linear.InOut);

    this.smokeEmitter.makeParticles('smoke');
    this.smokeEmitter.start(false, this.SMOKE_LIFETIME, 50);
};

Missile.prototype = Object.create(Phaser.Sprite.prototype);
Missile.prototype.constructor = Missile;

Missile.prototype.update = function() {
    this.game.physics.arcade.collide(this, this.gameState.platforms);
    this.game.physics.arcade.collide(this.gameState.enemies, this, this.explode);

    var distance = this.game.math.distance(this.x, this.y,
        this.game.input.activePointer.x, this.game.input.activePointer.y);
    if (distance < 30) {
     //   this.kill();
     //   this.explode(this.x, this.y);
    }

    this.smokeEmitter.x = this.x;
    this.smokeEmitter.y = this.y;

    var targetAngle = this.game.math.angleBetween(
        this.x, this.y,
        this.game.input.activePointer.x, this.game.input.activePointer.y
    );

    targetAngle += this.game.math.degToRad(this.wobble);

    if (this.rotation !== targetAngle) {
        var delta = targetAngle - this.rotation;
        if (delta > Math.PI) delta -= Math.PI * 2;
        if (delta < -Math.PI) delta += Math.PI * 2;

        if (delta > 0) {
            this.angle += this.TURN_RATE;
        } else {
            this.angle -= this.TURN_RATE;
        }

        if (Math.abs(delta) < this.game.math.degToRad(this.TURN_RATE)) {
            this.rotation = targetAngle;
        }
    }

    this.body.velocity.x = Math.cos(this.rotation) * this.SPEED;
    this.body.velocity.y = Math.sin(this.rotation) * this.SPEED;
};

//Missile.prototype.explode = function(x, y){
 //   console.log('Overlap!');
  //  this.smokeEmitter.kill();
//}

Missile.prototype.explode = function(missile, enemy){
    this.smokeEmitter.kill();
    console.log('Overlap!');
    enemy.kill();
    missile.kill();
}
