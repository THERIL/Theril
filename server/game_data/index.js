const Game = require("../logic/Turns");
const Player = require("../logic/Player");

const { Food, Clothing, Jewelry } = require("../logic/Items");
const {
  Diamond,
  GoldenWhistle,
  ShadowHand,
  Strider,
} = require("../logic/LuxuryItems");

const { itemArr, luxItemArr } = require("../logic/Module");

const {
  LuxuryShop,
  Market,
  PoliceOffice,
  TeaHouse,
  WainWright,
  Warehouse,
} = require("../logic/Tiles");

module.exports = {
  Game,
  Food,
  Clothing,
  Jewelry,
  Diamond,
  GoldenWhistle,
  ShadowHand,
  Strider,
  itemArr,
  luxItemArr,
  LuxuryShop,
  Market,
  PoliceOffice,
  TeaHouse,
  WainWright,
  Warehouse,
  Player,
};
