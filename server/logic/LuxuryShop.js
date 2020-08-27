const Tiles = require("./Tiles");
const { luxItemArr } = require("./Module");

class LuxuryShop extends Tiles {
  constructor(tileStatus) {
    super(tileStatus);
    this.tileName = "Luxury Shop";
    this.items = [];
    this.setItems();
  }

  sellDiamond(player) {
    if (player.hasDone < 2) {
      let allowed = player.assistants.filter((assistant) => !assistant.onDuty);
      if (allowed.length) {
        if (player.gold >= 40) {
          allowed[0].work(this.tileName);
          player.diamond += 1;
          player.gold -= 40;
          player.hasDone += 1;
        } else return { msg: "You dont have enough money" };
      } else return { msg: "You need free assistant to do this" };
    } else return { msg: "It's not your turn" };
  }

  setItems() {
    for (let i = 0; i < luxItemArr.length; i++) {
      this.items.push(luxItemArr[i]);
    }
  }

  transaction(player, whichItem) {
    if (player.hasDone < 2) {
      let allowed = player.assistants.filter((assistant) => !assistant.onDuty);
      if (allowed.length) {
        let targetItem = this.items.filter(
          (item) => item.name === whichItem
        )[0];
        if (player.gold >= targetItem.price) {
          allowed[0].work(this.tileName);
          player.gold -= targetItem.price;
          player.items.push({ name: targetItem.name });
          player.hasDone += 1;

          if (
            targetItem.name === "Strider" ||
            targetItem.name === "Golden Whistle" ||
            targetItem.name === "Shadow Hand"
          ) {
            targetItem.use(player);
          }
        } else return { msg: "You dont have enough money" };
      } else return { msg: "You need free assistant to do this" };
    } else return { msg: "It's not your turn" };
  }
}

module.exports = LuxuryShop;
