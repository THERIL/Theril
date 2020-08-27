const Tiles = require("./Tiles");

class WainWright extends Tiles {
  constructor(tileStatus) {
    super(tileStatus);
    this.tileName = "Wain Wright";
  }

  upgrade(player) {
    if (player.hasDone < 2) {
      let allowed = player.assistants.filter((assistant) => !assistant.onDuty);
      if (player.cart < 4) {
        if (allowed.length) {
          if (player.gold >= 7) {
            allowed[0].work(this.tileName);
            player.cart += 1;
            player.gold -= 8;
            player.cartCapacity();
            player.hasDone += 1;
          } else return { msg: "You dont have money to do this" };
        } else return { msg: "You dont have free assistant to do this" };
      } else return { msg: "Your cart is at max level" };
    } else return { msg: "It's not your turn" };
  }
}

module.exports = WainWright;
