const {
  Game,
  Player,
  Market,
  LuxuryShop,
  PoliceOffice,
  TeaHouse,
  WainWright,
  Warehouse,
} = require("../game_data");

const g = new Game();
const po = new PoliceOffice(false);

const startGame = (data, objGame, players) => {
  players = [];
  g.players = [];
  const p1 = new Player(data.users[0].name, data.users[0].id);
  const p2 = new Player(data.users[1].name, data.users[1].id);
  g.assign(p1);
  g.assign(p2);
  g.setPlays();
  g.setGolds();
  g.initialize();
  objGame.players = [g.players[0], g.players[1]];
  objGame.active = g.activeCharacter;

  players.push(p1, p2);
  return { objGame, players };
};

const updatedData = (players, objGame) => {
  let player = players.filter((x) => x.name === g.activeCharacter);
  let jailedAssistant = player[0].assistants.filter((x) => x.jailed);

  player[0].gold += 100;
  player[0].hasDone += 1;

  if (player[0].hasDone === 2) {
    g.checkTurn();
    if (jailedAssistant.length) {
      jailedAssistant.map((x) => po.reduceSentence(x));
    }
    player[0].hasDone = 0;
  }

  objGame.players = [players[0], g.players[1]];
  objGame.active = g.activeCharacter;
  return { players, objGame };
};

const move = (players, moveFrom, moveTo, objGame) => {
  let player = players.filter((x) => x.name === g.activeCharacter);
  player[0].move((moveFrom = ""), moveTo);

  let jailedAssistant = player[0].assistants.filter((x) => x.jailed);

  if (player[0].hasDone === 2) {
    g.checkTurn();
    if (jailedAssistant.length) {
      jailedAssistant.map((x) => po.reduceSentence(x));
    }
    player[0].hasDone = 0;
  }

  objGame.players = [players[0], g.players[1]];
  objGame.active = g.activeCharacter;
  objGame.currentLocation = player[0].currentLocation;
  return { players, objGame };
};

const marketAction = (players, objGame) => {
  const market = new Market(false);
  let player = players.filter((x) => x.name === g.activeCharacter);

  let jailedAssistant = player[0].assistants.filter((x) => x.jailed);

  market.transaction(player[0]);
  if (player[0].hasDone === 2) {
    g.checkTurn();
    if (jailedAssistant.length) {
      jailedAssistant.map((x) => po.reduceSentence(x));
    }
    player[0].hasDone = 0;
  }

  objGame.players = [players[0], g.players[1]];
  objGame.active = g.activeCharacter;
  objGame.currentLocation = player[0].currentLocation;
  return { players, objGame };
};

const teaHouseAction = (players, objGame) => {
  const teaHouse = new TeaHouse(false);
  let player = players.filter((x) => x.name === g.activeCharacter);
  teaHouse.throwDice(player[0]);

  let jailedAssistant = player[0].assistants.filter((x) => x.jailed);

  if (player[0].hasDone === 2) {
    g.checkTurn();
    if (jailedAssistant.length) {
      jailedAssistant.map((x) => po.reduceSentence(x));
    }
    player[0].hasDone = 0;
  }

  objGame.players = [players[0], g.players[1]];
  objGame.active = g.activeCharacter;
  objGame.currentLocation = player[0].currentLocation;
  return { players, objGame };
};

const wareHouseAction = (players, objGame) => {
  const wareHouse = new Warehouse(false);
  let player = players.filter((x) => x.name === g.activeCharacter);
  let jailedAssistant = player[0].assistants.filter((x) => x.jailed);

  wareHouse.transaction(player[0]);

  if (player[0].hasDone === 2) {
    g.checkTurn();
    if (jailedAssistant.length) {
      jailedAssistant.map((x) => po.reduceSentence(x));
    }
    player[0].hasDone = 0;
  }

  objGame.players = [players[0], g.players[1]];
  objGame.active = g.activeCharacter;
  objGame.currentLocation = player[0].currentLocation;
  return { players, objGame };
};

