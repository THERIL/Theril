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

const { createRoom, joinRoom } = require("./socket/room");

let dataToPhaser = "";

app.use(cors());

let rooms = [],
  messages = [{ username: 'tester', text: 'ini text dummy' },],
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
const po = new PoliceOffice(false);

io.on("connection", (socket) => {
  console.log("User connected: " + socket.id);
  if (users.some((user) => user.id === socket.id))
    console.log("sudah ada username");

  socket.on("send-message", payload => {
    messages.push(payload)
    io.emit('recieve-message', payload)
  })

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

  socket.on("clear-room", () => {
    rooms = [];
  });

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
      console.log(rooms[index], "------------------------asdjhakjfhajkhfjkas"),
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
    // let room = {
    //   name: data.roomName,
    //   users: [],
    // };
    // rooms.push(room);
    // console.log(rooms);
    io.emit("updated-room", rooms);
  });

  socket.on("join-room", (data) => {
    objGame = {};
    socket.join(data.roomName, () => {
      // joinRoom(data, rooms);
      // console.dir(rooms, { depth: null });
      let index = rooms.findIndex((item) => item.name == data.roomName);
      // rooms[index].users = [];
      if (rooms[index].users.length === 2) {
        socket.emit("errorFull", "Player Already full");
        io.emit("updated-room", rooms);
      } else {
        rooms[index].users.push(data.username);
        // console.log(rooms[index], "dari join room");
        io.sockets.in(data.roomName).emit("room-detail", rooms[index]);
      }
    });
  });

  socket.on("start-game", (data) => {
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
    io.in(data).emit("updated-game", objGame);
  });

  socket.on("market", (data) => {
    const market = new Market(false);
    player = players.filter((x) => x.name === g.activeCharacter);

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
    io.in(data).emit("updated-game", objGame);
  });

  socket.on("tea-house", (data) => {
    const teaHouse = new TeaHouse(false);
    player = players.filter((x) => x.name === g.activeCharacter);
    let result = teaHouse.throwDice(player[0]);


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
    objGame.message = result.msg
    io.in(data).emit("updated-game", objGame);
  });

  socket.on("ware-house", (data) => {
    const wareHouse = new Warehouse(false);
    player = players.filter((x) => x.name === g.activeCharacter);
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
    io.in(data).emit("updated-game", objGame);
  });

  socket.on("wain-wright", (data) => {
    const wainWright = new WainWright(false);
    player = players.filter((x) => x.name === g.activeCharacter);
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
    io.in(data).emit("updated-game", objGame);
  });

  socket.on("luxury-diamond", (roomName) => {
    const luxuryShop = new LuxuryShop(false);
    player = players.filter((x) => x.name === g.activeCharacter);
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


    let winner = objGame.players.filter(player => {
      console.log(player.diamond)
      return player.diamond >= 6
    })
    console.log(winner, '================= win computed')
    if (winner.length) {
      io.to(roomName).emit('show-winner', `${winner[0].name} has collected 6 Diamonds!`)
      // alert('YOUWIN')
    }
    else {
      io.in(roomName).emit("updated-game", objGame);
    }
  });

  socket.on("luxury-item", (data, item) => {
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
    io.in(data).emit("updated-game", objGame);
  });

  socket.on("steal", (data, target) => {
    player = players.filter((x) => x.name === g.activeCharacter);
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
    io.in(data).emit("updated-game", objGame, target);
  });

  socket.on("horns", (data) => {
    player = players.filter((x) => x.name === g.activeCharacter);

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
    io.in(data).emit("updated-game", objGame);
  });

  socket.on("free", (data, assistant) => {
    player = players.filter((x) => x.name === g.activeCharacter);
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
    io.in(data).emit("updated-game", objGame);
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
