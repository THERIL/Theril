const Tiles = require("./Tiles");

class TeaHouse extends Tiles {
  constructor(tileStatus) {
    super(tileStatus);
    this.tileName = "Tea House";
  }

  randomizer() {
    let dice = Array.from({ length: 3 }, (x, y) =>
      Math.ceil(Math.random() * 6)
    ).reduce((x, y) => x + y, 0);
    console.log(dice);
    return dice;
  }

  throwDice(player, value = this.randomizer(), value2 = this.randomizer()) {
    if (player.hasDone < 2) {
      let allowed = player.assistants.filter((assistant) => !assistant.onDuty);
      if (allowed.length) {
        if (player.gold >= 5) {
          allowed[0].work(this.tileName);

          let dicePlayer = value;
          let diceAI = value2;

          if (dicePlayer > diceAI) {
            player.gold += Math.floor(player.gold / 3) + 5;
            player.hasDone += 1;
            return { msg: "You win" };
          } else if (dicePlayer < diceAI) {
            player.gold -= Math.floor(player.gold / 3);
            player.hasDone += 1;
            return { msg: "You lose" };
          } else {
            player.hasDone += 1;
            return { msg: "Draw" };
          }
        } else return { msg: "You dont have enough gold" };
      } else return { msg: "You dont have free assistant to do this" };
    } else return { msg: "It's not your turn" };
  }
}

module.exports = TeaHouse;
