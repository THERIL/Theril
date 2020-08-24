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

let dataToPhaser = "";

app.use(cors());

let rooms = [],
  messages = [],
  playersToBe = [],
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
    socket.emit("get-username", user);
    io.emit('get-connected-users', users)

    console.log('sending message to client: ' + socket.id)
    socket.emit('recieve-message', messages);
  });

  socket.on('send-message', (data) => {
    //data = {username:STRING, text:STRING}
    messages.push(data)
    io.emit('recieve-message', data)
  })
  socket.on("logout", () => {
    if (users.some((user) => user.id === socket.id)) {
      console.log("Splice user dengan id yang disconnect (Handle logout)");
      users.splice(
        users.findIndex((user) => user.id === socket.id),
        1
      );
    }
    objGame.players = [];
    players = [];
    rooms = [];
    users = [];
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
      console.log(id);
    });
  });

  socket.on("leave-room", (roomName, id) => {
    socket.leave(roomName, () => {
      let index = rooms.findIndex((item) => item.name == roomName);
      rooms[index].users.splice(
        rooms[index].users.findIndex((user) => user.id == id),
        1
      );

      io.to(rooms[index].users[0].id).emit("user-win", rooms[index]);
      io.emit("updated-room", rooms);
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
      console.log(rooms[index], "exit button dari game.vue");
      io.to(roomName).emit("user-win", rooms[index]);
      io.emit("updated-room", rooms);
    });
  });

  socket.on("get-all-room", () => {
    socket.emit("get-list-room", rooms);
  });

  socket.on("create-room", (data) => {
    objGame = {};
    let room = {
      name: data.roomName,
      users: [],
    };
    rooms.push(room);
    io.emit("updated-room", rooms);
  });

  socket.on("join-room", (data) => {
    objGame = {};
    socket.join(data.roomName, () => {
      console.log(socket.rooms, "dari join ____________");
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
    console.log(data);
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

    io.to(data.name).emit("start-game");
    io.in(data.name).emit("inisiate-game", data, objGame, tiles);
  });

  socket.on("updated-data", (data) => {
    player = players.filter((x) => x.name === g.activeCharacter);
    player[0].gold += 100;
    player[0].hasDone += 1;

    if (player[0].hasDone === 2) {
      g.checkTurn();
      player[0].hasDone = 0;
    }

    objGame.players = [players[0], g.players[1]];
    objGame.active = g.activeCharacter;
    io.in(data.name).emit("updated-game", objGame);
  });

  socket.on("end-turn", (data) => {
    g.changeTurn();

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

    io.in(data).emit("updated-game", objGame);
  });

  socket.on("market", (data) => {
    const market = new Market(false);
    player = players.filter((x) => x.name === g.activeCharacter);
    market.transaction(player[0]);
    if (player[0].hasDone === 2) {
      g.checkTurn();
      player[0].hasDone = 0;
    }

    objGame.players = [players[0], g.players[1]];
    objGame.active = g.activeCharacter;
    objGame.currentLocation = player[0].currentLocation;
    io.in(data).emit("updated-game", objGame);
  });

  socket.on("tea-house", (data) => {
    const teaHouse = new TeaHouse(false);
    player = players.filter((x) => x.name === g.activeCharacter);
    teaHouse.throwDice(player[0]);
    if (player[0].hasDone === 2) {
      g.checkTurn();
      player[0].hasDone = 0;
    }

    objGame.players = [players[0], g.players[1]];
    objGame.active = g.activeCharacter;
    objGame.currentLocation = player[0].currentLocation;
    io.in(data).emit("updated-game", objGame);
  });

  socket.on("ware-house", (data) => {
    const wareHouse = new Warehouse(false);
    player = players.filter((x) => x.name === g.activeCharacter);
    wareHouse.transaction(player[0]);
    if (player[0].hasDone === 2) {
      g.checkTurn();
      player[0].hasDone = 0;
    }

    objGame.players = [players[0], g.players[1]];
    objGame.active = g.activeCharacter;
    objGame.currentLocation = player[0].currentLocation;
    io.in(data).emit("updated-game", objGame);
  });

  socket.on("wain-wright", (data) => {
    const wainWright = new WainWright(false);
    player = players.filter((x) => x.name === g.activeCharacter);
    wainWright.upgrade(player[0]);
    if (player[0].hasDone === 2) {
      g.checkTurn();
      player[0].hasDone = 0;
    }

    objGame.players = [players[0], g.players[1]];
    objGame.active = g.activeCharacter;
    objGame.currentLocation = player[0].currentLocation;
    io.in(data).emit("updated-game", objGame);
  });

  socket.on("luxury-diamond", (data) => {
    const luxuryShop = new LuxuryShop(false);
    player = players.filter((x) => x.name === g.activeCharacter);
    luxuryShop.sellDiamond(player[0]);
    if (player[0].hasDone === 2) {
      g.checkTurn();
      player[0].hasDone = 0;
    }

    objGame.players = [players[0], g.players[1]];
    objGame.active = g.activeCharacter;
    objGame.currentLocation = player[0].currentLocation;
    io.in(data).emit("updated-game", objGame);
  });

  socket.on("luxury-item", (data, item) => {
    const luxuryShop = new LuxuryShop(false);
    player = players.filter((x) => x.name === g.activeCharacter);
    luxuryShop.transaction(player[0], item);
    if (player[0].hasDone === 2) {
      g.checkTurn();
      player[0].hasDone = 0;
    }

    objGame.players = [players[0], g.players[1]];
    objGame.active = g.activeCharacter;
    objGame.currentLocation = player[0].currentLocation;
    io.in(data).emit("updated-game", objGame);
  });

  socket.on("free", (data, assistant) => {
    player = players.filter((x) => x.name === g.activeCharacter);
    assist = player[0].assistants.filter(
      (x) => x.workLocation === assistant.workLocation
    )[0];

    player[0].release(assist);

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

    io.in(data).emit("updated-game", objGame);
  });

  socket.on("market", (data) => {
    const market = new Market();
    player = players.filter((x) => x.name === g.activeCharacter);
    market.transaction(player[0]);
    if (player[0].hasDone === 2) {
      g.checkTurn();
      player[0].hasDone = 0;
    }

    objGame.players = [players[0], g.players[1]];
    objGame.active = g.activeCharacter;
    objGame.currentLocation = player[0].currentLocation;
    io.in(data).emit("updated-game", objGame);
  });

  socket.on("tea-house", (data) => {
    const teaHouse = new TeaHouse();
    player = players.filter((x) => x.name === g.activeCharacter);
    teaHouse.throwDice(player[0]);
    if (player[0].hasDone === 2) {
      g.checkTurn();
      player[0].hasDone = 0;
    }

    objGame.players = [players[0], g.players[1]];
    objGame.active = g.activeCharacter;
    objGame.currentLocation = player[0].currentLocation;
    io.in(data).emit("updated-game", objGame);
  });

  socket.on("ware-house", (data) => {
    const wareHouse = new Warehouse();
    player = players.filter((x) => x.name === g.activeCharacter);
    wareHouse.transaction(player[0]);
    if (player[0].hasDone === 2) {
      g.checkTurn();
      player[0].hasDone = 0;
    }

    objGame.players = [players[0], g.players[1]];
    objGame.active = g.activeCharacter;
    objGame.currentLocation = player[0].currentLocation;
    io.in(data).emit("updated-game", objGame);
  });

  socket.on("wain-wright", (data) => {
    const wainWright = new WainWright();
    player = players.filter((x) => x.name === g.activeCharacter);
    wainWright.upgrade(player[0]);
    if (player[0].hasDone === 2) {
      g.checkTurn();
      player[0].hasDone = 0;
    }

    objGame.players = [players[0], g.players[1]];
    objGame.active = g.activeCharacter;
    objGame.currentLocation = player[0].currentLocation;
    io.in(data).emit("updated-game", objGame);
  });

  socket.on("luxury-diamond", (data) => {
    console.log("masuk sini -----------------------------------------");

    const luxuryShop = new LuxuryShop();
    player = players.filter((x) => x.name === g.activeCharacter);
    luxuryShop.sellDiamond(player[0]);
    if (player[0].hasDone === 2) {
      g.checkTurn();
      player[0].hasDone = 0;
    }

    objGame.players = [players[0], g.players[1]];
    objGame.active = g.activeCharacter;
    objGame.currentLocation = player[0].currentLocation;
    io.in(data).emit("updated-game", objGame);
  });

  socket.on("luxury-item", (data, item) => {
    console.log("masuk sini -----------------------------------------");

    const luxuryShop = new LuxuryShop();
    player = players.filter((x) => x.name === g.activeCharacter);
    luxuryShop.transaction(player[0], item);
    if (player[0].hasDone === 2) {
      g.checkTurn();
      player[0].hasDone = 0;
    }

    objGame.players = [players[0], g.players[1]];
    objGame.active = g.activeCharacter;
    objGame.currentLocation = player[0].currentLocation;
    io.in(data).emit("updated-game", objGame);
    socket.on("steal", (data, target) => {
      player = players.filter((x) => x.name === g.activeCharacter);

      player[0].sendSteal(target);
    });

    socket.on("free", (data) => {
      player = players.filter((x) => x.name === g.activeCharacter);
      console.log(player[0]);
      player[0].release(player[0].assistants[0]);
      player[0].release(player[0].assistants[1]);
      if (player[0].hasDone === 2) {
        g.checkTurn();
        player[0].hasDone = 0;
      }

      objGame.players = [players[0], g.players[1]];
      objGame.active = g.activeCharacter;
      objGame.currentLocation = player[0].currentLocation;
      io.in(data).emit("updated-game", objGame);
    });


    socket.on("test", () => {
      io.in(dataToPhaser.name).emit("dari-test", dataToPhaser, objGame, tiles);
    });
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
    io.emit('get-connected-users', users)
  });
})

server.listen(port, () => console.log(`Running on port ${port}`));
