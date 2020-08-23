<template>
  <div class="game-luar flex justify-center">
    <div class="game-container mx-auto flex">
      <div id="player" class="bg-red-100 w-1/4">
        <PlayerCard :player="player" />
        <br />
        <br />
        <PlayerCard :player="player" />
      </div>
      <div id="bord" class="bg-blue-100 w-3/4">
        <div class="mx-auto">
          <div class="w-1/3 mx-auto">
            <div id="tile" class="p-10 m-2 bg-gray-400 text-center font-bold rounded">
              <p>CURRENT LOCATION</p>
            </div>
          </div>
        </div>
        <div id="button" class="flex p-10 justify-center">
          <button class="px-4 py-2 m-2 bg-green-200 text-green-900 text-center rounded shadow">SELL</button>
          <button class="px-4 py-2 m-2 bg-green-200 text-green-900 text-center rounded shadow">STEAL</button>
          <button
            class="px-4 py-2 m-2 bg-green-200 text-green-900 text-center rounded shadow"
          >FREE ASSISTANT</button>
          <button
            class="px-4 py-2 m-2 bg-green-200 text-green-900 text-center rounded shadow"
          >GAMBLE</button>
          <button
            class="px-4 py-2 m-2 bg-green-200 text-green-900 text-center rounded shadow"
          >FREE RESOURCES</button>
          <button class="px-4 py-2 m-2 bg-green-200 text-green-900 text-center rounded shadow">STEAL</button>
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
import TileCard from "../components/TileCard"
export default {
  name: "Test",
  components: {
    PlayerCard,
    TileCard
  },
  data: function() {
    return{
    player:{
      name: 'Nicko'
    }
    }
  }
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