<template>
  <div class="h-full flex items-center">
    <LoginForm />
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

<style>
</style>