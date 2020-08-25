import { Scene } from 'phaser'
import socket from '../../config/socket.js'
import io from 'socket.io-client'



export default class PlayScene extends Scene {
  constructor() {
    super({ key: 'PlayScene' })
    this.player = ''
    this.cursors = ''
    this.room = {}
    this.tiles = []
    this.game = []
    this.activePlayer = {}
    this.pemain = {}
    this.currentLocation = ""
  }

  create() {

    this.add.image(600, 300, 'background')

    socket.emit('test')

    socket.on('dari-test', (data, game, tiles) => {
      let testTiles = JSON.parse(JSON.stringify(tiles))
      this.pemain = game.players;
      this.activePlayer = game.active;
      this.room = data;
      this.game = game;
      this.tiles.push(testTiles)
      console.log(data, game, tiles, '===============serve')
    })

    console.log(this.tiles, '===============consol')

    console.log(this.tiles[0], '===============consol bawah')

    // socket.on("room-detail", (room) => {
    //   this.room = room;
    // });


    // socket.on("connect", () => {
    //   console.log(socket.id);
    //   // this.id = socket.id;
    //   console.log("Connected to server.");
    //   // this.username = localStorage.getItem('theril-username')
    // });
    const click_to_change_value = this.add.text(100, 400, 'clickkkkkkk')
      .setInteractive()
      .on('pointerdown', () => this.changeValue())

    // const start = this.add.text(100, 400, 'STart')
    //   .setInteractive()
    //   .on('pointerdown', () => this.startGame())


    // this.add.image(600, 300, 'button');

    let clickCount = 0;
    this.clickCountText = this.add.text(100, 500, '');

    this.clickButton = this.add.image(100, 100, 'button')
      .setInteractive()
      .on('pointerdown', () => this.updateClickCountText(++clickCount))
    //   .on('pointerover', () => this.enterButtonHoverState())
    //   .on('pointerout', () => this.enterButtonRestState());

    this.updateClickCountText(clickCount);

    // for (let i = 0; i<this.tiles.length; i++ ) {

    // }

    const tilesText = this.add.text(200, 400, `tessst ${this.tiles}`)

    // button.onInputOver.add(over, this);
    // button.onInputOut.add(out, this);
    // button.onInputUp.add(up, this);


    // const bomb = this.physics.add.image(400, 200, 'bomb')
    // bomb.setCollideWorldBounds(true)
    // bomb.body.onWorldBounds = true // enable worldbounds collision event
    // bomb.setBounce(1)
    // bomb.setVelocity(200, 20)

    // this.sound.add('thud')
    // this.physics.world.on('worldbounds', () => {
    //   this.sound.play('thud', { volume: 0.75 })
    // })


    // var container = this.add.image(400, 300, 'alien', 0).setInteractive();
    // this.input.setDraggable(container);
    // container.on('pointerover', function () {
    //   bg.setTint(0x44ff44);
    // });

    // container.on('pointerout', function () {
    //   bg.clearTint();
    // });

    // this.input.on('drag', function (pointer, gameObject, dragX, dragY) {
    //   gameObject.x = dragX;
    //   gameObject.y = dragY;
    // });

    //========================================================================test 
    // this.player = this.physics.add.sprite(100, 450, 'dude');
    // this.player.setBounce(0.2);
    // this.player.setCollideWorldBounds(true);

    // this.anims.create({
    //   key: 'left',
    //   frames: this.anims.generateFrameNumbers('dude', { start: 0, end: 3 }),
    //   frameRate: 10,
    //   repeat: -1
    // });

    // this.anims.create({
    //   key: 'turn',
    //   frames: [{ key: 'dude', frame: 4 }],
    //   frameRate: 20
    // });

    // this.anims.create({
    //   key: 'right',
    //   frames: this.anims.generateFrameNumbers('dude', { start: 5, end: 8 }),
    //   frameRate: 10,
    //   repeat: -1
    // });

    // this.cursors = this.input.keyboard.createCursorKeys();




    //===== nerim dat
    // const socket = io('http://localhost:3000')
    // socket.on("connect", () => {
    //   console.log(socket.id);
    //   // this.id = socket.id;
    //   console.log("Connected to server.");
    //   // this.username = localStorage.getItem('theril-username')
    // });
    // console.log(socket, '==================')

    // socket.on("inisiate-game", (data, game, tiles) => {
    //   // this.pemain = game.players;
    //   // this.activePlayer = game.active;
    //   // this.room = data;
    //   // this.game = game;
    //   // this.tiles = tiles;
    //   console.log(data, "Connected to server.kkk");
    // });
    // socket.on("updated-game", (game) => {
    //   // this.pemain = game.players;
    //   // this.activePlayer = game.active;
    //   // this.currentLocation = game.currentLocation;
    //   console.log("Connected to server.mmm");
    // });


    // socket.on("updated-game", (game) => {
    //   // this.pemain = game.players;
    //   // this.activePlayer = game.active;
    //   // this.currentLocation = game.currentLocation;
    //   this.add.text(200, 400, `khhhjh ${game.players}`)
    // });



  }

  updateClickCountText(clickCount) {
    this.clickCountText.setText(`Button has been clicked ${clickCount} times.`);
  }

  // enterButtonHoverState() {
  //   // this.clickButton.setStyle({ fill: '#ff0' });
  // }

  // enterButtonRestState() {
  //   // this.clickButton.setStyle({ fill: '#0f0' });
  // }
  // /////start

  changeValue() {
    console.log('masukkkk changvalue=======')

    socket.emit("updated-data", this.room.name, this.game);
    // socket.emit("start-game", { name: 'test-room' });

    socket.on("updated-game", (game) => {
      this.pemain = game.players;
      this.activePlayer = game.active;
      this.currentLocation = game.currentLocation;
      console.log(this.pemain, 'masukkkk changvalue=======')
    });

    this.tilesText.setText(200, 400, `tessst udah di set ${this.tiles}`)
  }

  clickSocket() {

    // socket.emit("start-game", this.room);

    // socket.on("inisiate-game", (data, game, tiles) => {
    //   // this.pemain = game.players;
    //   // this.activePlayer = game.active;
    //   // this.room = data;
    //   // this.game = game;
    //   // this.tiles = tiles;
    //   console.log(data, tiles, '=============dari server')
    // });
  }


  update() {

    // if (this.cursors.left.isDown) {
    //   this.player.setVelocityX(-160);

    //   this.player.anims.play('left', true);
    // }
    // else if (this.cursors.right.isDown) {
    //   this.player.setVelocityX(160);

    //   this.player.anims.play('right', true);
    // }
    // else {
    //   this.player.setVelocityX(0);

    //   this.player.anims.play('turn');
    // }

    // if (this.cursors.up.isDown) {
    //   this.player.setVelocityY(-330);
    // }
  }
}
