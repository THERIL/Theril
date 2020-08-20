const { Market } = require("../logic/Tiles");
const m = new Market();

const Player = require("../logic/Player");
const player = new Player("Wyrdhn", true);
const player2 = new Player("Hehe", false);

m.transaction(player);

player2.assistants[0].work();
player2.assistants[1].work();

m.transaction(player2);

describe("Market", () => {
  test('should have name "Market', (done) => {
    expect(m.tileName).toBe("Market");
    done();
  });

  test("should not have any visitors at first", (done) => {
    expect(m.tileStatus).toBeFalsy();
    done();
  });

  test("requests should be array", (done) => {
    expect(m.requests).toBeInstanceOf(Array);
    done();
  });

  test("request should have 3 types of unit", (done) => {
    expect(m.requests.length).toBe(3);
    done();
  });

  test("should reject transactions if there are no assistants left", (done) => {
    expect(m.transaction(player2)).toEqual({
      msg: "You dont have free assistant to do this",
    });
    done();
  });
});
