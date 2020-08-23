<template>
  <div id="app">
    <div id="nav">
      <router-link to="/" v-if="!user.name">Login</router-link>|
      <router-link to="/lobby">Lobby</router-link>|
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

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>
