var GameState = function(game) {
    this.game = game;
};

var cursors;
var platforms;

// Load images and sounds
GameState.prototype.preload = function() {
    this.game.load.image('rocket', 'assets/diamond.png');
    this.game.load.image('smoke', 'assets/star.png');
    this.game.load.image('ground', 'assets/ground.png');
    this.game.load.spritesheet('enemy', 'assets/baddie.png', 32, 32)
    this.game.load.spritesheet('player', 'assets/dude.png', 32, 48);
};

// Setup the example
GameState.prototype.create = function() {
    game.physics.startSystem(Phaser.Physics.ARCADE);
    this.game.stage.backgroundColor = 0x4488cc;

    this.player = new Player(this.game, this.game.width/2, this.game.height/2, this)


    enemies = game.add.group();
    enemies.enableBody = true;
    enemies.add(new Enemy(this.game, this.game.width/2, this.game.height/2, this, this.player));



    platforms = game.add.group();
    platforms.enableBody = true;

    var ground = platforms.create(0, game.world.height - 64, 'ground');
    ground.scale.setTo(2, 2);
    ground.body.immovable = true;

    this.game.input.activePointer.x = this.game.width/2;
    this.game.input.activePointer.y = this.game.height/2 - 100;

    this.cursors = game.input.keyboard.createCursorKeys();
    this.game.add.existing(this.player);

};

// The update() method is called every frame
GameState.prototype.update = function() {
    this.game.physics.arcade.collide(this.player, platforms);
    this.game.physics.arcade.collide(enemies, platforms);
};
