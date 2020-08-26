<template>
  <div class="w-1/3 tile relative">
    <div
      @click="move"
      id="tile"
      class="m-2 relative bg-gray-900 opacity-75 hover:opacity-100 text-center font-bold rounded flex justify-between cursor-pointer"
      style="padding-bottom:75%"
    >
      <img
        class="absolute h-full w-full object-cover"
        :src="require(`../assets/tile-0${index + 1}.png`)"
        alt
      />
      <div
        class="w-full opacity-75 bg-gray-900 text-gray-100 text-2xl absolute bottom-0 hover:opacity-100"
      >{{ tile.tileName }}</div>
      <!-- <img :src="'../assets/tile-0'+(index+1)+'.png'" alt /> -->
      <!-- :style="{'background-image': 'url(' + require(`../assets/tile-0${index+1}.png`) + ')',  'background-size': 100% 'auto'}" -->
      <audio id="move" src="../assets/move.mp3" type="audio/mpeg" />
      <div class="icon">
        <div class="player flex flex-col">
          <div class="flex">
            <div
              v-if="playerPos1 == `${index + 1}`"
              class="avatar floating bg-red-600"
              aria-hidden="true"
            ></div>
            <div v-for="(assistant, index) in assistants1" :key="index" class="flex">
              <Assistant :assistant="assistant" :tileName="tile.tileName" color="text-red-600" />
            </div>
          </div>
          <div class="flex">
            <div
              v-if="playerPos2 == `${index + 1}`"
              class="avatar floating bg-blue-600"
              aria-hidden="true"
            ></div>
            <div v-for="(assistant, index) in assistants2" :key="index + 2" class="flex">
              <Assistant :assistant="assistant" :tileName="tile.tileName" color="text-blue-600" />
            </div>
          </div>
        </div>
      </div>
    </div>
    <!--- button============================================================== -->
    <!-- Button Police Office -->
    <div
      class="absolute top-0 mt-40 w-full"
      v-if="
        tile.tileName === 'Police Office' &&
          player.currentLocation === 'Police Office' &&
          player.name === active
      "
    >
      <div class="w-full flex justify-center" v-if="jail.length">
        <button
          v-for="(assist, index) in jail"
          class="w-1/2 mt-2 bg-orange-800 text-gray-100 px-2 py-1 font-semibold"
          @click="bail(index)"
          :key="index"
        >Assistant {{ index + 1 }} (15 gold)</button>
      </div>
      <div v-else class="w-full flex justify-center">
        <p class="text-gray-100 font-bold">You dont have jailed assistant</p>
      </div>
    </div>
    <!--- button= warehouse-->
    <div class="absolute top-0 mt-40 w-full flex justify-center">
      <button
        class="bg-orange-800 text-gray-100 px-2 py-1 font-semibold"
        v-if="
          tile.tileName === 'Warehouse' &&
            player.currentLocation === 'Warehouse' &&
            player.name === active && !checkFull

        "
        @click="wareHouse"
      >Free Resources</button>
      <div
        v-else-if="tile.tileName === 'Warehouse' &&
            player.currentLocation === 'Warehouse' &&
            player.name === active && checkFull"
        class="w-full flex justify-center"
      >
        <p class="text-gray-100 font-bold">Your cart is full</p>
      </div>
    </div>
    <!--- button= market-->
    <div class="absolute top-0 mt-40 w-full flex justify-center">
      <button
        class="bg-yellow-800 text-gray-100 px-2 py-1 font-semibold"
        v-if="
          tile.tileName === 'Market' &&
            player.currentLocation === 'Market' &&
            player.name === active
        "
        @click="market"
      >Sell</button>
    </div>
    <!--- button= teaHouse-->
    <div class="absolute top-0 mt-40 w-full flex justify-center">
      <button
        class="bg-orange-800 rounded text-xs m-1 text-gray-100 px-2 py-1 font-semibold"
        v-if="
          tile.tileName === 'Tea House' &&
            player.currentLocation === 'Tea House' &&
            player.name === active
        "
        @click="teaHouse"
      >Gamble</button>
    </div>
    <!--- button= wainWright-->
    <div class="absolute top-0 mt-40 w-full flex justify-center">
      <button
        class="bg-orange-800 rounded text-xs m-1 text-gray-100 px-2 py-1 font-semibold"
        v-if="
          tile.tileName === 'Wain Wright' &&
            player.currentLocation === 'Wain Wright' &&
            player.name === active &&
            player.cart < 4
        "
        @click="wainWright"
      >Upgrade Cart</button>
      <p
        class="font-semibold text-xs text-gray-100"
        v-else-if="
          tile.tileName === 'Wain Wright' &&
            player.currentLocation === 'Wain Wright' &&
            player.cart >= 4
        "
      >Your cart is already max level</p>
    </div>
    <!--- button= luxury shop-->
    <div class="absolute top-0 mt-40 w-full flex flex-wrap justify-center">
      <button
        class="bg-blue-800 rounded text-xs m-1 text-gray-100 px-2 py-1 font-semibold"
        v-if="
          tile.tileName === 'Luxury Shop' &&
            player.currentLocation === 'Luxury Shop' &&
            player.name === active
        "
        @click="luxuryDiamond"
      >Buy Diamond</button>
      <button
        class="bg-blue-800 rounded text-xs m-1 text-gray-100 px-2 py-1 font-semibold"
        v-if="
          tile.tileName === 'Luxury Shop' &&
            player.currentLocation === 'Luxury Shop' &&
            player.name === active
        "
        @click="luxuryItem('Strider')"
      >Buy Strider</button>
      <button
        class="bg-blue-800 rounded text-xs m-1 text-gray-100 px-2 py-1 font-semibold"
        v-if="
          tile.tileName === 'Luxury Shop' &&
            player.currentLocation === 'Luxury Shop' &&
            player.name === active
        "
        @click="luxuryItem('Horns')"
      >Buy Horns</button>
      <button
        class="bg-blue-800 rounded text-xs m-1 text-gray-100 px-2 py-1 font-semibold"
        v-if="
          tile.tileName === 'Luxury Shop' &&
            player.currentLocation === 'Luxury Shop' &&
            player.name === active
        "
        @click="luxuryItem('Golden Whistle')"
      >Buy Golden Whislte</button>
      <button
        class="bg-blue-800 rounded text-xs m-1 text-gray-100 px-2 py-1 font-semibold"
        v-if="
          tile.tileName === 'Luxury Shop' &&
            player.currentLocation === 'Luxury Shop' &&
            player.name === active
        "
        @click="luxuryItem('Shadow Hand')"
      >Buy Shadow Hand</button>
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
    "jail",
  ],
  methods: {
    move() {
      if (
        this.player.name === this.active &&
        this.player.currentLocation !== this.tile.tileName
      ) {
        var audio = document.getElementById("move");
        audio.play();
        this.$emit("clickMove");
      }
    },
    wareHouse() {
      this.$emit("wareHouse");
    },
    bail(index) {
      this.$emit("bail", index);
    },
    market() {
      this.$emit("market");
    },
    teaHouse() {
      this.$emit("teaHouse");
    },
    wainWright() {
      this.$emit("wainWright");
    },
    luxuryDiamond() {
      this.$emit("luxuryDiamond");
    },
    luxuryItem(type) {
      this.$emit("luxuryItem", type);
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
    checkFull() {
      let fullChecked = this.player.resources.filter(
        (x) => x.amount === this.player.capacity
      );
      console.log(fullChecked);
      return fullChecked.length === 3 ? true : false;
    },
  },
};
</script>

<style>
.tile-bg {
  background-size: 100% auto;
  z-index: -5;
}

.tile {
  height: 50%;
}

.icon {
  position: absolute;
  margin-left: 15px;
}

.garmin {
  margin-left: 15px;
}

.avatar {
  width: 32px;
  height: 32px;
  box-sizing: border-box;
  border: 2px white solid;
  border-radius: 50%;
  overflow: hidden;
  box-shadow: 0 5px 15px 0px rgba(0, 0, 0, 0.6);
  transform: translatey(0px);
  animation: 6s ease-in-out infinite;
}

.bg-blue-600 {
  margin-left: 80px;
}

.avatar img {
  width: 100%;
  height: auto;
}

.floating {
  animation-name: floating;
  animation-duration: 3s;
  animation-iteration-count: infinite;
  animation-timing-function: ease-in-out;
  margin-left: 20px;
  margin-top: 20px;
}

@keyframes floating {
  from {
    transform: translate(0, 0px);
  }
  65% {
    transform: translate(0, 15px);
  }
  to {
    transform: translate(0, -0px);
  }
}
</style>