const wainWrightAction = (players, objGame) => {
  const wainWright = new WainWright(false);
  let player = players.filter((x) => x.name === g.activeCharacter);
  let jailedAssistant = player[0].assistants.filter((x) => x.jailed);
  wainWright.upgrade(player[0]);
  if (player[0].hasDone === 2) {
    g.checkTurn();
    if (jailedAssistant.length) {
      jailedAssistant.map((x) => po.reduceSentence(x));
    }
    player[0].hasDone = 0;
  }

  objGame.players = [players[0], g.players[1]];
  objGame.active = g.activeCharacter;
  objGame.currentLocation = player[0].currentLocation;
  return { players, objGame };
};

const luxuryDiamondAction = (players, objGame) => {
  const luxuryShop = new LuxuryShop(false);
  let player = players.filter((x) => x.name === g.activeCharacter);
  let jailedAssistant = player[0].assistants.filter((x) => x.jailed);

  luxuryShop.sellDiamond(player[0]);

  if (player[0].hasDone === 2) {
    g.checkTurn();
    if (jailedAssistant.length) {
      jailedAssistant.map((x) => po.reduceSentence(x));
    }
    player[0].hasDone = 0;
  }

  objGame.players = [players[0], g.players[1]];
  objGame.active = g.activeCharacter;
  objGame.currentLocation = player[0].currentLocation;
  return { players, objGame };
};

const luxuryItemsAction = (players, item, objGame) => {
  const luxuryShop = new LuxuryShop(false);
  player = players.filter((x) => x.name === g.activeCharacter);
  let jailedAssistant = player[0].assistants.filter((x) => x.jailed);

  luxuryShop.transaction(player[0], item);

  if (player[0].hasDone === 2) {
    g.checkTurn();
    if (jailedAssistant.length) {
      jailedAssistant.map((x) => po.reduceSentence(x));
    }
    player[0].hasDone = 0;
  }

  objGame.players = [players[0], g.players[1]];
  objGame.active = g.activeCharacter;
  objGame.currentLocation = player[0].currentLocation;
  return { players, objGame };
};

const freeAssistants = (players, assistant, objGame) => {
  let player = players.filter((x) => x.name === g.activeCharacter);
  let assist = player[0].assistants.filter(
    (x) => x.workLocation === assistant.workLocation
  )[0];

  let jailedAssistant = player[0].assistants.filter((x) => x.jailed);

  player[0].release(assist);

  if (player[0].hasDone === 2) {
    g.checkTurn();
    if (jailedAssistant.length) {
      jailedAssistant.map((x) => po.reduceSentence(x));
    }
    player[0].hasDone = 0;
  }

  objGame.players = [players[0], g.players[1]];
  objGame.active = g.activeCharacter;
  objGame.currentLocation = player[0].currentLocation;
  return { players, objGame };
};

const steal = (players, target, objGame) => {
  let player = players.filter((x) => x.name === g.activeCharacter);
  let jailedAssistant = player[0].assistants.filter((x) => x.jailed);

  player[0].sendSteal(target);

  if (player[0].hasDone === 2) {
    g.checkTurn();
    if (jailedAssistant.length) {
      jailedAssistant.map((x) => po.reduceSentence(x));
    }
    player[0].hasDone = 0;
  }

  objGame.players = [players[0], g.players[1]];
  objGame.active = g.activeCharacter;
  objGame.currentLocation = player[0].currentLocation;
  return { players, target, objGame };
};
const hornsAction = (players, objGame) => {
  let player = players.filter((x) => x.name === g.activeCharacter);

  let jailedAssistant = player[0].assistants.filter(
    (x) => x.onDuty && !x.jailed
  );

  if (jailedAssistant.length) {
    jailedAssistant.map((x) => player[0].release(x));
  }

  if (player[0].hasDone === 2) {
    g.checkTurn();
    if (jailedAssistant.length) {
      jailedAssistant.map((x) => po.reduceSentence(x));
    }
    player[0].hasDone = 0;
  }

  objGame.players = [players[0], g.players[1]];
  objGame.active = g.activeCharacter;
  objGame.currentLocation = player[0].currentLocation;
  return { players, objGame };
};

const endTurn = (objGame) => {
  g.changeTurn();

  objGame.active = g.activeCharacter;
  return objGame;
};

module.exports = {
  move,
  marketAction,
  teaHouseAction,
  wareHouseAction,
  wainWrightAction,
  luxuryDiamondAction,
  luxuryItemsAction,
  freeAssistants,
  steal,
  hornsAction,
  startGame,
  updatedData,
  endTurn,
};
