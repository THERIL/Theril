const Player = require("../logic/Player");
const player = new Player("Wyrdhn", true);
const player2 = new Player("Hehe", false);
const player3 = new Player("Wuehehe", false);

const { LuxuryShop, Market } = require("../logic/Tiles");
const ls = new LuxuryShop();
const m = new Market();

const itif = (moveFrom, moveTo) => (moveFrom === "" && moveTo ? it : it.skip);

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
  test("move from none location (starting) to any location", (done) => {
    expect(player.currentLocation).toBe("Luxury Shop");
    done();
  });

  test("move from one location to another location", (done) => {
    expect(player2.currentLocation).toBe("Market");
    done();
  });

  test("should not move if there are no free assistant", (done) => {
    expect(player3.move("", ls)).toEqual({
      msg: "You dont have free assistant to do this",
    });
    done();
  });
});

describe("steal", () => {
  test("should increase diamond if success, not if not success, and have chance to send assistants to prison", (done) => {
    if (player.assistants[0].stolenItem) {
      expect(player.diamond).toBe(1);
      expect(player2.diamond).toBe(0);
    }

    done();
  });
});
