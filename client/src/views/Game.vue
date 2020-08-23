<template>
  <div class="div">
    <h1>{{ pemain }}</h1>
    <h2>Playing: {{ activePlayer }}</h2>
    <h2>Location: {{ currentLocation }}</h2>
    <button @click="changeCart">change value</button>

    <button
      class="garmin"
      v-for="(tile, index) in tiles"
      @click="move(pemain.currentLocation, tile)"
      :key="index"
    >
      {{ tile.tileName }}
    </button>
  </div>
</template>

<script>
import socket from "../config/socket";
export default {
  data() {
    return {
      pemain: {},
      activePlayer: "",
      room: {},
      game: {},
      tiles: [],
      currentLocation: "",
    };
  },
  methods: {
    changeCart() {
      socket.emit("updated-data", this.room.name, this.game);
    },

    move(target, moveFrom, moveTo) {
      socket.emit("move", this.room.name, this.game, moveFrom, moveTo);
    },
  },
  created() {
    socket.on("start-game", (data, game, tiles) => {
      this.pemain = game.players;
      this.activePlayer = game.active;
      this.room = data;
      this.game = game;
      this.tiles = tiles;
    });
    socket.on("updated-game", (game) => {
      this.pemain = game.players;
      this.activePlayer = game.active;
    });

    socket.on("move-game", (game) => {
      this.pemain = game.players;
      this.activePlayer = game.active;
      this.currentLocation = game.currentLocation;
    });
  },
  // computed: {
  //   game() {
  //     return this.$store.state.players;
  //   },
  // },
};
</script>

<style scoped>
.garmin {
  margin-right: 15px;
}
</style>
