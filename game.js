// game con phaser
/* global phaser*/

import { createAnimations } from './animations.js';

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

  this.floor
    .create(0, config.height - 16, 'floorbricks')
    .setOrigin(0, 0.5)
    .refreshBody();
  this.floor
    .create(150, config.height - 16, 'floorbricks')
    .setOrigin(0, 0.5)
    .refreshBody();

  this.mario = this.physics.add
    .sprite(50, 100, 'mario')
    .setOrigin(0, 0)
    .setGravityY(300)
    .setCollideWorldBounds(true);

  this.physics.world.setBounds(0, 0, 2000, config.height);
  this.physics.add.collider(this.mario, this.floor);

  this.cameras.main.setBounds(0, 0, 2000, config.height);
  this.cameras.main.startFollow(this.mario, true, 0.05, 0.05);

  createAnimations(this);

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
    this.mario.y -= 5;
    this.mario.anims.play('mario-jump', true);
  }

  if (this.mario.y >= config.height - 20) {
    this.mario.anims.play('mario-dead', true);
    // this.mario.destroy();
  }
}
