const Tiles = require("./Tiles");
const { itemArr } = require("./Module");

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
    if (player.hasDone < 2) {
      let allowed = player.assistants.filter((assistant) => !assistant.onDuty);
      if (allowed.length) {
        allowed[0].work(this.tileName);
        for (let i = 0; i < this.stock.length; i++) {
          this.stock[i] -= player.capacity - player.resources[i];
          player.resources[i].amount = player.capacity;
        }
        player.hasDone += 1;
      } else return { msg: "You dont have free assistant to do this" };
    } else return { msg: "It's not your turn" };
  }
}

module.exports = Warehouse;
