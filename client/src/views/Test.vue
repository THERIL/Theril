<template>
  <div class="game-luar flex justify-center">
    <div class="game-container mx-auto flex">
      <audio loop id="start" src="../assets/Battle_Music_1.mp3" type="audio/mpeg" />
      <div id="player" class="w-1/4">
        <PlayerCard :player="player" />
        <br />
        <br />
        <PlayerCard :player="player" />
      </div>
      <div id="bord" class="w-3/4">
        <div class="flex">
          <div>
            <button v-if="isSound" @click="startAudio" class="flex items-center">
              <i class="fa fa-volume-off fa-2x" aria-hidden="true"></i>
              <i class="fa fa-times" aria-hidden="true"></i>
            </button>
            <button v-else @click="stopAudio">
              <i class="fa fa-volume-up fa-2x" aria-hidden="true"></i>
            </button>
          </div>
          <button>
            <i class="fa fa-sign-out fa-2x" aria-hidden="true"></i>
          </button>
        </div>

        <div class="mx-auto">
          <div class="w-1/3 mx-auto">
            <div id="tile" class="p-10 m-2 bg-gray-400 text-center font-bold rounded">
              <p>CURRENT LOCATION</p>
            </div>
          </div>
        </div>
        <div id="button" class="flex p-10 justify-center">
          <button
            @click="playMarket"
            class="px-4 py-2 m-2 bg-green-200 text-green-900 text-center rounded shadow"
          >
            <audio id="market" src="../assets/market-coin.mp3" type="audio/mpeg" />
            SELL
          </button>
          <button class="px-4 py-2 m-2 bg-green-200 text-green-900 text-center rounded shadow">STEAL</button>
          <button
            class="px-4 py-2 m-2 bg-green-200 text-green-900 text-center rounded shadow"
          >CALL ASSISTANT</button>
          <button
            @click="dice"
            class="px-4 py-2 m-2 bg-green-200 text-green-900 text-center rounded shadow"
          >
            <audio id="dadu" src="../assets/dadu.mp3" type="audio/mpeg" />
            Gamble
          </button>
          <button
            @click="getResource"
            class="px-4 py-2 m-2 bg-green-200 text-green-900 text-center rounded shadow"
          >
            <audio id="get-resource" src="../assets/get-resource.mp3" type="audio/mpeg" />
            GET RESOURCES
          </button>

          <button
            @click="updateCart"
            class="px-4 py-2 m-2 bg-green-200 text-green-900 text-center rounded shadow"
          >
            <audio id="update-cart" src="../assets/update-cart.mp3" type="audio/mpeg" />
            Upgrade Cart
          </button>
        </div>
        <div id="tiles" class="flex flex-wrap">
          <TileCard v-for="(n,i) in 6" :key="i" :index="i" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import PlayerCard from "../components/PlayerCard";
import TileCard from "../components/TileCard";
export default {
  name: "Test",
  components: {
    PlayerCard,
    TileCard,
  },
  data: function () {
    return {
      player: {
        name: "Nicko",
      },
      isSound: true,
    };
  },
  methods: {
    startAudio() {
      var audio = document.getElementById("start");
      audio.play();
      audio.volume = 0.5;
      this.isSound = false;
    },
    stopAudio() {
      var audio = document.getElementById("start");
      audio.pause();
      this.isSound = true;
      // audio.volume = 0.1;
    },
    playMarket() {
      var audio = document.getElementById("market");
      audio.play();
    },
    updateCart() {
      var audio = document.getElementById("update-cart");
      audio.play();
    },
    dice() {
      var audio = document.getElementById("dadu");
      audio.play();
    },
    getResource() {
      var audio = document.getElementById("get-resource");
      audio.play();
    },
  },
  created() {},
};
</script>

<style>
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