<template>
  <div>
    <!-- <i v-if="assistant.workLocation == tileName" class="floating"
      :class="[color]" >
			<img src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/751678/skytsunami.png" />
		</i> -->
    <i
      v-if="assistant.workLocation == tileName"
      class="fa fa-user fa-3x floating-ass"
      :class="[color]"
      aria-hidden="true"
    ></i>
  </div>
</template>

<script>
export default {
  name: "Assistant",
  props: ["assistant", "tileName", "color"],
  computed: {},
};
</script>

<style>
.floating-ass {
  animation-name: floating;
  animation-duration: 3s;
  animation-iteration-count: infinite;
  animation-timing-function: ease-in-out;
  margin-left: 15px;
  margin-top: 15px;
}



</style>