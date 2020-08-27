const Tiles = require("./Tiles");

class PoliceOffice extends Tiles {
  constructor(tileStatus) {
    super(tileStatus);
    this.tileName = "Police Office";
    this.bailPrice = 15;
  }

  arrest(assistant) {
    assistant.jailed = true;
    assistant.onDuty = true;
    assistant.jailedDuration = assistant.potentialDuration;
  }

  reduceSentence(assistant) {
    if (assistant.jailedDuration > 0) {
      assistant.jailedDuration--;
    }

    if (!assistant.jailedDuration) {
      assistant.jailed = false;
      assistant.workLocation = "";
      assistant.onDuty = false;
    }
  }

  bail(player, assistant) {
    if (player.hasDone < 2) {
      if (player.gold >= this.bailPrice) {
        assistant.jailed = false;
        assistant.onDuty = false;
        assistant.jailedDuration = 0;
        player.gold -= this.bailPrice;
        player.hasDone += 1;
        assistant.workLocation = "";
      } else return { msg: "You don't have enough gold" };
    } else return { msg: "It's not your turn" };
  }
}

module.exports = PoliceOffice;
