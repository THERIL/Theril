<template>
  <div class="home">
    <h1>Lobby</h1>
    <ChatMenu :username="username" :id="id" />
  </div>
</template>

<script>
// @ is an alias to /src
// import HelloWorld from '@/components/HelloWorld.vue'
import socket from '../config/socket.js'
import ChatMenu from '@/components/ChatMenu.vue'

export default {
  name: 'Home',
  components: {
    ChatMenu
  },
  data: function () {
    return {
    username:'',
    id: ''
    }
  },
  created : function() {
    socket.on('connect', () => {
      console.log(socket.id)
      this.id = socket.id
    console.log('Connected to server.')
    this.username = localStorage.getItem('theril-username')
  })
    socket.on('emit-username', (usernames) => {
      const user = usernames.filter(username => username.id === socket.id)

    })
  }
}
</script>
