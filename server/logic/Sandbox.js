const Player = require("./Player");
const { Food, Clothing, Jewelry } = require("./Items");
const {
  GoldenWhistle,
  Strider,
  ShadowHand,
  Diamond,
} = require("./LuxuryItems");

const { itemArr, luxItemArr } = require("./Module");

const {
  LuxuryShop,
  Market,
  PoliceOffice,
  TeaHouse,
  WainWright,
  Warehouse,
} = require("./Tiles");

const player = new Player("Wyrdhn", true);
const a1 = player.assistants[0];
const a2 = player.assistants[1];
const player2 = new Player("Hehe", false);

const ls = new LuxuryShop(false);
const m = new Market(false);
const th = new TeaHouse(false);
const p = new PoliceOffice(false);
const ww = new WainWright(false);
const wh = new Warehouse(false);
player.gold = 5;
// console.dir(player, { depth: null });
console.log(th.throwDice(player));
console.log(player.gold);
// ls.transaction(player, "Shadow Hand");
// console.dir(player, { depth: null });
// console.time("Meow");

// player.gold = 20;

// p.arrest(a1);
// p.bail(player, a1);
// console.dir(player, { depth: null });

// console.dir(player, { depth: null });
// console.dir(m, { depth: null });

// m.transaction(player);

// console.log("setelah transaksi------------------------------");
// console.dir(player, { depth: null });
// console.dir(m, { depth: null });

// player2.gold = 0;
// wh.transaction(player2);
// console.dir(player2, { depth: null });
// console.log(th.throwDice(player2));

// ww.upgrade(player);
// ww.upgrade(player);

// player.release(a1);
// player.release(a2);

// ww.upgrade(player);
// ww.upgrade(player);

// console.timeEnd("Meow");

// console.dir(m, { depth: null });
