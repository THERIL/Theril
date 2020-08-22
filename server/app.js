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
app.use(cors());

let rooms = [],
  playersToBe = [],
  players = [],
  tiles = [
    new Market(false),
    new LuxuryShop(false),
    new PoliceOffice(false),
    new TeaHouse(false),
    new WainWright(false),
    new Warehouse(false),
  ];
users = [];

let objGame = {
  players: [],
  active: "",
  currentLocation: "",
};

const g = new Game();

io.on("connection", (socket) => {
  console.log("User connected: " + socket.id);
  if (users.some((user) => user.id === socket.id))
    console.log("sudah ada username");

  socket.on("submit-username", (name) => {
    if (users.some((user) => user.id === socket.id)) {
      console.log("Splice user dengan id yang sama (Handle double-data)");
      users.splice(
        users.findIndex((user) => user.id === socket.id),
        1
      );
    }
    const user = {
      name,
      id: socket.id,
    };
    users.push(user);
    console.log(users);
    socket.emit("get-username", user);
  });
  socket.on("logout", () => {
    if (users.some((user) => user.id === socket.id)) {
      console.log("Splice user dengan id yang disconnect (Handle logout)");
      users.splice(
        users.findIndex((user) => user.id === socket.id),
        1
      );
    }
    rooms = [];
  });
  socket.on("get-all-room", () => {
    socket.emit("get-list-room", rooms);
  });

  socket.on("create-room", (data) => {
    let room = {
      name: data.roomName,
      users: [],
    };
    rooms.push(room);
    io.emit("updated-room", rooms);
  });

  socket.on("join-room", (data) => {
    socket.join(data.roomName, () => {
      let index = rooms.findIndex((item) => item.name == data.roomName);
      if (rooms[index].users.length === 2) {
        socket.emit("errorFull", "Player Already full");
        io.emit("updated-room", rooms);
      } else {
        rooms[index].users.push(data.username);
        playersToBe.push(data.username);
        io.sockets.in(data.roomName).emit("room-detail", rooms[index]);
      }
    });
  });

  socket.on("start-game", (data) => {
    const p1 = new Player(playersToBe[0].name);
    const p2 = new Player(playersToBe[1].name);
    g.assign(p1);
    g.assign(p2);
    g.setPlays();
    g.setGolds();
    g.initialize();

    objGame.players = [g.players[0], g.players[1]];
    objGame.active = g.activeCharacter;

    players.push(p1, p2);

    io.in(data.name).emit("start-game", data, objGame, tiles);
    // io.to(data.name).emit("start-game", data);
  });
  socket.on("updated-data", (data) => {
    player = players.filter((x) => x.name === g.activeCharacter);
    player[0].gold += 1;
    player[0].hasDone += 1;

    if (player[0].hasDone === 2) {
      g.checkTurn();
      player[0].hasDone = 0;
    }

    objGame.players = [players[0], g.players[1]];
    objGame.active = g.activeCharacter;

    io.in(data).emit("updated-game", objGame);
  });

  socket.on("move", (data, moveFrom, moveTo) => {
    player = players.filter((x) => x.name === g.activeCharacter);
    player[0].move((moveFrom = ""), moveTo);

    if (player[0].hasDone === 2) {
      g.checkTurn();
      player[0].hasDone = 0;
    }

    objGame.players = [players[0], g.players[1]];
    objGame.active = g.activeCharacter;
    objGame.currentLocation = player[0].currentLocation;

    io.in(data).emit("move-game", objGame);
  });

  socket.on("disconnect", () => {
    if (users.some((user) => user.id === socket.id)) {
      console.log("Splice user dengan id yang disconnect (Handle disconnect)");
      users.splice(
        users.findIndex((user) => user.id === socket.id),
        1
      );
    }
    console.log(`User ${socket.id} disconnected.`);
  });
});

server.listen(port, () => console.log(`Running on port ${port}`));
