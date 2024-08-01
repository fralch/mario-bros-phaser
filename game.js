// game con phaser
/* global phaser*/

const config = {
  type: Phaser.AUTO, // renderiza en webgl, canvas, webgpu
  width: 256,
  height: 244,
  backgroundColor: '#049cd8',
  parent: 'juego', // donde va a renderizar o el nombre del div
  physics: {
    default: 'arcade', //
    arcade: {
      gravity: { y: 300 },
      debug: false,
    },
  },
  scene: {
    preload: preload, // funcion que se ejecuta antes de que cargue el juego
    create: create, // se ejecuta una vez cargue el juego
    update: update, // se ejecuta en cada fotograma
  },
};

const game = new Phaser.Game(config);

// this es el objeto del juego
function preload() {
  this.load.image('cloud1', 'assets/scenery/overworld/cloud1.png');
  this.load.image('floorbricks', 'assets/scenery/overworld/floorbricks.png');
  this.load.spritesheet('mario', 'assets/entities/mario.png', {
    frameWidth: 18,
    frameHeight: 16,
  });
}

function create() {
  this.add.image(100, 50, 'cloud1').setScale(0.15).setOrigin(0, 0);

  this.floor = this.physics.add.staticGroup();

  this.floor.create(0, config.height - 32, 'floorbricks').setOrigin(0, 0.5);
  this.floor.create(100, config.height - 32, 'floorbricks').setOrigin(0, 0.5);

  this.mario = this.physics.add
    .sprite(50, 100, 'mario')
    .setOrigin(0, 0)
    .setGravityY(300);

  this.physics.add.collider(this.mario, this.floor);

  this.anims.create({
    key: 'mario-walk',
    frames: this.anims.generateFrameNumbers('mario', {
      start: 3,
      end: 1,
    }),
    frameRate: 10,
    repeat: -1,
  });

  this.anims.create({
    key: 'mario-idle',
    frames: [{ key: 'mario', frame: 0 }],
  });

  this.anims.create({
    key: 'mario-jump',
    frames: [{ key: 'mario', frame: 5 }],
  });

  this.keys = this.input.keyboard.createCursorKeys();
}

function update() {
  if (this.keys.left.isDown) {
    this.mario.x -= 2;
    this.mario.anims.play('mario-walk', true);
    this.mario.flipX = true;
  } else if (this.keys.right.isDown) {
    this.mario.x += 2;
    this.mario.anims.play('mario-walk', true);
    this.mario.flipX = false;
  } else {
    this.mario.anims.play('mario-idle', true);
  }

  if (this.keys.up.isDown) {
    this.mario.y -= 2;
    this.mario.anims.play('mario-jump', true);
  }
}
