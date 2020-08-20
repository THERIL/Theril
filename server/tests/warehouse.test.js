const { Warehouse } = require("../logic/Tiles");
const w = new Warehouse();

const Player = require("../logic/Player");
const player = new Player("Wyrdhn", true);
const player2 = new Player("Hehe", false);

w.transaction(player);

player2.assistants[0].work();
player2.assistants[1].work();

w.transaction(player2);

describe("Warehouse", () => {
  test("should have name", (done) => {
    expect(w.tileName).toBe("Warehouse");
    done();
  });

  test("should not have any visitors at first", (done) => {
    expect(w.tileStatus).toBeFalsy();
    done();
  });

  test("stock should be array", (done) => {
    expect(w.stock).toBeInstanceOf(Array);
    done();
  });

  test("should have 3 types of unit", (done) => {
    expect(w.stock.length).toBe(3);
    done();
  });

  test("should reject transactions if there are no assistants left", (done) => {
    expect(w.transaction(player2)).toEqual({
      msg: "You dont have free assistant to do this",
    });
    done();
  });
});
