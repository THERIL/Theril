<template>
  <div>
    <i v-if="assistant.workLocation == tileName" class="fa fa-user icon" :class="[color]" aria-hidden="true"></i>
  </div>
</template>

<script>
export default {
  name: "Assistant",
  props: ["assistant", "tileName", "color"],
  computed: {
  },
};
</script>

<style>
</style>