<template>
  <div class="w-full home">
    <h1>Lobby</h1>
    <div class="h-64 flex flex-col">
      <div class="overflow-scroll">
        <RoomCard v-for="(room,idx) in rooms" :key="idx" :room="room" />
      </div>
    </div>
    <div class="flex justify-end p-5">
      <form @submit="createRoom">
        <input class="px-2 py-1 border bg-gray-300" type="text" v-model="roomInput" />
        <button class="px-2 py-1 rounded font-bold bg-yellow-300" type="submit">CREATE ROOM</button>
      </form>
    </div>
    <ChatMenu :connectedUsers="connectedUsers" :user="user" :id="id" />
  </div>
</template>

<script>
// @ is an alias to /src
// import HelloWorld from '@/components/HelloWorld.vue'
import socket from "../config/socket.js";
import { mapGetters } from "vuex";
import ChatMenu from "@/components/ChatMenu.vue";
import RoomCard from "@/components/RoomCard.vue";

export default {
  name: "Home",
  components: {
    ChatMenu,
    RoomCard,
  },
  data: function () {
    return {
      roomInput: "",
      id: "",
      rooms: [],
      connectedUsers: []
    };
  },
  methods: {
    createRoom(event) {
      event.preventDefault();
      const payload = {
        roomName: this.roomInput,
      };
      socket.emit("create-room", payload);
      this.roomInput = "";
    },
  },
  computed: mapGetters(["user"]),
  created: function () {
    if(!this.$store.state.user.name) {
      this.$router.push('/')
    }
    socket.on("connect", () => {
      console.log(socket.id);
      this.id = socket.id;
      console.log("Connected to server.");
      // this.username = localStorage.getItem('theril-username')
    });
    socket.on("get-username", (user) => {
      this.$store.commit("SET_USER", user);
    });
    socket.on('get-connected-users', (users) => {
      this.connectedUsers = users
    })
    socket.emit("get-all-room");
    socket.on("get-list-room", (data) => {
      this.rooms = data;
    });

    socket.on("updated-room", (data) => {
      this.rooms = data;
    });
  },
};
</script>
