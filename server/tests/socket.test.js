const io = require("socket.io-client");
// const socket = io("http://localhost:3000");
// const expect = require("expect.js");

describe("test socket", () => {
  let socket;
  beforeAll(function (done) {
    socket = io.connect("http://localhost:3000", {
      "reconnection delay": 0,
      "reopen delay": 0,
      "force new connection": true,
    });
    socket.on("connect", function () {
      console.log("worked ...");
      done();
    });
    socket.on("disconnect", function () {
      console.log("disconnected...");
    });
    socket.emit("clear-room");
  });

  describe("Test room", () => {
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
        console.log("masuk 1");
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
        console.log("masuk 2");
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
        console.log("masuk 3");
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

  afterAll(function (done) {
    if (socket.connected) {
      console.log("disconnecting...");
      socket.disconnect();
    }
    done();
  });
});
