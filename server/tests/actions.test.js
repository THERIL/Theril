const Player = require("../logic/Player");
const player = new Player("Wyrdhn");
const player2 = new Player("Hehe");
const player3 = new Player("Wuehehe");
const player4 = new Player("asdasd");
const player5 = new Player("324234234");
const player6 = new Player("657567567");

const LuxuryShop = require("../logic/LuxuryShop");
const Market = require("../logic/Market");
const ls = new LuxuryShop();
const m = new Market();

player.move("", ls);

player2.currentLocation = "Luxury Shop";

player2.move(ls, m);

player3.assistants[0].onDuty = true;
player3.assistants[1].onDuty = true;

player2.diamond = 10;

player.sendSteal(player2, 0.05);
player2.sendSteal(player, 0.5, 0.5);

player3.release(player3.assistants[0]);
player3.release(player3.assistants[1]);

player3.sendSteal(player, 0.5, 0.15);
player4.sendSteal(player);

player3.assistants[0].onDuty = true;
player3.assistants[1].onDuty = true;

player4.hasDone = 2;

player.cart = 0;
player2.cart = 1;
player3.cart = 2;
player4.cart = 3;
player5.cart = 4;

player.cartCapacity();
player2.cartCapacity();
player3.cartCapacity();
player4.cartCapacity();
player5.cartCapacity();

player5.assistants[0].onDuty = true;
player5.assistants[1].onDuty = true;

player5.diamond = 1;

player6.assistants[0].onDuty = true;
player6.assistants[1].onDuty = true;

describe("movement", () => {
  test("should move from none to location", (done) => {
    expect(player.currentLocation).toBe("Luxury Shop");
    done();
  });

  test("should move from one location to another", (done) => {
    expect(player2.currentLocation).toBe("Market");
    done();
  });

  test("should not move if it's not player's turn", (done) => {
    expect(player4.move(ls, m)).toEqual({ msg: "It's not your turn" });
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
  it("should increase diamond if true", (done) => {
    expect(player.diamond).toBe(1);
    expect(player2.diamond).toBe(9);
    done();
  });

  it("should not increase diamond if false", (done) => {
    expect(player.diamond).toBe(1);
    expect(player2.diamond).toBe(9);
    done();
  });

  it("should jail assistant if caught", (done) => {
    expect(player3.assistants[0].jailedDuration).toBe(6);
    done();
  });

  test("should reject action if it's not player's turn", (done) => {
    expect(player4.sendSteal(player2)).toEqual({
      msg: "It's not your turn",
    });
    done();
  });

  test("should reject action if target doesnt have diamond", (done) => {
    expect(player5.sendSteal(player4)).toEqual({
      msg: "Target doesn't have any diamond",
    });
    done();
  });

  test("should reject action if it's not player's turn", (done) => {
    expect(player6.sendSteal(player5)).toEqual({
      msg: "You dont have free assistant to do this",
    });
    done();
  });
});
