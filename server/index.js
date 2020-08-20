const app = require("express")();
const server = require("http").createServer(app);
const io = require("socket.io")(server);
const port = process.env.PORT || 3000;
const cors = require("cors");

app.use(cors());

let rooms = [];

io.on("connection", (socket) => {
  socket.on("clear-room", () => {
    rooms = [];
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
      // console.log(rooms[index], "dari join room");
    });
  });

  socket.on("start-game", (data) => {
    // console.log(data);
    io.to(data.name).emit("start-game", data);
  });
});

server.listen(port, () => console.log(`Running on port ${port}`));
