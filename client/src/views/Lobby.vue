<template>
  <div class="game-luar">
    <div class="game-luar-background"></div>
    <div class="h-full p-5 flex flex-col border">
      <div class="w-full h-full flex">
        <div class="w-2/6 h-full p-5 bg-lobby">
          <div>
            <p class="text-left text-white text-2xl font-bold">{{user.name}}</p>
          </div>
          <div>
            <h2 class="text-white text-2xl border-b-2">Connected Users:</h2>
            <div class="overflow-auto">
              <p
                class="text-left text-white text-lg"
                v-for="(user,index) in connectedUsers"
                :key="index"
              >{{user.name}}</p>
            </div>
          </div>
        </div>
        <div class="w-4/6 h-full p-5">
          <div class="roombox-height">
            <div class="flex justify-end p-5">
              <form @submit="createRoom">
                <input
                  class="px-2 py-1 border bg-gray-300 focus:outline-none"
                  type="text"
                  v-model="roomInput"
                />
                <button
                  class="px-2 py-1 ml-4 rounded font-bold bg-yellow-300"
                  type="submit"
                >CREATE ROOM</button>
              </form>
            </div>
            <div class="flex flex-wrap h-60p bg-lobby overflow-y-scroll">
              <RoomCard v-for="(room, idx) in rooms" :key="idx" :room="room" />
            </div>
          </div>
          <div class="chatbox-height">
            <ChatMenu :connectedUsers="connectedUsers" :user="user" :id="id" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
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
  data: function() {
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
      if (this.roomInput) {
        const payload = {
          roomName: this.roomInput,
        };
        socket.emit("create-room", payload);
        this.roomInput = "";
      } else {
        alert("Nama room harus diisi");
      }
    },
  },
  computed: mapGetters(["user"]),
  created: function() {
    if (!this.$store.state.user.name) {
      this.$router.push("/");
    }
    socket.on("connect", () => {
      console.log(socket.id);
      this.id = socket.id;
      console.log("Connected to server.");
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
    // socket.on("user-win", (data) => {
    //   // console.log(data.users);
    //   // // alert("You Win bgst");
    //   this.$router.push({ name: "Lobby" });
    // });
  },
};
</script>

<style scoped>
.bg-lobby {
  background-color: rgba(44, 44, 44, 0.5);
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
.roombox-height {
  height: 60%;
}
.chatbox-height {
  height: 40%;
}

.h-60p {
  height: 60%;
}
</style>
