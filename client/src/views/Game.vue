<template>
  <div class="div">
    <button @click="exit">Exit</button>
    <h1>{{ turn.name }}</h1>
    <h1>{{ pemain }}</h1>
    <h2>Playing: {{ activePlayer }}</h2>
    <h2>Location: {{ pemain.currentLocation }}</h2>
    <div v-if="pemain.name === activePlayer">
      <button @click="changeCart">change value</button>
      <button
        class="garmin"
        v-for="(tile, index) in tiles"
        @click="move(pemain.currentLocation, tile)"
        :key="index"
      >
        {{ tile.tileName }}
      </button>
      <button v-if="pemain.currentLocation === 'Market'" @click="market">
        Sell
      </button>
      <button
        v-if="pemain.currentLocation === 'Luxury Shop'"
        @click="luxuryDiamond"
      >
        Buy Diamond
      </button>
      <button
        v-if="pemain.currentLocation === 'Luxury Shop'"
        @click="luxuryItem('Strider')"
      >
        Buy Strider
      </button>
      <button
        v-if="pemain.currentLocation === 'Luxury Shop'"
        @click="luxuryItem('Horns')"
      >
        Buy Horns
      </button>
      <button
        v-if="pemain.currentLocation === 'Luxury Shop'"
        @click="luxuryItem('Golden Whistle')"
      >
        Buy Golden Whislte
      </button>
      <button
        v-if="pemain.currentLocation === 'Luxury Shop'"
        @click="luxuryItem('Shadow Hand')"
      >
        Buy Shadow Hand
      </button>
      <button v-if="pemain.currentLocation === 'Tea House'" @click="teaHouse">
        Gamble
      </button>
      <button
        v-if="pemain.currentLocation === 'Wain Wright'"
        @click="wainWright"
      >
        Upgrade Cart
      </button>
      <button v-if="pemain.currentLocation === 'Warehouse'" @click="wareHouse">
        Free Resources
      </button>
      <div v-if="pemain.currentLocation === 'Police Office'">
        <button v-if="jail.length" @click="bail">Bail {{ "(15 gold)" }}</button>
        <h1 v-else>You dont have jailed assistant</h1>
      </div>
      <div v-for="(location, index) in pemain.assistants" :key="index">
        <button
          v-if="
            status.length && pemain.currentLocation === location.workLocation
          "
          @click="freeAsistance(location)"
        >
          Free Assistant {{ index + 1 }}
        </button>
      </div>
      <div
        v-if="
          game.players[0].currentLocation === game.players[1].currentLocation
        "
      >
        <button @click="steal">Steal</button>
      </div>
    </div>
    <button v-if="status.length === 2" @click="endTurn">End Turn</button>
    <div v-for="(item, index) in pemain.items" :key="index">
      <h1>{{ item.name }}</h1>
    </div>
    <div v-for="(item, index) in pemain.resources" :key="index">
      <h1>{{ item.type.name }}</h1>
      <h1>{{ item.amount }}</h1>
    </div>

    <div v-if="pemain.currentLocation === 'Police Office'">
      <div v-for="(assist, index) in pemain.assistants" :key="index">
        <h1 v-if="assist.jailed">Assistant {{ index + 1 }}</h1>
      </div>
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
      status: [],
      anotherPlayer: {},
      jail: [],
    };
  },
  methods: {
    changeCart() {
      socket.emit("updated-data", this.room, this.game);
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
    freeAsistance(assistant) {
      socket.emit("free", this.room.name, assistant);
    },
    exit() {
      socket.emit("exit-game", this.room.name, this.user.id);
      this.$router.push({ name: "Lobby" });
    },
    endTurn() {
      socket.emit("end-turn", this.room.name, this.game);
    },
    steal() {
      socket.emit("steal", this.room.name, this.anotherPlayer);
    },
  },
  created() {
    socket.on("inisiate-game", (data, game, tiles) => {
      let playerX = game.players.filter(
        (player) => player.id === this.user.id
      )[0];
      let playerY = game.players.filter(
        (player) => player.id !== this.user.id
      )[0];
      this.anotherPlayer = playerY;
      this.pemain = playerX;
      this.activePlayer = game.active;
      this.room = data;
      this.game = game;
      this.tiles = tiles;
      this.status = playerX.assistants.filter((x) => x.onDuty);
      this.jail = playerX.assistants.filter((x) => x.jailed);
    });

    socket.on("updated-game", (game) => {
      let playerX = game.players.filter(
        (player) => player.id === this.user.id
      )[0];
      let playerY = game.players.filter(
        (player) => player.id !== this.user.id
      )[0];
      this.anotherPlayer = playerY;
      this.pemain = playerX;
      this.activePlayer = game.active;
      this.currentLocation = game.currentLocation;
      this.status = playerX.assistants.filter((x) => x.onDuty);
      this.jail = playerX.assistants.filter((x) => x.jailed);
      this.pemain.assistants.map((x) =>
        x.jailedDuration > 0 ? x.jailedDuration-- : x.jailedDuration
      );
    });

    socket.on("user-win", (data) => {
      alert("Another player has leave the game, You Win");
      socket.emit("exit-game-winner", this.room.name, this.user.id);
      this.$router.push({ name: "Lobby" });
    });
  },
  computed: {
    user() {
      return this.$store.state.user;
    },
  },
};
</script>

<style scoped>
.garmin {
  margin-right: 15px;
}
</style>
