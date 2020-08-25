<template>
  <div class="div game-luar flex justify-center">
    <div class="div game-container mx-auto flex">
      <!-- div player========================================================================== -->

      <!-- <div
        v-for="(player, index) in game.players"
        :key="index"
        id="player"
        class="w-1/4 flex flex-col"
      >
        <PlayerCard :player="player" />
        <br />
      </div>-->

      <!-- div board========================================================================= -->
      <div id="bord" class="w-3/4">
        <div class="flex justify-end">
          <div>
            <button v-if="isSound" @click="startAudio" class="flex items-center mr-3">
              <i class="fa fa-volume-off fa-2x" aria-hidden="true"></i>
              <i class="fa fa-times" aria-hidden="true"></i>
            </button>
            <button v-else @click="stopAudio">
              <i class="fa fa-volume-up fa-2x" aria-hidden="true"></i>
            </button>
          </div>
          <button @click="exit">
            <i class="fa fa-sign-out fa-2x mr-3" aria-hidden="true"></i>
          </button>
        </div>

        <!-- div current location========================================================================= -->
        <!-- <p>{{game}}</p>
        <p> {{game.message}} </p>-->
        <div class="mx-auto">
          <div class="w-1/3 mx-auto">
            <div id="tile" class="p-10 m-2 bg-gray-400 text-center font-bold rounded">
              <h2>Playing: {{ activePlayer }}</h2>
              <h2>Location: {{ pemain.currentLocation }}</h2>
              <h3 v-if="game.message">{{game.message}}</h3>
            </div>
          </div>
        </div>
        <!-- div button========================================================================= -->

        <h1>{{pemain.hasDone}}</h1>
        <h1>{{pemain.assistants[0].onDuty}}</h1>
        <h1>{{pemain.assistants[1].onDuty}}</h1>
        <div id="button">
          <div v-if="pemain.name === activePlayer" class="flex p-10 justify-center">
            <button v-if="status.length === 2" @click="endTurn">End Turn</button>
            <button @click="changeCart">change value</button>
            <!-- <button
              class="garmin"
              v-for="(tile, index) in tiles"
              @click="move(pemain.currentLocation, tile)"
              :key="index"
            >{{ tile.tileName }}</button>-->
            <button v-if="pemain.currentLocation === 'Market'" @click="market">Sell</button>
            <button
              v-if="pemain.currentLocation === 'Luxury Shop'"
              @click="luxuryDiamond"
            >Buy Diamond</button>
            <button
              v-if="pemain.currentLocation === 'Luxury Shop'"
              @click="luxuryItem('Strider')"
            >Buy Strider</button>
            <button
              v-if="pemain.currentLocation === 'Luxury Shop'"
              @click="luxuryItem('Horns')"
            >Buy Horns</button>
            <button
              v-if="pemain.currentLocation === 'Luxury Shop'"
              @click="luxuryItem('Golden Whistle')"
            >Buy Golden Whislte</button>
            <button
              v-if="pemain.currentLocation === 'Luxury Shop'"
              @click="luxuryItem('Shadow Hand')"
            >Buy Shadow Hand</button>
            <button v-if="pemain.currentLocation === 'Tea House'" @click="teaHouse">Gamble</button>
            <button v-if="pemain.currentLocation === 'Wain Wright'" @click="wainWright">Upgrade Cart</button>
            <button v-if="pemain.currentLocation === 'Warehouse'" @click="wareHouse">Free Resources</button>
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
              >Free Assistant {{ index + 1 }}</button>
            </div>
            <div
              v-if="
          pemain.currentLocation === anotherPlayer.currentLocation &&
            pemain.currentLocation &&
            anotherPlayer.currentLocation
        "
            >
              <button @click="steal">Duplicate Diamond</button>
            </div>
          </div>
        </div>
        <!-- div tiles========================================================================= -->
        <div id="tiles" class="flex flex-wrap">
          <TileCard
            v-for="(tile, index) in tiles"
            :key="index"
            :index="index"
            @clickMove="move(pemain.currentLocation, tile)"
            :tile="tile"
            :player="pemain.currentLocation"
            :player2="anotherPlayer.currentLocation"
            :assistants1="pemain.assistants"
            :assistants2="anotherPlayer.assistants"
            :game="game"
          />
        </div>
      </div>
      <!-- :player2="anotherPlayer.currentLocation" -->
      <!-- <button @click="exit">Exit</button>
      <h1>{{ turn.name }}</h1>
      <h1>{{ pemain }}</h1>
      <h2>Playing: {{ activePlayer }}</h2>
      <h2>Location: {{ pemain.currentLocation }}</h2>-->
      <!-- 
      <div v-for="(item, index) in pemain.items" :key="index">
        <h1>{{ item.name }}</h1>
      </div>
      <div v-for="(item, index) in pemain.resources" :key="index">
        <h1>{{ item.type.name }}</h1>
        <h1>{{ item.amount }}</h1>
      </div>-->

      <div v-if="pemain.currentLocation === 'Police Office'">
        <div v-for="(assist, index) in pemain.assistants" :key="index">
          <h1 v-if="assist.jailed">Assistant {{ index + 1 }}</h1>
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
      var audio = document.getElementById("start");
      audio.play();
      audio.volume = 0.05;
      this.isSound = false;
    },
    stopAudio() {
      var audio = document.getElementById("start");
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
    exit() {
      socket.emit("exit-game", this.room.name, this.user.id);
      this.$router.push({ name: "Lobby" });
    },
  },
  created() {
    socket.on("inisiate-game", (data, game, tiles) => {
      // console.log(data, "--------------");
      console.log(game, ">>>>>>>>>>>>>>>");
      // console.log(tiles, "<<<<<<<<<");
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
      this.game = game;
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

.game-container {
  width: 1350px;

  /* height: ; */
}

.game-luar {
  background-image: url("../assets/background.jpeg");
  width: 100vw;
  min-height: 100vh;
  background-repeat: no-repeat;
  background-size: cover;
  overflow: hidden;
}
</style>
