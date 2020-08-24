const createRoom = (data, rooms) => {
  let room = {
    name: data.roomName,
    users: [],
  };
  rooms.push(room);
  return rooms;
};

const joinRoom = (data, rooms) => {
  let index = rooms.findIndex((item) => item.name == data.roomName);
  // rooms[index].users = [];
  if (rooms[index].users.length === 2) {
    rooms[index];
    return rooms[index];
    // socket.emit("errorFull", "Player Already full");
    // io.emit("updated-room", rooms);
  } else {
    rooms[index].users.push(data.username);
    return rooms[index];
    // // console.log(rooms[index], "dari join room");
    // io.sockets.in(data.roomName).emit("room-detail", rooms[index]);
  }
};

module.exports = { createRoom, joinRoom };
