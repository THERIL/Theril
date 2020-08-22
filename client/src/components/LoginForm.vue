<template>
  <div class="w-full">
    <div class="w-1/3 mx-auto p-5 bg-white border-2 shadow">
      <form class="flex flex-col" @submit="login">
        <h3 class="text-2xl semibold text-left">Choose your username</h3>
        <input
          class="w-full mt-4 p-2 border-b text-xl font-semibold focus:outline-none"
          type="text"
          v-model="nameInput"
          placeholder="Name . . ."
        />
        <br />
        <input
          v-if="nameInput !== ''"
          class="w-1/2 px-2 py-1 mx-auto bg-gray-300 font-bold cursor-pointer"
          type="submit"
          value="Login"
        />
      </form>
    </div>
  </div>
</template>

<script>
import socket from "../config/socket.js";
export default {
  name: "LoginForm",
  data: function() {
    return {
      nameInput: "",
    };
  },
  methods: {
    login(event) {
      event.preventDefault();
      socket.emit("submit-username", this.nameInput);
      this.nameInput = "";
    },
  },
};
</script>

<style></style>
