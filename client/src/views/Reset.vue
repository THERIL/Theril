<template>
  <div>
    <button @click="message">Reset Message</button>
    <button @click="room">Reset Room</button>
  </div>
</template>

<script>
import socket from "../config/socket.js";
export default {
  methods: {
    message() {
      socket.emit("clear-message");
    },
    room() {
      socket.emit("clear-room");
    },
  },
};
</script>

<style>
</style>