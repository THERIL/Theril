<template>
  <div class="div game-luar flex justify-center">
    <div class="game-luar-background"></div>

    <!-- MODAL WIN -->

    <div v-if="isWin">
      <div
        class="h-screen w-screen absolute bg-gray-800 bg-opacity-50 z-50 flex justify-center items-center"
      >
        <!-- Modal content -->
        <div class="bg-gray-200 rounded p-1">
          <span class="close">&times;</span>
          <p>{{ winMessage }}</p>
          <button @click="exit">Ok</button>
        </div>
      </div>
    </div>

    <!-- MODAL MESSAGE -->
    <div v-if="pemain.name === activePlayer">
      <div
        class="h-screen w-screen absolute bg-gray-800 bg-opacity-50 z-50 flex justify-center items-center"
        @click="closeModal"
        v-if="modalMessage"
      >
        <div class="bg-gray-200 rounded p-1">
          <!-- Modal content -->
          <div class>
            <span class="text-xl" @click="closeModal">&times;</span>
            <p class="tracking-wider text-lg px-4 py-2">{{ modalMessage.msg }}</p>
          </div>
        </div>
      </div>
    </div>

    <audio loop id="start" src="../assets/music-4.mp3" type="audio/mpeg" />
    <div class="div h-full mx-auto flex">
      <button @click="exitGame">Exit</button>
      <!-- div player========================================================================== -->

      <div id="player" class="w-1/4 mt-4 flex flex-col">
        <PlayerCard v-for="(player, index) in game.players" :key="index" :player="player" />
        <br />
        <!-- div button========================================================================= -->
        <div id="button" class="mt-10">
          <div
            v-if="pemain.name === activePlayer"
            class="flex flex-col flex-wrap p-4 justify-center"
          >
            <div>
              <button
                class="w-1/2 mt-2 bg-red-800 text-gray-100 px-2 py-1 font-semibold"
                @click="endTurn"
              >End Turn</button>
            </div>

            <div>
              <button
                class="w-1/2 mt-2 bg-green-800 text-gray-100 px-2 py-1 font-semibold"
                @click="changeCart"
              >Gold + 100</button>
            </div>
            <!-- FREE ASSISTANTS -->
            <div v-if="status.length" class="flex">
              <div class="w-full" v-for="(location, index) in pemain.assistants" :key="index">
                <button
                  v-if="pemain.currentLocation === location.workLocation"
                  :key="index"
                  class="w-1/2 mt-2 bg-green-800 text-gray-100 px-2 py-1 font-semibold"
                  @click="freeAsistance(location)"
                >Free Assistant {{ index + 1 }}</button>
              </div>
            </div>
            <!-- DUPLICATE DIAMOND -->
            <div
              v-if="pemain.currentLocation === anotherPlayer.currentLocation && pemain.currentLocation && anotherPlayer.currentLocation"
            >
              <button
                class="w-1/2 mt-2 bg-red-800 text-gray-100 px-2 py-1 font-semibold"
                @click="steal"
              >Duplicate Diamond</button>
            </div>
            <div>
              <button
                class="w-1/2 mt-2 bg-green-800 text-gray-100 px-2 py-1 font-semibold"
                @click="horns"
                v-if="pemain.items.filter(x => x.name === 'Horns').length"
              >Use Horns</button>
            </div>
          </div>
        </div>
      </div>
      <!-- div board========================================================================= -->
      <div id="bord" class="w-3/4">
        <!-- div current location========================================================================= -->
        <div class="h-25p mx-auto">
          <div class="w-full h-full px-5 flex justify-between mx-auto">
            <div class="w-1/4 h-full flex flex-col justify-end">
              <section class="p-5 font-semibold bg-location bg-opacity-75 text-gray-100">
                <h2>
                  Currently Playing:
                  <span class="font-bold">{{ activePlayer }}</span>
                </h2>
                <h2>
                  Your Location:
                  <span class="font-bold">{{ pemain.currentLocation }}</span>
                </h2>
                <h3 v-if="game.message">{{ game.message }}</h3>
              </section>
            </div>

            <div class="w-3/4 relative flex flex-col">
              <section class="absolute nes-balloon from-left font-bold">
                <p class="text-xs">{{ botChat }}</p>
                <!-- OCTOCAT -->
                <div class="absolute left-0 mt-10">
                  <div class="flex">
                    <i class="nes-octocat animate"></i>
                    <form @submit="submitForm">
                      <input class="ml-4 mt-10" type="text" v-model="text" />
                      <input type="submit" value="Ask me!" />
                    </form>
                  </div>
                </div>
              </section>

              <div class="flex justify-end">
                <!-- EXIT AND VOLUME -->
                <div>
                  <button v-if="isSound" @click="startAudio" class="flex items-center mr-3">
                    <i class="fa text-gray-100 fa-volume-off fa-2x" aria-hidden="true"></i>
                    <i class="fa text-gray-100 fa-times" aria-hidden="true"></i>
                  </button>
                  <button v-else @click="stopAudio">
                    <i class="fa text-gray-100 fa-volume-up fa-2x" aria-hidden="true"></i>
                  </button>
                </div>
                <button @click="exit">
                  <i class="fa text-gray-100 fa-sign-out fa-2x mr-3" aria-hidden="true"></i>
                </button>
              </div>
            </div>
          </div>
        </div>
        <!-- div tiles========================================================================= -->
        <div id="tiles" class="flex flex-wrap h-70p">
          <TileCard
            v-for="(tile, index) in tiles"
            :key="index"
            :index="index"
            @clickMove="move(pemain.currentLocation, tile)"
            @wareHouse="wareHouse"
            @market="market"
            @teaHouse="teaHouse"
            @wainWright="wainWright"
            @luxuryDiamond="luxuryDiamond"
            @luxuryItem="luxuryItem"
            @bail="bail"
            :tile="tile"
            :player="pemain"
            :player2="anotherPlayer"
            :active="activePlayer"
            :assistants1="pemain.assistants"
            :assistants2="anotherPlayer.assistants"
            :jail="jail"
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
import { mapGetters } from "vuex";
import axios from "axios";
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
      isWin: false,
      winMessage: "",
      modalMessage: "",
      text: "",
      botChat: "",
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
    closeModal() {
      this.modalMessage = "";
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
      socket.emit("exit-game-winner", this.room.name, this.user.id);
      this.$router.push({ name: "Lobby" });
    },
    exitGame() {
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
    horns() {
      socket.emit("horns", this.room.name);
    },
    submitForm(event) {
      event.preventDefault();
      const chat = { text: this.text };
      axios({
        method: "post",
        url: "http://localhost:3000",
        data: chat,
      })
        .then(({ data }) => {
          // context.emit("DIALOG_FLOW_CHAT", data);
          this.botChat = data;
          setTimeout(() => {
            this.botChat = "";
          }, 20000);
        })
        .catch((err) => {
          console.log(err);
        })
        .finally((_) => {
          this.text = "";
        });
      // this.$store.dispacth("dialogFlow", chat);
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

    socket.on("updated-game", (game, msg) => {
      this.modalMessage = msg;
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
      this.isWin = true;
      this.winMessage = data;
      // socket.emit("exit-game-winner", this.room.name, this.user.id);
      // this.$router.push({ name: "Lobby" });
    });
    socket.on("show-winner", (msg) => {
      this.isWin = true;
      this.winMessage = msg;
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
.bg-location {
  background-color: rgba(44, 44, 44, 0.5);
}
.garmin {
  margin-right: 15px;
}

.h-25p {
  height: 25%;
}

.h-70p {
  height: 70%;
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
