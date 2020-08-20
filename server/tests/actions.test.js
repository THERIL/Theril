const Player = require("../logic/Player");
const player = new Player("Wyrdhn", true);
const player2 = new Player("Hehe", false);
const player3 = new Player("Wuehehe", false);

const { LuxuryShop, Market } = require("../logic/Tiles");
const ls = new LuxuryShop();
const m = new Market();

player.move("", ls);

player2.move(ls, m);
player3.assistants[0].onDuty = true;
player3.assistants[1].onDuty = true;

player2.diamond = 1;

player.sendSteal(player.assistants[0], player2);

player3.release(player3.assistants[0]);
player3.release(player3.assistants[1]);

player3.assistants[0].onDuty = true;
player3.assistants[1].onDuty = true;

describe("movement", () => {
  test("move from none location (starting) to any location", () => {
    expect(player.currentLocation).toBe("Luxury Shop");
  });

  test("move from one location to another location", () => {
    expect(player2.currentLocation).toBe("Market");
  });

  test("should not move if there are no free assistant", () => {
    expect(player3.move("", ls)).toEqual({
      msg: "You dont have free assistant to do this",
    });
  });
});

describe("steal", () => {
  test("should increase diamond if success, not if not success, and have chance to send assistants to prison", (done) => {
    if (player.assistants[0].stolenItem) {
      expect(player.diamond).toBe(1);
      expect(player2.diamond).toBe(0);
    } else {
      if (player.assistants[0].jailed) {
        expect(player.assistants[0].jailedDuration).toBe(6);
      }
    }
    done();
  });
});
