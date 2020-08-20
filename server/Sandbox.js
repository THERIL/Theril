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
const player2 = new Player("Hehe", false);

console.dir(player, { depth: null });

player.sendSteal(player.assistants[0], player2);

console.dir(player, { depth: null });
// console.dir(player2, { depth: null });
