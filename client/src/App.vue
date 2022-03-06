<template>
  <div id="app">
    <NavBar />
    <br />
    <div style="min-height: 100vh">
      <!-- route outlet -->
      <!-- component matched by the route will render here -->
      <router-view :key="$route.path"></router-view>
    </div>
    <br />
    <FooterSection />
  </div>
</template>

<script>
import NavBar from "./components/Navbar/NabBar.vue";
import FooterSection from "./components/Footer/FooterSection.vue";
import { getServicesWithToken } from "./services/httpServices";
import { mapActions } from "vuex";

export default {
  name: "App",
  components: {
    NavBar,
    FooterSection,
  },

  methods: {
    ...mapActions(["setUserDetails"]),
    async getUserDetails() {
      try {
        const { ok, data } = await getServicesWithToken("/api/v1/user-details");
        if (ok) {
          console.log("userDetails", data);
          this.setUserDetails(data);
        } else {
          this.userDetails = null;
        }
      } catch (error) {
        console.log(error);
      }
    },
  },

  mounted() {
    if (localStorage.getItem("vue-node-token")) {
      this.getUserDetails();
    }
  },
};
</script>

<style>
#app {
}
</style>
