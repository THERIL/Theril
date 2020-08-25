const app = require("express")();
const server = require("http").createServer(app);
const io = require("socket.io")(server);
const port = process.env.PORT || 3000;
const cors = require("cors");

const {
  Game,
  Player,
  Market,
  LuxuryShop,
  PoliceOffice,
  TeaHouse,
  WainWright,
  Warehouse,
} = require("./game_data");

const {
  createRoom,
  userLogin,
  userLogout,
  disconnect,
} = require("./socket/room");

const {
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
} = require("./socket/action");

app.use(cors());

let rooms = [],
  players = [],
  tiles = [
    new LuxuryShop(false),
    new WainWright(false),
    new PoliceOffice(false),
    new Market(false),
    new Warehouse(false),
    new TeaHouse(false),
  ],
  users = [];

let objGame = {
  players: [],
  active: "",
  currentLocation: "",
};

io.on("connection", (socket) => {
  console.log("User connected: " + socket.id);
  if (users.some((user) => user.id === socket.id))
    console.log("sudah ada username");

  socket.on("submit-username", async (name) => {
    let user = await userLogin(users, socket.id, name);
    socket.emit("get-username", user);
  });

  socket.on("clear-room", () => {
    rooms = [];
  });

  socket.on("logout", async () => {
    let logout = await userLogout(users, socket.id, objGame, players, rooms);
    users = logout.users;
    objGame = logout.objGame;
    players = logout.players;
  });

  socket.on("leave-room", (roomName, id) => {
    socket.leave(roomName, () => {
      let index = rooms.findIndex((item) => item.name == roomName);
      rooms[index].users.splice(
        rooms[index].users.findIndex((user) => user.id == id),
        1
      );
      io.to(roomName).emit("room-detail", rooms[index]);
    });
  });

  socket.on("exit-game", (roomName, id) => {
    socket.leave(roomName, () => {
      let index = rooms.findIndex((item) => item.name == roomName);
      rooms[index].users.splice(
        rooms[index].users.findIndex((user) => user.id == id),
        1
      );
      console.log(rooms[index], "dari exit game karena menyerah");
      io.to(rooms[index].users[0].id).emit("user-win", "You Win");
    });
  });

  socket.on("exit-game-winner", (roomName, id) => {
    socket.leave(roomName, () => {
      let index = rooms.findIndex((item) => item.name == roomName);
      rooms[index].users.splice(
        rooms[index].users.findIndex((user) => user.id == id),
        1
      );
      rooms = [];
      io.emit("get-list-room", rooms);
    });
  });

  socket.on("get-all-room", () => {
    socket.emit("get-list-room", rooms);
  });

  socket.on("create-room", (data) => {
    objGame = {};
    createRoom(data, rooms);
    io.emit("updated-room", rooms);
  });

  socket.on("join-room", (data) => {
    objGame = {};
    socket.join(data.roomName, () => {
      let index = rooms.findIndex((item) => item.name == data.roomName);
      if (rooms[index].users.length === 2) {
        socket.emit("errorFull", "Player Already full");
        io.emit("updated-room", rooms);
      } else {
        rooms[index].users.push(data.username);
        io.sockets.in(data.roomName).emit("room-detail", rooms[index]);
      }
    });
  });

  socket.on("start-game", async (data) => {
    let start = await startGame(data, objGame, players);
    players = start.players;
    io.in(data.name).emit("start-game");
    io.in(data.name).emit("inisiate-game", data, start.objGame, tiles);
  });

  socket.on("updated-data", async (data) => {
    let updated = await updatedData(players, objGame);
    players = updated.players;
    io.in(data.name).emit("updated-game", updated.objGame);
  });

  socket.on("end-turn", async (data) => {
    let end = await endTurn(objGame);
    io.in(data).emit("updated-game", end);
  });

  socket.on("move", async (data, moveFrom, moveTo) => {
    let moveAction = await move(players, moveFrom, moveTo, objGame);
    players = moveAction.players;
    io.in(data).emit("updated-game", moveAction.objGame);
  });

  socket.on("market", async (data) => {
    let market = await marketAction(players, objGame);
    players = market.players;
    io.in(data).emit("updated-game", market.objGame);
  });

  socket.on("tea-house", async (data) => {
    let teaHouse = await teaHouseAction(players, objGame);
    players = teaHouse.players;
    io.in(data).emit("updated-game", teaHouse.objGame);
  });

  socket.on("ware-house", async (data) => {
    let wareHouse = await wareHouseAction(players, objGame);
    players = wareHouse.players;
    io.in(data).emit("updated-game", wareHouse.objGame);
  });

  socket.on("wain-wright", async (data) => {
    let wainWright = await wainWrightAction(players, objGame);
    players = wainWright.players;
    io.in(data).emit("updated-game", wainWright.objGame);
  });

  socket.on("luxury-diamond", async (data) => {
    let luxuryDiamond = await luxuryDiamondAction(players, objGame);
    players = luxuryDiamond.players;
    io.in(data).emit("updated-game", luxuryDiamond.objGame);
  });

  socket.on("luxury-item", async (data, item) => {
    let luxuryItem = await luxuryItemsAction(players, item, objGame);
    players = luxuryItem.players;
    io.in(data).emit("updated-game", luxuryItem.objGame);
  });

  socket.on("free", async (data, assistant) => {
    let free = await freeAssistants(players, assistant, objGame);
    players = free.players;
    io.in(data).emit("updated-game", free.objGame);
  });

  socket.on("steal", async (data, target) => {
    let stealDiamond = await steal(players, target, objGame);
    players = stealDiamond.players;
    io.in(data).emit("updated-game", stealDiamond.objGame, stealDiamond.target);
  });

  socket.on("horns", async (data) => {
    let horns = await hornsAction(players, objGame);
    players = horns.players;
    io.in(data).emit("updated-game", horns.objGame);
  });

  socket.on("disconnect", () => {
    disconnect(users, socket.id);
  });
});

server.listen(port, () => console.log(`Running on port ${port}`));
