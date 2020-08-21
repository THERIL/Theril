<template>
  <div>
    <h1>{{room}}</h1>
    <p>{{players}}</p>
    <button class="bg-blue-900 text-gray-100 p-2" @click="startGame">START GAME</button>
  </div>
</template>

<script>
import socket from '../config/socket.js'

export default {
      name:'Room',
      data: function() {
            return{
                  room:{},
                  players:[]
            }
      },
      created: function() {
            socket.on('room-detail', (room,players) => {
                  console.log(room)
                  console.log(players)
                  this.room = room
                  this.players = players.filter(player => room.users.includes(player.name))
            })
      },
      methods: {
            startGame() {
                  console.log('start')
            }
      }
}
</script>

<style>
</style>