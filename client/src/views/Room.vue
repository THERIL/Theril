<template>
  <div class="div game-luar flex justify-center items-center">
    <div class="absolute bottom-0">
      <button class="mb-8 ml-5 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full" @click="leaveRoom">Leave Room</button>
    </div>
    <div class="game-luar-background"></div>
    <!-- <div class="mx-auto flex flex-col justify-center items-center"> -->
    <div class="p-10 justify-center items-center">
      <div>
        <h2 class="text-5xl text-white font-bold text-center">Room {{ room.name }}</h2>
      </div>

      <div class="mt-10 mx-8 flex flex-row justify-around">
        <div v-for="(user,index) in room.users" :key="index">
          <PlayerInRoom :user="user.name" :index="index" />
        </div>
      </div>
    </div>

    <div class="mt-8 flex justify-center">
      <button
        class="font-semibold btn-str text-xl p-3"
        @click="startGame"
        v-if="room.users[0].id == id && room.users.length === 2"
      >START GAME</button>
    </div>
  </div>
</template>

<script>
import socket from "../config/socket.js";
import PlayerInRoom from "../components/PlayerInRoom";
export default {
  name: "Room",
  components: {
    PlayerInRoom,
  },
  data: function () {
    return {
      room: {},
    };
  },
  created: function () {
    socket.on("room-detail", (room) => {
      this.room = room;
    });
    socket.on("start-game", () => {
      this.$router.push(`/game/${this.room.name}`);
    });
    socket.on("errorFull", (message) => {
      this.$router.push({ name: "Lobby" });
      alert(message);
    });
    socket.on("errorFull", (message) => {
      this.$router.push({ name: "Lobby" });
      alert(message);
    });
  },
  methods: {
    startGame() {
      socket.emit("start-game", this.room);
      this.$router.push(`/game/${this.room.name}`);
      // this.$store.commit("GAME_DATA", this.room);
    },
    leaveRoom() {
      socket.emit("leave-room", this.room.name, this.id);
      this.$router.push({ name: "Lobby" });
    },
  },
  computed: {
    id() {
      return this.$store.state.user.id;
    },
    // leaveRoom() {
    //   socket.emit("leave-room", this.room.name, this.id);
    //   this.$router.push({ name: "Lobby" });
    // },
  },
};
</script>

<style>
.game-luar {
  position: relative;
  display: block;
  width: 100%;
  height: 100%;
}
.game-luar-background {
  background-image: url("../assets/background-opa.png");
  position: absolute;
  left: 0;
  top: 0;
  bottom: 0;
  right: 0;
  z-index: -20;
  /* opacity: 0.6; */

  background-repeat: no-repeat;
  background-size: cover;
  overflow: hidden;
}

.btn-str {
  background-image: url("../assets/btn-1.png");
  background-size: 100%;
  color: #daa520;
  text-shadow: -1px 0 black, 0 1px black, 1px 0 black, 0 -1px black;
}
</style>
