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
        <i v-if="player1 == `${index+1}`" class="fa fa-user fa-3x icon" aria-hidden="true"></i>
      </div>
      <div>
        <i v-if="player2 == `${index+1}`" class="fa fa-user fa-3x icon" aria-hidden="true"></i>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "TileCard",
  props: ["index", "player1", "player2"],
  computed: {
    number() {
      return this.index + 1;
    },
  },
  methods: {
    move() {
      var audio = document.getElementById("move");
      audio.play();
    },
  },
  computed: {
    playerPos1() {
      if (this.player1 == "LuxuryShop") {
        return 1;
      } else if (this.player1 == "WainWright") {
        return 2;
      } else if (this.player1 == "PoliceOffice") {
        return 3;
      } else if (this.player1 == "Market") {
        return 4;
      } else if (this.player1 == "Warehouse") {
        return 5;
      } else if (this.player1 == "TeaHouse") {
        return 6;
      }
    },
    playerPos2() {
      if (this.player2 == "LuxuryShop") {
        return 1;
      } else if (this.player2 == "WainWright") {
        return 2;
      } else if (this.player2 == "PoliceOffice") {
        return 3;
      } else if (this.player2 == "Market") {
        return 4;
      } else if (this.player2 == "Warehouse") {
        return 5;
      } else if (this.player2 == "TeaHouse") {
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
}
</style>