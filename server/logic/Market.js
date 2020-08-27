const Tiles = require("./Tiles");
const { itemArr } = require("./Module");

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
      let result = rand > 15 ? 3 : rand > 10 ? 2 : rand > 5 ? 1 : 0;
      return result;
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
    if (player.hasDone < 2) {
      let allowed = player.assistants.filter((assistant) => !assistant.onDuty);
      if (allowed.length) {
        for (let i = 0; i < this.requests.length; i++) {
          if (player.resources[i].amount !== 0) {
            allowed[0].work(this.tileName);
            player.gold +=
              this.requests[i].type.price * player.resources[i].amount;
            player.resources[i].amount = 0;
          } else {
            return { msg: "You dont have resources to sell" };
          }
        }
        player.hasDone += 1;
      } else return { msg: "You dont have free assistant to do this" };
    } else return { msg: "It's not your turn" };
  }
}

module.exports = Market;
