<template>
  <div>
    <h1>{{ room }}</h1>
    <button
      class="bg-blue-900 text-gray-100 p-2"
      @click="startGame"
      v-if="room.users[0].id == id && room.users.length === 2"
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
    socket.on("start-game", () => {
      this.$router.push(`/game/${this.room.name}`);
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
