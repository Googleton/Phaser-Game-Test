var GameState = function(game) {
    this.game = game;
};

var cursors;

GameState.prototype.preload = function() {
    this.game.load.image('rocket', 'assets/diamond.png');
    this.game.load.image('smoke', 'assets/star.png');
    this.game.load.image('ground', 'assets/ground.png');
    this.game.load.spritesheet('enemy', 'assets/baddie.png', 32, 32)
    this.game.load.spritesheet('player', 'assets/dude.png', 32, 48);
};

GameState.prototype.create = function() {
    game.physics.startSystem(Phaser.Physics.ARCADE);
    this.game.stage.backgroundColor = 0x4488cc;

    this.player = new Player(this.game, this.game.width/2, this.game.height/2, this)


    this.enemy = new Enemy(this.game, this.game.width/2, this.game.height/2, this, this.player);


    this.missiles = game.add.group();
    this.missiles.enableBody = true;
    this.enemies = game.add.group();
    this.enemies.enableBody = true;
    this.enemies.add(this.enemy);
    this.enemies.add(new Enemy(this.game, 100, 200, this, this.enemy));
    goals = game.add.group();
    goals.enableBody = true;
    goals.add(new Goal(this.game, 100, 200, this));


    this.platforms = game.add.group();
    this.platforms.enableBody = true;

    var ground = this.platforms.create(0, game.world.height - 64, 'ground');
    ground.scale.setTo(2, 2);
    ground.body.immovable = true;
    this.platforms.create(0, 250, 'ground');
    this.platforms.create(600, 300, 'ground');
    this.platforms.setAll('body.immovable', true);

    this.game.input.activePointer.x = this.game.width/2;
    this.game.input.activePointer.y = this.game.height/2 - 100;

    this.cursors = game.input.keyboard.createCursorKeys();
    this.game.add.existing(this.player);

};

GameState.prototype.update = function() {
    this.game.physics.arcade.collide(this.player, this.platforms);
    this.game.physics.arcade.collide(this.enemies, this.platforms);
    this.game.physics.arcade.overlap(this.enemies, this.missiles, missileExplode);
};

GameState.prototype.render = function(){
    this.game.debug.spriteCoords(this.player, 100, 100, 000000);
}

function missileExplode(enemy, missile){
    missile.smokeEmitter.kill();
    console.log('Overlap!');
    enemy.kill();
    missile.kill();
}
