const createRoom = (data, rooms) => {
  let room = {
    name: data.roomName,
    users: [],
  };
  rooms.push(room);
  return rooms;
};

const userLogin = (users, id, name) => {
  if (users.some((user) => user.id === id)) {
    console.log("Splice user dengan id yang sama (Handle double-data)");
    users.splice(
      users.findIndex((user) => user.id === id),
      1
    );
  }
  const user = {
    name,
    id,
  };
  users.push(user);
  return user;
};

const userLogout = (users, id, objGame, players, rooms) => {
  if (users.some((user) => user.id === id)) {
    users.splice(
      users.findIndex((user) => user.id === id),
      1
    );
    console.log("Splice user dengan id yang disconnect (Handle logout)");
  }
  if (!users.length) {
    objGame = [];
    players = [];
    rooms = [];
    users = [];
  }
  return { users, objGame, players, users, rooms };
};

const disconnect = (users, id) => {
  if (users.some((user) => user.id === id)) {
    console.log("Splice user dengan id yang disconnect (Handle disconnect)");
    users.splice(
      users.findIndex((user) => user.id === id),
      1
    );
  }
  console.log(`User ${id} disconnected.`);
};

module.exports = { createRoom, userLogin, userLogout, disconnect };
