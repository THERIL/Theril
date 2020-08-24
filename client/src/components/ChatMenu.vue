<template>
  <div class="h-full">
    <div class="h-10p bg-gray-800">
      <h1 class="text-xl font-bold text-gray-100">LOBBY CHAT</h1>
    </div>
    <!-- CHATBOX -->
    <div class="h-80p overflow-y-scroll">
      <div class="text-left" v-for="(message,index) in allMessages" :key="index">
        <p class="font-bold mt-2 text-gray-100 text-left">({{message.username}}):</p>
        <p class="text-gray-100">{{message.text}}</p>
      </div>
    </div>

    <div class="w-full h-10p flex justify-end">
      <form class="w-full flex" @submit="sendMessage">
        <input
          class="w-5/6 border bg-gray-200 focus:outline-none"
          type="text"
          v-model="messageInput"
          :placeholder="messageInput"
        />
        <input class="w-1/6 px-2 py-1 bg-gray-300 font-bold" type="submit" value="Send" />
      </form>
    </div>
  </div>
</template>

<script>
import socket from '../config/socket.js'


export default {
      name: 'ChatMenu',
      data: function() {
            return {
                  messageInput: '',
                  allMessages: []
            }
      },
      props: ['user','connectedUsers'],
      methods: {
            sendMessage: function (event) {
                  event.preventDefault();
                  const payload= {
                        username: this.user.name,
                        text: this.messageInput
                  }
                  socket.emit('send-message', payload)
                  this.messageInput = '';
            }
      },
      created: function () {
            socket.on('recieve-message', (message) => {
              if(Array.isArray(message)){
              message.forEach(item => {
                this.allMessages.push(item);
              })
              }
              else{
                this.allMessages.push(message)
              }
            })
      }
}
</script>

<style>
.h-10p {
  height: 10%;
}
.h-80p {
  height: 80%;
}

.h-70vh {
  min-height: 70vh;
}
</style>