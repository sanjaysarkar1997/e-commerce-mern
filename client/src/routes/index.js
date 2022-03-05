import VueRouter from "vue-router";

import SignUp from "../pages/SignUp.vue";
import SignIn from "../pages/SignIn.vue";
import HomePage from "../pages/HomePage.vue";
import SingleProduct from "../pages/SingleProduct.vue";

// 1. Define route components.
// These can be imported from other files


// 2. Define some routes
const routes = [
  { path: "/product/:id", component: SingleProduct, Name: "SingleProduct" },
  { path: "/sign-up", component: SignUp, Name: "SignUp" },
  { path: "/login", component: SignIn, Name: "SignIn" },
  { path: "/", component: HomePage, Name: "HomePage" },
  { path: "*", redirect: "/" },
  { path:"/home",redirect:"/"}
];

// 3. Create the router instance and pass the `routes` option
// You can pass in additional options here, but let's
// keep it simple for now.
const router = new VueRouter({
  routes, // short for `routes: routes`
});

export default router;
