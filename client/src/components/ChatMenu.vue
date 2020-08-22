<template>
  <div class="h-70vh p-5 bg-gray-700 flex flex-col border">
    <div class="w-full flex">
      <div class="w-2/6 p-5 border">
        <div class="bg-blue-900"></div>
      </div>

      <div class="w-4/6 border">
        <h1 class="text-xl text-gray-100">LOBBY CHAT</h1>
        <p
          class="font-normal text-gray-100 text-left"
          v-for="(message,index) in allMessages"
          :key="index"
        >
          <span class="text-gray-100 font-bold">({{message.username}}):</span>
          {{message.text}}
        </p>
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
</template>

<script>
import socket from '../config/socket.js'


export default {
      name: 'ChatMenu',
      data: function() {
            return {
                  messageInput: '',
                  allMessages: [{username: 'Nicko', text: 'Hello from socket.io'}]
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
.h-70vh {
  min-height: 70vh;
}
</style>