<template>
  <div class="game-container mx-auto">
    <div class="h-70vh p-5 bg-gray-700 flex flex-col border">
      <div class="w-full flex">
        <div class="w-2/6 p-5 border">
          <div class>
            <p class="text-left text-white text-2xl font-bold">{{user.name}}</p>
          </div>
        </div>

        <div class="w-4/6 chatbox-height overflow-auto p-5 border">
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
                  allMessages: [{username: 'Nicko', text: 'Hello from socket.io'},{username: 'Nicko', text: 'Hello from socket.io'},{username: 'Nicko', text: 'Hello from socket.io'},{username: 'Nicko', text: 'Hello from socket.io'},{username: 'Nicko', text: 'Hello from socket.io'},{username: 'Nicko', text: 'Hello from socket.io'},{username: 'Nicko', text: 'Hello from socket.io'},{username: 'Nicko', text: 'Hello from socket.io'},{username: 'Nicko', text: 'Hello from socket.io'},{username: 'Nicko', text: 'Hello from socket.io'},{username: 'Nicko', text: 'Hello from socket.io'},{username: 'Nicko', text: 'Hello from socket.io'},{username: 'Nicko', text: 'Hello from socket.io'},{username: 'Nicko', text: 'Hello from socket.io'},{username: 'Nicko', text: 'Hello from socket.io'},{username: 'Nicko', text: 'Hello from socket.io'},{username: 'Nicko', text: 'Hello from socket.io'},{username: 'Nicko', text: 'Hello from socket.io'},{username: 'Nicko', text: 'Hello from socket.io'},{username: 'Nicko', text: 'Hello from socket.io'},{username: 'Nicko', text: 'Hello from socket.io'},{username: 'Nicko', text: 'Hello from socket.io'},{username: 'Nicko', text: 'Hello from socket.io'},{username: 'Nicko', text: 'Hello from socket.io'},{username: 'Nicko', text: 'Hello from socket.io'},{username: 'Nicko', text: 'Hello from socket.io'},{username: 'Nicko', text: 'Hello from socket.io'},{username: 'Nicko', text: 'Hello from socket.io'},{username: 'Nicko', text: 'Hello from socket.io'},{username: 'Nicko', text: 'Hello from socket.io'},{username: 'Nicko', text: 'Hello from socket.io'},{username: 'Nicko', text: 'Hello from socket.io'},{username: 'Nicko', text: 'Hello from socket.io'},{username: 'Nicko', text: 'Hello from socket.io'},{username: 'Nicko', text: 'Hello from socket.io'},{username: 'Nicko', text: 'Hello from socket.io'},{username: 'Nicko', text: 'Hello from socket.io'},]
            }
      },
      props: ['user'],
      methods: {
            sendMessage: function (event) {
                  event.preventDefault();
                  const payload= {
                        username: this.user.name,
                        message: this.messageInput
                  }
                  socket.emit('send-message', payload)
            }
      },
      created: function () {
            socket.on('recieve', (message) => {
                  this.allMessages.push(message);
                  this.messageInput = '';
            })
      }
}
</script>

<style>
.game-container {
  width: 1600px;
}
.chatbox-height {
  height: 700px;
}
.h-70vh {
  min-height: 70vh;
}
</style>