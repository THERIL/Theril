const { TeaHouse } = require("../logic/Tiles");
const t = new TeaHouse();
const Player = require("../logic/Player");
const player = new Player("Wyrdhn", true);
const player2 = new Player("Hehe", false);
const player3 = new Player("Wuehehe", false);

player.gold = 0;

player3.assistants[0].work();
player3.assistants[1].work();

t.throwDice(player);
t.throwDice(player2);
t.throwDice(player3);

describe("Tea House", () => {
  test("should have names", (done) => {
    expect(t.tileName).toBe("Tea House");
    done();
  });
  test("should not have any visitor at first", (done) => {
    expect(t.tileStatus).toBeFalsy();
    done();
  });

  test("gambling win", (done) => {
    if (t.gamblingResult === "Player One") {
      expect(player2.gold).toBe(13);
    } else if (t.gamblingResult === "AI") {
      expect(player2.gold).toBe(3);
    } else if ((t.gamblingResult = "Draw")) {
      expect(player2.gold).toBe(8);
    }
    done();
  });

  test("should reject transaction if player dont have enough money", (done) => {
    expect(t.throwDice(player)).toEqual({ msg: "You dont have enough gold" });
    done();
  });

  test("should reject transaction if player dont have free assistants", (done) => {
    expect(t.throwDice(player3)).toEqual({
      msg: "You dont have free assistant to do this",
    });
    done();
  });
});
