const { itemArr, luxItemArr } = require("./Module");

class Tiles {
  constructor(tileStatus) {
    this.tileStatus = tileStatus;
  }
}

class LuxuryShop extends Tiles {
  constructor(tileStatus) {
    super(tileStatus);
    this.tileName = "Luxury Shop";
    this.items = [];
    this.setItems();
  }

  sellDiamond(player) {
    if (player.gold >= 40) {
      player.diamond += 1;
      player.gold -= 40;
    } else {
      console.log("You dont have enough money");
    }
  }

  setItems() {
    for (let i = 0; i < luxItemArr.length; i++) {
      this.items.push(luxItemArr[i]);
    }
  }

  transaction(player, whichItem) {
    let allowed = player.assistants.filter((assistant) => !assistant.onDuty);
    if (allowed.length) {
      allowed[0].work();
      let targetItem = this.items.filter((item) => item.name === whichItem)[0];
      console.log(targetItem);
      if (player.gold >= targetItem.price) {
        player.gold -= targetItem.price;
        player.items.push({ name: targetItem.name });

        if (
          targetItem.name === "Strider" ||
          targetItem.name === "Golden Whistle"
        ) {
          targetItem.use(player);
        }
      } else console.log("You dont have enough money");
    } else console.log("You need an assistant to do this");
  }
}

class Market extends Tiles {
  constructor(tileStatus) {
    super(tileStatus);
    this.tileName = "Market";
    this.requests = [];
    this.getRequest();
  }

  getRequest() {
    const randomizer = (_) => {
      let rand = Math.ceil(Math.random() * 20);
      return rand > 15 ? 3 : rand > 10 ? 2 : rand > 5 ? 1 : 0;
    };

    for (let i = 0; i < itemArr.length; i++) {
      this.requests.push({
        type: itemArr[i],
        request: randomizer(),
      });
    }

    return this;
  }

  transaction(player) {
    let allowed = player.assistants.filter((assistant) => !assistant.onDuty);
    if (allowed.length) {
      for (let i = 0; i < this.requests.length; i++) {
        if (
          this.requests[i].type === player.resources[i].type &&
          this.requests[i].request &&
          this.requests[i].request - player.resources[i].amount >= 0 &&
          player.resources[i].amount
        ) {
          this.requests[i].request -= player.resources[i].amount;
          player.gold +=
            this.requests[i].type.price * player.resources[i].amount;
          player.resources[i].amount = 0;
        }
      }
    }
  }
}

class Warehouse extends Tiles {
  constructor(tileStatus) {
    super(tileStatus);
    this.tileName = "Warehouse";
    this.stock = [];
    this.setStock();
  }

  setStock() {
    for (let i = 0; i < itemArr.length; i++) {
      this.stock.push({
        type: itemArr[i],
        amount: 12,
      });
    }
  }

  transaction(player) {
    let allowed = player.assistants.filter((assistant) => !assistant.onDuty);
    if (allowed.length) {
      this.stock -= player.capacity - player.resources[i];
      player.resources[i] = player.capacity;
    }
  }
}

class TeaHouse extends Tiles {
  constructor(tileStatus) {
    super(tileStatus);
    this.tileName = "Tea House";
  }

  throwDice() {}

  gamble(player) {}
}

class PoliceOffice extends Tiles {
  constructor(tileStatus) {
    super(tileStatus);
    this.tileName = "Police Office";
  }

  arrest(player, assistant) {
    assistant.jailed = true;
    assistant.jailedDuration = assistant.potentialDuration;
  }
}

class WainWright extends Tiles {
  constructor(tileStatus) {
    super(tileStatus);
  }

  upgrade(player) {
    if (player.cart < 4) {
      if (player.gold >= 7) {
        player.cart += 1;
        player.gold -= 8;
        player.cartCapacity();
      }
    } else console.log("Your cart is at MAX level");
  }
}

module.exports = {
  LuxuryShop,
  Market,
  Warehouse,
  TeaHouse,
  PoliceOffice,
  WainWright,
};
