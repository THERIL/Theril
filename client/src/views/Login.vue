<template>
  <div class="game-luar">
    <div class="h-full flex flex-col justify-center items-center">
      <h1 class="theril-font text-center text-gray-100 text-5xl">THERIL: Board Game</h1>
      <LoginForm />
    </div>

    <div class="game-luar-background"></div>
  </div>
</template>

<script>

import LoginForm from '@/components/LoginForm.vue'
import socket from '../config/socket.js'
export default {
      name: 'Login',
      components: {
           LoginForm 
      },
      created: function() {
        if(this.$store.state.user.name){ 
        this.$router.push({name:'Lobby'})
        }
        else{
      socket.on("get-username", (user) => {
      this.$store.commit("SET_USER", user);
       if (this.$route.name !== 'Lobby') this.$router.push({name:'Lobby'})
    });
        }
      },
}
</script>

<style scoped>
@import url("https://fonts.googleapis.com/css2?family=Lobster+Two:ital,wght@0,700;1,400&display=swap");

.theril-font {
  font-family: "Lobster Two", cursive;
}

.game-luar {
  position: relative;
  display: block;
  width: 100%;
  height: 100%;
}
.game-luar-background {
  background-image: url("../assets/background-opa.png");
  position: absolute;
  left: 0;
  top: 0;
  bottom: 0;
  right: 0;
  z-index: -1;
  /* opacity: 0.6; */

  background-repeat: no-repeat;
  background-size: cover;
  overflow: hidden;
}
</style>