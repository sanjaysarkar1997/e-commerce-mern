import Vue from "vue";
import App from "./App.vue";
import Buefy from "buefy";
import VueRouter from "vue-router";
import router from "./routes/index";

import "buefy/dist/buefy.css";

Vue.config.productionTip = false;

Vue.use(Buefy);
Vue.use(VueRouter);

new Vue({
  el: "#app",
  router,
  render: (h) => h(App),
});
