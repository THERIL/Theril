const app = require("express")();
const server = require("http").createServer(app);
const io = require("socket.io")(server);
const port = process.env.PORT || 3000;
const cors = require("cors");
const Game = require("./logic/Turns");
const Player = require("./logic/Player");
app.use(cors());

let rooms = [],
  players = [],
  users = [];

io.on("connection", (socket) => {
  console.log("User connected: " + socket.id);
  if (users.some(user => user.id === socket.id)) console.log('sudah ada username')

  socket.on("submit-username", (name) => {
    if (users.some(user => user.id === socket.id)) {
      console.log('Splice user dengan id yang sama (Handle double-data)')
      users.splice(users.findIndex(user => user.id === socket.id), 1)
    }
    const user = {
      name,
      id: socket.id,
    };
    users.push(user);
    console.log(users)
    socket.emit("get-username", user);
  });
  socket.on("logout", () => {
    if (users.some(user => user.id === socket.id)) {
      console.log('Splice user dengan id yang disconnect (Handle logout)')
      users.splice(users.findIndex(user => user.id === socket.id), 1)
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
        io.sockets.in(data.roomName).emit("room-detail", rooms[index]);
      }
    });
  });

  socket.on("start-game", (data) => {
    // console.log(data);
    const game = new Game();
    const p1 = new Player(data.users[0]);
    const p2 = new Player(data.users[1]);
    game.assign(p1);
    game.assign(p2);
    game.setPlays();
    game.setGolds();
    game.initialize();
    io.in(data.name).emit("start-game", data, game);
    // io.to(data.name).emit("start-game", data);
  });
  socket.on("updated-data", (data, game) => {
    console.log(data);
    console.log(game);
    game.players[0].gold += 1;
    io.in(data).emit("updated-game", game);
  });

  socket.on('disconnect', () => {
    if (users.some(user => user.id === socket.id)) {
      console.log('Splice user dengan id yang disconnect (Handle disconnect)')
      users.splice(users.findIndex(user => user.id === socket.id), 1)
    }
    console.log((`User ${socket.id} disconnected.`))
  })
});

server.listen(port, () => console.log(`Running on port ${port}`));
