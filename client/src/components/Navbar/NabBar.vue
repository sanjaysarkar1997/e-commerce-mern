<template>
  <b-navbar>
    <template #brand>
      <b-navbar-item tag="router-link" :to="{ path: '/' }">
        <img
          src="https://raw.githubusercontent.com/buefy/buefy/dev/static/img/buefy-logo.png"
          alt="Lightweight UI components for Vue.js based on Bulma"
        />
      </b-navbar-item>
    </template>
    <template #start>
      <b-navbar-item active>
        <router-link to="/home">Home</router-link>
      </b-navbar-item>
      <b-navbar-item>
        <router-link to="/docs">Docs</router-link>
      </b-navbar-item>
      <b-navbar-dropdown label="Info">
        <b-navbar-item>
          <router-link to="/about">About</router-link>
        </b-navbar-item>
        <b-navbar-item>
          <router-link to="/contact">Contact</router-link>
        </b-navbar-item>
        <b-navbar-item>
          <router-link to="/my-account">My Account</router-link>
        </b-navbar-item>
        <b-navbar-item @click="logout()">Logout</b-navbar-item>
      </b-navbar-dropdown>
    </template>

    <template #end>
      <b-navbar-item tag="div">
        <div class="buttons">
          <b-button
            icon-right="shopping-cart"
            icon-pack="fas"
            @click="goToCart()"
            >{{ $store.state.cartValue.length }}</b-button
          >
          <router-link
            to="sign-up"
            class="button is-primary"
            v-if="!Object.keys($store.state.userDetails).length"
          >
            <strong>Sign up</strong>
          </router-link>
          <router-link
            to="login"
            class="button is-light"
            v-if="!Object.keys($store.state.userDetails).length"
          >
            Log in
          </router-link>
        </div>
      </b-navbar-item>
    </template>
  </b-navbar>
</template>
<script>
import { mapActions } from "vuex";
export default {
  name: "NavBar",
  data() {
    return {
      token: "",
    };
  },

  methods: {
    ...mapActions(["setUserDetails"]),
    getToken() {
      if (localStorage.getItem("vue-node-token")) {
        this.token = localStorage.getItem("vue-node-token");
        return true;
      } else {
        this.token = "";
        return false;
      }
    },
    goToCart() {
      this.$router.push("/cart").catch(() => {});
    },
    logout() {
      localStorage.removeItem("vue-node-token");
      this.setUserDetails({});
      this.$router.push("/").catch(() => {});
    },
  },

  mounted() {
    this.getToken();
  },
};
</script>
