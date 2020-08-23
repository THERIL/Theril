<template>
  <div class="w-1/3" >
  
    <div @click="move" id="tile" class="tile-bg p-20 m-2 bg-gray-400 text-center font-bold rounded" :style="{'background-image': 'url(' + require(`../assets/tile-0${index+1}.png`) + ')',  'background-size': 100% 'auto'}">
    <audio id="move" src="../assets/move.mp3" type="audio/mpeg" />
    </div>
  </div>
</template>

<script>
export default {
    name: 'TileCard',
    props:['index'],
    computed: {
        number () {
            return this.index+1
        }
    },
    methods: {
    move() {
      var audio = document.getElementById("move");
      audio.play();
    },
    }
};
</script>

<style>
.tile-bg {
  background-size: 100% auto;
}
</style>