<template>
  <div class="w-1/3">
    <div id="tile" class="tile-bg p-20 m-2 bg-gray-400 text-center font-bold rounded">
      <p class="text-white">Market</p>
    </div>
  </div>
</template>

<script>
export default {
    name: 'TileCard',
    props:['index']
};
</script>

<style>
.tile-bg {
  background-image: url("../assets/tile-01.jpg");
  background-size: 100% auto;
}
</style>