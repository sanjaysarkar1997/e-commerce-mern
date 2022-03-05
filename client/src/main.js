import Vue from "vue";
import App from "./App.vue";
import Buefy from "buefy";
import VueRouter from "vue-router";
import Vuex from "vuex";

import store from "./store/store";
import router from "./routes/index";

import "buefy/dist/buefy.css";

Vue.config.productionTip = false;


Vue.use(Buefy);
Vue.use(VueRouter);
Vue.use(Vuex);

new Vue({
  el: "#app",
  router,
  store,
  render: (h) => h(App),
});
