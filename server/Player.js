const { itemArr } = require("./Module");
const { PoliceOffice } = require("./Tiles");

class Player {
  constructor(name, isPlayerOne) {
    this.name = name;
    this.isPlayerOne = isPlayerOne;
    this.currentLocation = "";
    this.gold = 0;
    this.cart = 0;
    this.capacity = 0;
    this.assistants = [new Assistant(), new Assistant()];
    this.resources = [];
    this.items = [];
    this.diamond = 1;
    this.movement = 1;
    this.amount();
    this.startGold();
    this.cartCapacity();
  }

  amount() {
    for (let i = 0; i < itemArr.length; i++) {
      this.resources.push({
        type: itemArr[i],
        amount: 1,
        isFull: false,
      });
    }
  }

  move(moveFrom, moveTo) {
    let cartDuty = this.assistants.filter((assistant) => !assistant.onDuty);
    if (cartDuty.length) {
      moveTo.tileStatus = true;
      moveFrom.tileStatus = false;
      this.currentLocation = moveTo.tileName;
    }
  }

  startGold() {
    this.isPlayerOne ? (this.gold = 5) : (this.gold = 8);
  }

  cartCapacity() {
    this.cart === 0
      ? (this.capacity = 2)
      : this.cart === 1
      ? (this.capacity = 3)
      : this.cart === 2
      ? (this.capacity = 4)
      : this.cart === 3
      ? (this.capacity = 5)
      : (this.capacity = 6);
  }

  sendSteal(assistant, target, player) {
    assistant.steal(target, player);
    this.getStolenItems();
  }

  getStolenItems() {
    for (let i = 0; i < this.assistants.length; i++) {
      if (this.assistants[i].stolenItem) {
        this.diamond += 1;
        this.assistants[i].stolenItem = null;
      }
    }
  }

  release(assistant) {
    assistant.onDuty = false;
  }
}

class Assistant {
  constructor() {
    this.jailed = false;
    this.potentialDuration = 6;
    this.jailedDuration = 0;
    this.onDuty = false;
    this.stealChance = 0.25;
    this.stolenItem = false;
  }

  steal(target) {
    const randomizer = Math.random();
    let isSuccess = randomizer > this.stealChance ? false : true;
    if (isSuccess) {
      target.diamond -= 1;
      this.stolenItem = true;
    } else {
      const jailRand = Math.random();
      let isJailed = jailRand > 0.25 ? false : true;
      if (isJailed) {
        this.jailed = true;
        this.jailedDuration = this.potentialDuration;
      }
    }
  }

  work() {
    this.onDuty = true;
  }
}

module.exports = Player;
