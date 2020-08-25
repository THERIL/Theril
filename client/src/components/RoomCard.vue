<template>
  <div class="w-full h-33p p-5 shadow flex justify-between text-gray-100 rounded">
    <div class="w-1/2">
      <h2 class="text-xl">{{ room.name }}</h2>
    </div>

    <div class="w-1/2 flex text-xl justify-between">
      <p>{{room.users.length}}/2</p>
      <button class="bg-green-800 text-lg px-2 py-1 font-bold rounded" @click="joinRoom">JOIN ROOM</button>
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

<style scoped>
.h-33p {
  height: 33.3333%;
}
</style>
