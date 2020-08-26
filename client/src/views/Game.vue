<template>
  <div class="div game-luar flex justify-center">
    <div class="game-luar-background"></div>
    <audio loop id="start" src="../assets/music-4.mp3" type="audio/mpeg" />
    <div class="div h-full mx-auto flex">
      <!-- div player========================================================================== -->

      <div id="player" class="w-1/4 flex flex-col justify-center">
        <PlayerCard
          v-for="(player, index) in game.players"
          :key="index"
          :player="player"
        />
        <br />
        <!-- div button========================================================================= -->
        <div id="button" class="mt-10">
          <div
            v-if="pemain.name === activePlayer"
            class="flex flex-wrap p-4 justify-center"
          >
            <div v-if="pemain.currentLocation === 'Police Office'">
              <div v-for="(assist, index) in pemain.assistants" :key="index">
                <button
                  class="bg-orange-800 text-gray-100 px-2 py-1 font-semibold"
                  v-if="assist.jailed"
                >
                  Assistant {{ index + 1 }}
                </button>
              </div>
            </div>
            <button
              class="bg-red-800 text-gray-100 px-2 py-1 font-semibold"
              v-if="status.length === 2"
              @click="endTurn"
            >
              End Turn
            </button>
            <button
              class="bg-green-800 text-gray-100 px-2 py-1 font-semibold"
              @click="changeCart"
            >
              change value
            </button>
            <button
              class="bg-yellow-800 text-gray-100 px-2 py-1 font-semibold"
              v-if="pemain.currentLocation === 'Market'"
              @click="market"
            >
              Sell
            </button>
            <button
              class="bg-blue-800 text-gray-100 px-2 py-1 font-semibold"
              v-if="pemain.currentLocation === 'Luxury Shop'"
              @click="luxuryDiamond"
            >
              Buy Diamond
            </button>
            <button
              class="bg-blue-800 text-gray-100 px-2 py-1 font-semibold"
              v-if="pemain.currentLocation === 'Luxury Shop'"
              @click="luxuryItem('Strider')"
            >
              Buy Strider
            </button>
            <button
              class="bg-blue-800 text-gray-100 px-2 py-1 font-semibold"
              v-if="pemain.currentLocation === 'Luxury Shop'"
              @click="luxuryItem('Horns')"
            >
              Buy Horns
            </button>
            <button
              class="bg-blue-800 text-gray-100 px-2 py-1 font-semibold"
              v-if="pemain.currentLocation === 'Luxury Shop'"
              @click="luxuryItem('Golden Whistle')"
            >
              Buy Golden Whislte
            </button>
            <button
              class="bg-blue-800 text-gray-100 px-2 py-1 font-semibold"
              v-if="pemain.currentLocation === 'Luxury Shop'"
              @click="luxuryItem('Shadow Hand')"
            >
              Buy Shadow Hand
            </button>
            <button
              class="bg-orange-800 text-gray-100 px-2 py-1 font-semibold"
              v-if="pemain.currentLocation === 'Tea House'"
              @click="teaHouse"
            >
              Gamble
            </button>
            <button
              class="bg-orange-800 text-gray-100 px-2 py-1 font-semibold"
              v-if="pemain.currentLocation === 'Wain Wright'"
              @click="wainWright"
            >
              Upgrade Cart
            </button>
            <button
              class="bg-orange-800 text-gray-100 px-2 py-1 font-semibold"
              v-if="pemain.currentLocation === 'Warehouse'"
              @click="wareHouse"
            >
              Free Resources
            </button>

            <div v-for="(location, index) in pemain.assistants" :key="index">
              <button
                class="bg-green-800 text-gray-100 px-2 py-1 font-semibold"
                v-if="
                  status.length &&
                    pemain.currentLocation === location.workLocation
                "
                @click="freeAsistance(location)"
              >
                Free Assistant {{ index + 1 }}
              </button>
            </div>
            <div
              class="bg-red-800 text-gray-100 px-2 py-1 font-semibold"
              v-if="
                pemain.currentLocation === anotherPlayer.currentLocation &&
                  pemain.currentLocation &&
                  anotherPlayer.currentLocation
              "
            >
              <button @click="steal">Duplicate Diamond</button>

              <div v-if="pemain.currentLocation === 'Police Office'">
                <div v-for="(assistant, index) in jail" :key="index">
                  <button
                    class="bg-red-800 text-gray-100 px-2 py-1 font-semibold"
                    v-if="jail.length"
                    @click="bail(index)"
                  >
                    Bail {{ index + 1 }}
                  </button>
                  <p v-else>You dont have jailed assistant</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <!-- div board========================================================================= -->
      <div id="bord" class="w-3/4">
        <div class="flex justify-end">
          <div>
            <button
              v-if="isSound"
              @click="startAudio"
              class="flex items-center mr-3"
            >
              <i
                class="fa text-gray-100 fa-volume-off fa-2x"
                aria-hidden="true"
              ></i>
              <i class="fa text-gray-100 fa-times" aria-hidden="true"></i>
            </button>
            <button v-else @click="stopAudio">
              <i
                class="fa text-gray-100 fa-volume-up fa-2x"
                aria-hidden="true"
              ></i>
            </button>
          </div>
          <button @click="exit">
            <i
              class="fa text-gray-100 fa-sign-out fa-2x mr-3"
              aria-hidden="true"
            ></i>
          </button>
        </div>
        <!-- div current location========================================================================= -->
        <div class="mx-auto">
          <div class="w-full flex h-10p mx-auto">
            <div class="w-1/2 bg-gray-400 rounded">
              <section class="p-5 font-bold">
                <h4>MARKET</h4>
                <p>
                  Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  Ratione porro nisi delectus laudantium aspernatur beatae
                  expedita doloribus facere vitae dolor.
                </p>
              </section>
            </div>

            <div class="w-1/3 mx-auto bg-gray-400 rounded">
              <section class="p-5 font-bold">
                <h2>Currently Playing: {{ activePlayer }}</h2>
                <h2>Your Location: {{ pemain.currentLocation }}</h2>
                <h3 v-if="game.message">{{ game.message }}</h3>
              </section>
            </div>
          </div>
        </div>
        <!-- div tiles========================================================================= -->
        <div id="tiles" class="flex flex-wrap h-80p">
          <TileCard
            v-for="(tile, index) in tiles"
            :key="index"
            :index="index"
            @clickMove="move(pemain.currentLocation, tile)"
            :tile="tile"
            :player="pemain"
            :player2="anotherPlayer"
            :active="activePlayer"
            :assistants1="pemain.assistants"
            :assistants2="anotherPlayer.assistants"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import socket from "../config/socket";
