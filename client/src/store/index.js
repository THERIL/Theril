import Vue from "vue";
import Vuex from "vuex";
import socket from "../config/socket.js";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    username: "",
    players: [],
  },
  mutations: {
    SET_USERNAME(state, payload) {
      console.log(payload, "dari mutation");
      state.username = payload;
    },
    JOIN_ROOM(state, roomName) {
      const payload = {
        username: state.username,
        roomName,
      };
      socket.emit("join-room", payload);
    },
    GAME_DATA(state, game) {
      console.log(game, "dari store");
      // state.players = game;
    },
  },
  actions: {},
  getters: {
    username: (state) => state.username,
  },
  modules: {},
});
