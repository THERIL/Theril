<template>
  <div class="game-container mx-auto">
    <div class="h-70vh p-5 bg-gray-700 flex flex-col border">
      <div class="w-full flex">
        <div class="w-2/6 p-5 border">
          <div>
            <p class="text-left text-white text-2xl font-bold">{{user.name}}</p>
          </div>
          <div class="border">
            <h2 class="text-white text-2xl">Connected Users:</h2>
            <div class="overflow-auto">
              <p
                class="text-left text-white text-lg"
                v-for="(user,index) in connectedUsers"
                :key="index"
              >{{user.name}}</p>
            </div>
          </div>
        </div>

        <div class="w-4/6 chatbox-height p-5 border overflow-scroll">
          <h1 class="text-xl font-bold text-gray-100">LOBBY CHAT</h1>
          <div class="text-left" v-for="(message,index) in allMessages" :key="index">
            <p class="font-bold mt-2 text-gray-100 text-left">({{message.username}}):</p>
            <p class="text-gray-100">{{message.text}}</p>
          </div>
        </div>
      </div>

      <div class="w-full mt-4 flex justify-end">
        <form class="w-4/6 flex" @submit="sendMessage">
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
/* .game-container {
  width: 1600px;
} */
.chatbox-height {
  height: 700px;
}
.h-70vh {
  min-height: 70vh;
}
</style>