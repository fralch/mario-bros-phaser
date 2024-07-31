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

  this.add
    .tileSprite(0, config.height - 32, config.width, 32, 'floorbricks')
    .setOrigin(0, 0);

  this.add.sprite(50, 200, 'mario').setOrigin(0, 0);
}

function update() {
  console.log('update');
}
