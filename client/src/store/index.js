import Vue from "vue";
import Vuex from "vuex";
import socket from "../config/socket.js";
import axios from "axios";
// import Artyom from "artyom.js";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    user: {},
    chat: "",
  },
  mutations: {
    SET_USER(state, payload) {
      state.user = payload;
    },
    JOIN_ROOM(state, roomName) {
      const payload = {
        username: state.user,
        roomName,
      };
      socket.emit("join-room", payload);
    },
    DIALOG_FLOW_CHAT(state, text) {
      state.chat = text;
    },
  },
  actions: {
    dialogFlow(context, text) {
      axios({
        method: "post",
        url: "http://localhost:3000",
        data: text,
      })
        .then(({ data }) => {
          context.emit("DIALOG_FLOW_CHAT", data);
        })
        .catch((err) => {
          console.log(err);
        });
    },
  },
  getters: {
    user: (state) => state.user,
    chat: (state) => state.chat,
  },
  modules: {},
});
