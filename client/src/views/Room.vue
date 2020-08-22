<template>
  <div>
    <h1>{{ room }}</h1>
    <button
      class="bg-blue-900 text-gray-100 p-2"
      @click="startGame"
      v-if="room.users[0].id == id"
    >
      START GAME
    </button>
    <button class="bg-blue-900 text-gray-100 p-2" @click="leaveRoom">
      Leave Room
    </button>
  </div>
</template>

<script>
import socket from "../config/socket.js";

export default {
  name: "Room",
  data: function() {
    return {
      room: {},
    };
  },
  created: function() {
    socket.on("room-detail", (room) => {
      this.room = room;
    });
<<<<<<< HEAD
    socket.on("gas-game", (data, game) => {
      this.$router.push(`/game/${this.data.name}`);
    })
=======
    socket.on("start-game", () => {
      this.$router.push(`/game/${this.room.name}`);
      // this.$store.commit("GAME_DATA", data);
    });
>>>>>>> b155a93d16571eafbe6a043befb6b668f93ef5b0
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
  },
};
</script>

<style></style>
