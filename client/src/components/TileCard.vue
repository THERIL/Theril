<template>
  <div class="w-1/3">
    <div
      @click="move"
      id="tile"
      class="tile-bg p-20 m-2 bg-gray-400 text-center font-bold rounded flex justify-between"
      :style="{'background-image': 'url(' + require(`../assets/tile-0${index+1}.png`) + ')',  'background-size': 100% 'auto'}"
    >
      <audio id="move" src="../assets/move.mp3" type="audio/mpeg" />
      <div>
        <div>
          <i
            v-if="anLoc == `${index+1}`"
            class="fa fa-user fa-3x icon text-yellow-900 garmin"
            aria-hidden="true"
          ></i>
        </div>
        <div>
          <i
            v-if="pemLoc == `${index+1}`"
            class="fa fa-user fa-3x icon text-green-900 garmin"
            aria-hidden="true"
          ></i>
        </div>
      </div>

      <div>
        <div v-for="(assistant, index) in assistants1" :key="index">
          <Assistant :assistant="assistant" :tileName="tile.tileName" color="text-yellow-900" />
        </div>
        <div v-for="(assistant, index) in assistants2" :key="index">
          <Assistant :assistant="assistant" :tileName="tile.tileName" color="text-green-900" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Assistant from "../components/Assistant";
export default {
  name: "TileCard",
  data() {
    return {
      pemain: {},
      activePlayer: "",
      room: {},
      tiles: [],
      currentLocation: "",
      turn: "",
      status: [],
      anotherPlayer: {},
      jail: [],
      isSound: true,
    };
  },
  components: { Assistant },
  props: [
    "index",
    "tile",
    "game",
    "player",
    "player2",
    "assistants1",
    "assistants2",
  ],
  methods: {
    move() {
      console.log("move emit");
      var audio = document.getElementById("move");
      audio.play();
      this.$emit("clickMove");
    },
  },
  created() {
    let playerX = this.game.players.filter(
      (player) => player.id === this.user.id
    )[0];
    let playerY = this.game.players.filter(
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
  },
  computed: {
    pemLoc() {
      console.log(this.game.players[0], "------------pemain location");
      if (this.game.players[0].currentLocation === "Luxury Shop") {
        return 1;
      } else if (this.game.players[0].currentLocation === "Wain Wright") {
        return 2;
      } else if (this.game.players[0].currentLocation === "Police Office") {
        return 3;
      } else if (this.game.players[0].currentLocation === "Market") {
        return 4;
      } else if (this.game.players[0].currentLocation === "Warehouse") {
        return 5;
      } else if (this.game.players[0].currentLocation === "Tea House") {
        return 6;
      }
    },
    anLoc() {
      console.log(this.game.players[1], "---------------------anotherPlayer");
      if (this.game.players[1].currentLocation === "Luxury Shop") {
        return 1;
      } else if (this.game.players[1].currentLocation === "Wain Wright") {
        return 2;
      } else if (this.game.players[1].currentLocation === "Police Office") {
        return 3;
      } else if (this.game.players[1].currentLocation === "Market") {
        return 4;
      } else if (this.game.players[1].currentLocation === "Warehouse") {
        return 5;
      } else if (this.game.players[1].currentLocation === "Tea House") {
        return 6;
      }
    },
  },
};
</script>

<style>
.tile-bg {
  background-size: 100% auto;
  z-index: -1;
}

.icon {
  position: absolute;
  margin-left: 15px;
}

.garmin {
  margin-left: 15px;
}
</style>