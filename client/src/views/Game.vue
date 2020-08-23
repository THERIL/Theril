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
    <button v-if="currentLocation === 'Market'" @click="market">
      Sell
    </button>
    <button v-if="currentLocation === 'Luxury Shop'" @click="luxuryDiamond">
      Buy Diamond
    </button>
    <button
      v-if="currentLocation === 'Luxury Shop'"
      @click="luxuryItem('Strider')"
    >
      Buy Strider
    </button>
    <button
      v-if="currentLocation === 'Luxury Shop'"
      @click="luxuryItem('Horns')"
    >
      Buy Horns
    </button>
    <button
      v-if="currentLocation === 'Luxury Shop'"
      @click="luxuryItem('Golden Whistle')"
    >
      Buy Golden Whislte
    </button>
    <button
      v-if="currentLocation === 'Luxury Shop'"
      @click="luxuryItem('Shadow Hand')"
    >
      Buy Shadow Hand
    </button>
    <button v-if="currentLocation === 'Tea House'" @click="teaHouse">
      Gamble
    </button>
    <button v-if="currentLocation === 'Wain Wright'" @click="wainWright">
      Upgrade Cart
    </button>
    <button v-if="currentLocation === 'Warehouse'" @click="wareHouse">
      Free Resources
    </button>
    <button @click="freeAsistance">
      Free Assistance
    </button>
  </div>
</template>

<script>
import socket from "../config/socket";
// let data = {}
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
  },
  created() {
    socket.on("inisiate-game", (data, game, tiles) => {
      this.pemain = game.players;
      this.activePlayer = game.active;
      this.room = data;
      this.game = game;
      this.tiles = tiles;
    });
    socket.on("updated-game", (game) => {
      this.pemain = game.players;
      this.activePlayer = game.active;
      this.currentLocation = game.currentLocation;
    });
  },
};

// export default {

// }
</script>

<style scoped>
.garmin {
  margin-right: 15px;
}
</style>
