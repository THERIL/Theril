<template>
  <div class="relative">
      <img
        class="h-full w-full object-cover img-p"
        :src="require(`../assets/ava-${index+1}.png`)"
        alt
      />
    <h2 class="user"> {{user}} </h2>
  </div>
</template>

<script>
export default {
  name: "PlayerInRoom",
  props: ["user", "index"],
};
</script>

<style>
.user {
    position: absolute;
    font-family: "Roboto", sans-serif;
    font-size: 78px;
    line-height: 1.5em;
    color: white;
    z-index: 999    ;
    top: 0;
    left: 150px;
    margin-top: -8px;
}

.img-p {
  z-index: -5;
  width: 450px;
  height: auto;
}
</style>