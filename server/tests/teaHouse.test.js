const TeaHouse = require("../logic/TeaHouse");
const Game = require("../logic/Turns");
const g = new Game();
const g2 = new Game();
const t = new TeaHouse();
const Player = require("../logic/Player");
const player = new Player("Wyrdhn");
const player2 = new Player("Hehe");
const player3 = new Player("Wuehehe");
const player4 = new Player("asdasdasd");
const player5 = new Player("546456456");

g.assign(player);
g.assign(player2);

g.setPlays();
g.setGolds();
g.initialize();

g2.assign(player3);
g2.assign(player4);

g2.setPlays();
g2.setGolds();
g2.initialize();

player.gold = 0;

player3.assistants[0].work();
player3.assistants[1].work();

t.throwDice(player);
t.throwDice(player2, 11, 5);
t.throwDice(player3);
t.throwDice(player4, 5, 11);

player4.hasDone = 2;

player5.gold = 5;

describe("Tea House", () => {
  test("should have names", (done) => {
    expect(t.tileName).toBe("Tea House");
    done();
  });
  test("should not have any visitor at first", (done) => {
    expect(t.tileStatus).toBeFalsy();
    done();
  });

  it("case: player win gamble", (done) => {
    expect(player2.gold).toBe(15);
    done();
  });

  it("case: player lose gamble", (done) => {
    expect(player4.gold).toBe(6);
    done();
  });

  it("case: player draw", (done) => {
    expect(t.throwDice(player5, 10, 10)).toEqual({ msg: "Draw" });
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

  test("should reject transaction if it's not player's turn", (done) => {
    expect(t.throwDice(player4)).toEqual({
      msg: "It's not your turn",
    });
    done();
  });
});