import PlayerCard from "../components/PlayerCard";
import TileCard from "../components/TileCard";
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
      isSound: true,
    };
  },
  components: {
    PlayerCard,
    TileCard,
  },
  methods: {
    startAudio() {
      let audio = document.getElementById("start");
      audio.play();
      audio.volume = 0.75;
      this.isSound = false;
    },
    stopAudio() {
      let audio = document.getElementById("start");
      audio.pause();
      this.isSound = true;
    },
    changeCart() {
      socket.emit("updated-data", this.room);
    },

    move(moveFrom, moveTo) {
      socket.emit("move", this.room.name, moveFrom, moveTo);
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
      socket.emit("end-turn", this.room.name);
    },
    steal() {
      socket.emit("steal", this.room.name, this.anotherPlayer);
    },
    bail(index) {
      socket.emit("bail", this.room.name, index);
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
      this.game = game;
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
      this.game = game;
    });

    socket.on("user-win", (data) => {
      alert("Another player has leave the game, You Win");
      socket.emit("exit-game-winner", this.room.name, this.user.id);
      this.$router.push({ name: "Lobby" });
    });

    socket.on("show-winner", (msg) => {
      alert(msg);
    });
  },
  computed: {
    user() {
      return this.$store.state.user;
    },
    win() {
      // let winner = this.game.players.map(player => {player.diamond === 6})
      // console.log(winner,'================= win computed')
      // if(winner.length > 0) {
      //   socket.emit('winner',winner[0].name,this.room.name)
      //   // alert('YOUWIN')
      // }
    },
  },
};
</script>

<style scoped>
.garmin {
  margin-right: 15px;
}

.h-10p {
  height: 10%;
}

.h-80p {
  height: 80%;
}

.game-luar {
  position: relative;
  display: block;
  width: 100%;
  height: 100%;
}
.game-luar-background {
  background-image: url("../assets/background-opa.png");
  position: absolute;
  left: 0;
  top: 0;
  bottom: 0;
  right: 0;
  z-index: -1;
  /* opacity: 0.6; */

  background-repeat: no-repeat;
  background-size: cover;
  overflow: hidden;
}
</style>
