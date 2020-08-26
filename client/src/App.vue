<template>
  <div id="app" class="mx-auto">
    <div class="hidden" id="nav">
      <router-link to="/" v-if="!user.name">Login</router-link>|
      <router-link to="/lobby">Lobby</router-link>|
      <router-link to="/test">test</router-link>|
      <!-- <router-link to="/board">Board</router-link> -->
      <button @click="logout">Logout</button>
    </div>
    <router-view />
  </div>
</template>

<script>
import socket from "./config/socket";
export default {
  methods: {
    logout() {
      socket.emit("logout");
      this.$store.state.user = {};
      this.$router.push("/");
    },
  },
  computed: {
    user() {
      return this.$store.state.user;
    },
  },
};
</script>

<style scoped>
@import url("https://fonts.googleapis.com/css2?family=Play:wght@400;700&display=swap");
#app {
  height: 100vh;
  min-width: 1366px;
  min-height: 768px;
  font-family: "Play", sans-serif;
}
</style>
