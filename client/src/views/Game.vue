<template>
  <div class="div">
    <button @click="exit">Exit</button>
    <h1>{{turn.name}}</h1>
    <h1>{{ pemain }}</h1>
    <h2>Playing: {{ activePlayer }}</h2>
    <h2>Location: {{ currentLocation }}</h2>
    <div v-if="pemain.name === activePlayer">
      <button @click="changeCart">change value</button>
      <button
        class="garmin"
        v-for="(tile, index) in tiles"
        @click="move(pemain.currentLocation, tile)"
        :key="index"
      >{{ tile.tileName }}</button>
      <button v-if="currentLocation === 'Market'" @click="market">Sell</button>
      <button v-if="currentLocation === 'Luxury Shop'" @click="luxuryDiamond">Buy Diamond</button>
      <button v-if="currentLocation === 'Luxury Shop'" @click="luxuryItem('Strider')">Buy Strider</button>
      <button v-if="currentLocation === 'Luxury Shop'" @click="luxuryItem('Horns')">Buy Horns</button>
      <button
        v-if="currentLocation === 'Luxury Shop'"
        @click="luxuryItem('Golden Whistle')"
      >Buy Golden Whislte</button>
      <button
        v-if="currentLocation === 'Luxury Shop'"
        @click="luxuryItem('Shadow Hand')"
      >Buy Shadow Hand</button>
      <button v-if="currentLocation === 'Tea House'" @click="teaHouse">Gamble</button>
      <button v-if="currentLocation === 'Wain Wright'" @click="wainWright">Upgrade Cart</button>
      <button v-if="currentLocation === 'Warehouse'" @click="wareHouse">Free Resources</button>
      <button @click="freeAsistance">Free Assistance</button>
    </div>
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
      turn: "",
    };
  },
  methods: {
    changeCart() {
      socket.emit("updated-data", this.room.name, this.game);
    },

    move(target, moveFrom, moveTo) {
      socket.emit("move", this.room.name, this.game, moveFrom, moveTo);
    },
    market() {
      socket.emit("market", this.room.name);
    },
    teaHouse() {
      socket.emit("tea-house", this.room.name);
    },
    wareHouse() {
      socket.emit("ware-house", this.room.name);
    },
    wainWright() {
      socket.emit("wain-wright", this.room.name);
    },
    luxuryDiamond() {
      socket.emit("luxury-diamond", this.room.name);
    },
    luxuryItem(type) {
      socket.emit("luxury-item", this.room.name, type);
    },
    freeAsistance() {
      socket.emit("free", this.room.name);
    },
    exit() {
      socket.emit("exit-game", this.room.name, this.user.id);
      // this.$router.push({ name: "Lobby" });
      this.$router.push(`/room/${this.room.name}`);
    },
  },
  created() {
    socket.on("inisiate-game", (data, game, tiles) => {
      this.pemain = game.players.filter(
        (player) => player.id === this.user.id
      )[0];
      this.activePlayer = game.active;
      this.room = data;
      this.game = game;
      this.tiles = tiles;
    });

    socket.on("updated-game", (game) => {
      this.pemain = game.players.filter(
        (player) => player.id === this.user.id
      )[0];
      this.activePlayer = game.active;
      this.currentLocation = game.currentLocation;
    });

    socket.on("user-win", (data) => {
      console.log(data.users);
      alert("You Win bgst");
      this.$router.push(`/room/${this.room.name}`);
    });
  },
  computed: {
    user() {
      return this.$store.state.user;
    },
    // status() {
    //   socket.on("user-win", () => {
    //     alert("You Win bgst");
    //     // this.$router.push({ name: "Lobby" });
    //   });
    // },
  },
};
</script>

<style scoped>
.garmin {
  margin-right: 15px;
}
</style>
