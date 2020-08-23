import Vue from "vue";
import Vuex from "vuex";
import socket from "../config/socket.js";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    user: {},
    players: [],
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
    GAME_DATA(state, game) {
      state.players = game;
    },
  },
  actions: {},
  getters: {
    user: (state) => state.user,
  },
  modules: {},
});
