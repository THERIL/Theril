const { PoliceOffice } = require("../logic/Tiles");
const p = new PoliceOffice();

const Player = require("../logic/Player");
const player = new Player("Wyrdhn", true);
const player2 = new Player("Hehe", false);
const player3 = new Player("asdasd", false);

player2.gold = 100;
player3.hasDone = 2;

p.arrest(player.assistants[0]);
p.arrest(player.assistants[1]);
p.arrest(player2.assistants[0]);

p.bail(player, player.assistants[1]);
p.bail(player2, player2.assistants[0]);

p.arrest(player3.assistants[0]);
p.arrest(player3.assistants[1]);

player3.assistants[1].jailedDuration = 0;

p.reduceSentence(player3.assistants[0]);
p.reduceSentence(player3.assistants[1]);

describe("Police Office", () => {
  test("should have name", (done) => {
    expect(p.tileName).toBe("Police Office");
    done();
  });

  test("should not have visitor at first", (done) => {
    expect(p.tileStatus).toBeFalsy();
    done();
  });

  test("should be able to arrest player's assitant", (done) => {
    expect(player.assistants[0].jailedDuration).toBe(6);
    done();
  });

  test("should not bail if player dont have enough money", (done) => {
    expect(player.assistants[1].jailed).toBeTruthy();
    done();
  });

  test("should bail if player  have enough money", (done) => {
    expect(player2.assistants[0].jailed).toBeFalsy();
    done();
  });

  test("should reduce player's money", (done) => {
    expect(player2.gold).toBe(85);
    done();
  });

  test("should not bail if it's not player's turn", (done) => {
    expect(p.bail(player3, player.assistants[0])).toEqual({
      msg: "It's not your turn",
    });
    done();
  });

  test("should reduce sentence per turn", (done) => {
    expect(player3.assistants[0].jailedDuration).toBe(5);
    done();
  });

  test("should free after sentence over", (done) => {
    expect(player3.assistants[1].jailed).toBeFalsy();
    done();
  });
});
