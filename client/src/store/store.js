import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

const state = {
  count: 0,
  cartValue: [],
};

const getters = {
  evenOrOdd: (state) => (state.count % 2 === 0 ? "even" : "odd"),
};

const mutations = {
  increment(state) {
    state.count++;
  },

  decrement(state) {
    state.count--;
  },

  addToCart(state, payload) {
    state.cartValue.push(payload);
    console.log(state.cartValue);
  },

  removeFromCart(state, payload) {
    // fine the index of the item to remove
    const index = state.cartValue.findIndex((item) => item._id === payload);
    state.cartValue.splice(index, 1);
  },
};

const actions = {
  increment: ({ commit }) => commit("increment"),
  decrement: ({ commit }) => commit("decrement"),
  addToCart: ({ commit }, payload) => commit("addToCart", payload),
  removeFromCart: ({ commit }, payload) => commit("removeFromCart", payload),
};

export default new Vuex.Store({
  state,
  getters,
  actions,
  mutations,
});
