<template>
  <div class="w-full p-5 border flex justify-between text-gray-100 rounded">
    <div class="w-1/2">
      <h2 class="text-xl">{{ room.name }}</h2>
    </div>

    <div class="w-1/2 flex justify-between">
      <p>{{room.users.length}}/2</p>
      <button class @click="joinRoom">JOIN ROOM</button>
    </div>
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
