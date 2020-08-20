const io = require("socket.io-client");
const socket = io("http://localhost:3000");
// const expect = require("expect.js");

describe("test socket", () => {
  let temp;
  beforeEach(function (done) {
    temp = io.connect("http://localhost:3000", {
      "reconnection delay": 0,
      "reopen delay": 0,
      "force new connection": true,
    });
    temp.on("connect", function () {
      console.log("worked ...");
      done();
    });
    temp.on("disconnect", function () {
      console.log("disconnected...");
    });
  });

  afterEach(function (done) {
    if (temp.connected) {
      console.log("disconnecting...");
      temp.disconnect();
    }
    done();
  });
});

describe("Room Test", () => {
  test("create room", (done) => {
    const payload = {
      roomName: "Test",
    };
    socket.emit("create-room", payload);
    socket.on("updated-room", (data) => {
      expect(data).toBeInstanceOf(Array);
      done();
    });
  });

  test("user 1 join room", (done) => {
    const payload = {
      roomName: "Test",
      username: "Alfonso",
    };
    socket.emit("join-room", payload);
    socket.on("room-detail", (data) => {
      expect(data).toBeInstanceOf(Object);
      done();
    });
  });

  test("user 2 join room", (done) => {
    const payload = {
      roomName: "Test",
      username: "Sakra",
    };
    socket.emit("join-room", payload);
    socket.on("room-detail", (data) => {
      expect(data).toBeInstanceOf(Object);
      done();
    });
  });

  test("user 3 join room", (done) => {
    const payload = {
      roomName: "Test",
      username: "Nicko",
    };
    socket.emit("join-room", payload);
    socket.on("errorFull", (message) => {
      expect(message).toBe("Player Already full");
    });
    socket.on("updated-room", (data) => {
      expect(data).toBeInstanceOf(Array);
      done();
    });
  });

  test("start play", (done) => {
    const room = {
      name: "Test",
      users: ["Alfonso", "Sakra"],
    };
    socket.emit("start-game", room);
    socket.on("start-game", (room) => {
      expect(room).toBeDefined();
      done();
    });
  });
});
