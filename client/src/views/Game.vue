<template>
  <div class="div">
    <h1>{{ game }}</h1>
    <h2>LKXJFLSDKJFLSDKFJLSDK;FJKL;</h2>
    <button @click="changeCart">change value</button>
  </div>
</template>

<script>
import socket from "../config/socket";
export default {
  data() {
    return {
      pemain: {},
      room: {},
    };
  },
  methods: {
    changeCart() {
      socket.emit("updated-data", this.room.name, this.pemain);
      // this.pemain.players[0].gold += 1;
    },
  },
  created() {
    socket.on("start-game", (data, game) => {
      console.log(data, "-------------------------gas ga?");
      // this.$store.commit("GAME_DATA", game);
      // console.log(this.pemain);
      this.pemain = game;
      this.room = data;
    });
    socket.on("updated-game", (game) => {
      this.pemain = game;
    });
  },
  computed: {
    game() {
      return this.$store.state.players;
    },
  },
};
</script>

<style></style>
