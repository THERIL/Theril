<template>
<div class="game-luar">
  <div class="game-container mx-auto flex ">
    <div id="player" class="bg-red-100 w-1/4">
      <PlayerCard />
      <br />
      <br />
      <PlayerCard />
    </div>
    <div id="bord" class="bg-blue-100 w-3/4">
      <div id="location" class="bg-purple-200 w-1/3 mx-auto p-10">
        <p>ini location</p>
      </div>
      <div id="button" class="flex justify-center">
        <button class="p-2 bg-green-200">butt |</button>
        <button class="p-2 bg-green-200">butt |</button>
        <button class="p-2 bg-green-200">butt |</button>
        <button class="p-2 bg-green-200">butt |</button>
        <button class="p-2 bg-green-200">butt |</button>
      </div>
      <div id="tiles" class="flex flex-wrap">
       
        <TileCard/>
        <TileCard/>
        <TileCard/>
        <TileCard/>
        <TileCard/>
        <TileCard/>
        
        
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