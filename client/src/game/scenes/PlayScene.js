import { Scene } from 'phaser'


export default class PlayScene extends Scene {
  constructor() {
    super({ key: 'PlayScene' })
  }

  create() {
    // this.add.image(400, 300, 'sky')
    this.add.image(600, 300, 'background')

    // this.add.image(600, 300, 'button');

    let clickCount = 0;
    this.clickCountText = this.add.text(100, 500, '');

    this.clickButton = this.add.image(100, 100, 'button')
      .setInteractive()
      .on('pointerdown', () => this.updateClickCountText(++clickCount))
      .on('pointerover', () => this.enterButtonHoverState())
      .on('pointerout', () => this.enterButtonRestState());

    this.updateClickCountText(clickCount);
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


    var container = this.add.image(400, 300, 'alien', 0).setInteractive();
    this.input.setDraggable(container);
    // container.on('pointerover', function () {
    //   bg.setTint(0x44ff44);
    // });

    // container.on('pointerout', function () {
    //   bg.clearTint();
    // });

    this.input.on('drag', function (pointer, gameObject, dragX, dragY) {
      gameObject.x = dragX;
      gameObject.y = dragY;
    });

  }

  updateClickCountText(clickCount) {
    this.clickCountText.setText(`Button has been clicked ${clickCount} times.`);
  }

  enterButtonHoverState() {
    this.clickButton.setStyle({ fill: '#ff0' });
  }

  enterButtonRestState() {
    this.clickButton.setStyle({ fill: '#0f0' });
  }
  // up() {
  //   console.log('button up', arguments);
  // }

  // over() {
  //   console.log('button over');
  // }

  // out() {
  //   console.log('button out');
  // }

  // actionOnClick() {

  //   background.visible = !background.visible;

  // }

  update() {

  }
}
