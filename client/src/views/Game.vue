<template>
  <div class="div">
    <h1>{{ pemain }}</h1>
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
    };
  },
  methods: {
    changeCart() {
      this.pemain.players[0].gold += 1;
    },
  },
  created() {
    socket.on("start-game", (game) => {
      console.log(game, "-------------------------gas ga?");
      // this.$store.commit("GAME_DATA", game);
      // console.log(this.pemain);
      this.pemain = game;
    });
  },
  // computed: {
  //   game() {
  //     return this.$store.state.players;
  //   },
  // },
};
</script>

<style></style>
