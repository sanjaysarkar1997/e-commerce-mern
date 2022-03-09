import VueRouter from "vue-router";

import SignUp from "../pages/SignUp.vue";
import SignIn from "../pages/SignIn.vue";
import HomePage from "../pages/HomePage.vue";
import SingleProduct from "../pages/SingleProduct.vue";
import MyAccount from "../pages/MyAccount.vue";
import CartPage from "../pages/CartPage.vue";
import CheckoutPage from "../pages/Checkout.vue";

import guardMyroute from "@/services/authGuard";

// 1. Define route components.
// These can be imported from other files

// 2. Define some routes
const routes = [
  { path: "*", redirect: "/" },
  { path: "/", component: HomePage, Name: "HomePage" },
  { path: "/sign-up", component: SignUp, Name: "SignUp" },
  { path: "/login", component: SignIn, Name: "SignIn" },
  { path: "/home", redirect: "/" },

  {
    path: "/my-account",
    component: MyAccount,
    Name: "MyAccount",
    beforeEnter: guardMyroute,
  },
  {
    path: "/cart",
    component: CartPage,
    Name: "Cart",
  },
  {
    path: "/checkout",
    component: CheckoutPage,
    Name: "Checkout",
    beforeEnter: guardMyroute,
  },
  {
    path: "/product/:id",
    component: SingleProduct,
    Name: "SingleProduct",
  },
];

// 3. Create the router instance and pass the `routes` option
// You can pass in additional options here, but let's
// keep it simple for now.
const router = new VueRouter({
  routes, // short for `routes: routes`
});

export default router;
