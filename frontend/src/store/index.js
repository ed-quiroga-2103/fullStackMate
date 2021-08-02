// store/index.js

import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
    state: {
        logged: false,
        state: "Log In!",
        mainGraph: {}
    },
    getters: {},
    mutations: {

        changeLogState(state, payload) {

            if (payload === "1") {
                state.logged = true;
                state.state = "Logged!"
            } else {
                state.logged = false;
                state.state = "Log In!"
            }
        },

        changeMainGraphState(state, payload) {
            state.mainGraph = payload;
        }

    },
    actions: {}
});