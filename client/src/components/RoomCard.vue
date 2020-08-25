<template>
  <div class="w-1/3 border flex justify-between">
    <h2 class="text-gray-900 text-xl">{{ room.name }}</h2>
    <button class @click="joinRoom">JOIN ROOM</button>
  </div>
</template>

<script>
export default {
  name: "RoomCard",
  props: ["room"],
  methods: {
    joinRoom() {
      this.$store.commit("JOIN_ROOM", this.room.name);
      this.$router.push(`/room/${this.room.name}`);
    },
  },
};
</script>

<style></style>
