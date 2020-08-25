<template>
  <div class="w-1/3">
    <div
      @click="move"
      id="tile"
      class="m-2 relative bg-gray-900 opacity-75 hover:opacity-100 text-center font-bold rounded flex justify-between cursor-pointer"
      style="padding-bottom:100%"
    >
      <img
        class="absolute h-full w-full object-cover"
        :src="require(`../assets/tile-0${index+1}.png`)"
        alt
      />
      <div
        class="w-full opacity-75 bg-gray-900 text-gray-100 text-2xl absolute bottom-0 hover:opacity-100"
      >{{tile.tileName}}</div>
      <!-- <img :src="'../assets/tile-0'+(index+1)+'.png'" alt /> -->
      <!-- :style="{'background-image': 'url(' + require(`../assets/tile-0${index+1}.png`) + ')',  'background-size': 100% 'auto'}" -->
      <audio id="move" src="../assets/move.mp3" type="audio/mpeg" />
      <div>
        <div>
          <i
            v-if="playerPos1 == `${index+1}`"
            class="fa fa-user fa-3x icon text-yellow-900"
            aria-hidden="true"
          ></i>
        </div>
        <div>
          <i
            v-if="playerPos2 == `${index+1}`"
            class="fa fa-user fa-3x icon text-green-900"
            aria-hidden="true"
          ></i>
        </div>
      </div>

      <div>
        <div v-for="(assistant, index) in assistants1" :key="index">
          <Assistant :assistant="assistant" :tileName="tile.tileName" color="text-yellow-900" />
        </div>
        <div v-for="(assistant, index) in assistants2" :key="index+2">
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
  data() {
    return {
      //     pemain: {},
      // activePlayer: "",
      // room: {},
      // game: {},
      // tiles: [],
      // currentLocation: "",
      // turn: "",
      // status: [],
      // anotherPlayer: {},
      // jail: [],
      // isSound: true,
    };
  },
  props: [
    "index",
    "tile",
    "player",
    "player2",
    "active",
    "assistants1",
    "assistants2",
  ],
  methods: {
    move() {
      if (this.player.name === this.active) {
        var audio = document.getElementById("move");
        audio.play();
        this.$emit("clickMove");
      }
    },
  },
  created() {
    console.log(typeof index);
    // let playerX = game.players.filter(
    //   (player) => player.id === this.user.id
    // )[0];
    // let playerY = game.players.filter(
    //   (player) => player.id !== this.user.id
    // )[0];
    // this.anotherPlayer = playerY;
    // this.pemain = playerX;
    // this.activePlayer = game.active;
    // this.room = data;
    // this.game = game;
    // this.tiles = tiles;
    // this.status = playerX.assistants.filter((x) => x.onDuty);
    // this.jail = playerX.assistants.filter((x) => x.jailed);
  },
  computed: {
    playerPos1() {
      if (this.player.currentLocation == "Luxury Shop") {
        return 1;
      } else if (this.player.currentLocation == "Wain Wright") {
        return 2;
      } else if (this.player.currentLocation == "Police Office") {
        return 3;
      } else if (this.player.currentLocation == "Market") {
        return 4;
      } else if (this.player.currentLocation == "Warehouse") {
        return 5;
      } else if (this.player.currentLocation == "Tea House") {
        return 6;
      }
    },
    playerPos2() {
      if (this.player2.currentLocation == "Luxury Shop") {
        return 1;
      } else if (this.player2.currentLocation == "Wain Wright") {
        return 2;
      } else if (this.player2.currentLocation == "Police Office") {
        return 3;
      } else if (this.player2.currentLocation == "Market") {
        return 4;
      } else if (this.player2.currentLocation == "Warehouse") {
        return 5;
      } else if (this.player2.currentLocation == "Tea House") {
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