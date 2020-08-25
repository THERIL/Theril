const { itemArr } = require("./Module");

class Player {
  constructor(name, id) {
    this.name = name;
    this.id = id;
    this.isPlayerOne = false;
    this.currentLocation = "";
    this.gold = 0;
    this.cart = 0;
    this.capacity = 0;
    this.assistants = [new Assistant(), new Assistant()];
    this.resources = [];
    this.items = [];
    this.diamond = 0;
    this.movement = 1;
    this.hasDone = 0;
    this.amount();
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
    if (this.hasDone < 2) {
      let cartDuty = this.assistants.filter((assistant) => !assistant.onDuty);
      if (cartDuty.length) {
        if (moveFrom.tileName === undefined || moveFrom === "") {
          moveTo.tileStatus = true;
          this.currentLocation = moveTo.tileName;
          this.hasDone += 1;
        } else {
          moveFrom.tileStatus = false;
          moveTo.tileStatus = true;
          this.currentLocation = moveTo.tileName;
          this.hasDone += 1;
        }
      } else return { msg: "You dont have free assistant to do this" };
    } else return { msg: "It's not your turn" };
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

  checkCart() {
    if (this.cart === 4) {
      this.diamond += 1;
    }
  }

  sendSteal(target, value, value2) {
    if (target.diamond >= 1) {
      if (this.hasDone < 2) {
        let allowed = this.assistants.filter((assistant) => !assistant.onDuty);
        if (allowed.length) {
          allowed[0].steal(target, value, value2);
          this.getStolenItems();
          this.hasDone += 1;
        } else return { msg: "You dont have free assistant to do this" };
      } else return { msg: "It's not your turn" };
    } else return { msg: "Target doesn't have any diamond" };
  }

  getStolenItems() {
    for (let i = 0; i < this.assistants.length; i++) {
      if (this.assistants[i].stolenItem) {
        this.diamond += 1;
        this.assistants[i].stolenItem = false;
      }
    }
  }

  release(assistant) {
    assistant.onDuty = false;
    assistant.workLocation = "";
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
    this.workLocation = "";
  }

  randomizer() {
    return Math.random();
  }

  steal(target, value = this.randomizer(), value2 = this.randomizer()) {
    let isSuccess = value > this.stealChance ? false : true;
    if (isSuccess) {
      target.diamond--;
      this.stolenItem = true;
    } else {
      let isJailed = value2 > 0.25 ? false : true;
      if (isJailed) {
        this.jailed = true;
        this.jailedDuration = this.potentialDuration;
      }
    }
  }

  work(location) {
    this.onDuty = true;
    this.workLocation = location;
  }
}

module.exports = Player;
