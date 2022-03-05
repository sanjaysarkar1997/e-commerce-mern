<template>
  <div id="app">
    <NavBar />
    <br />
    <div style="min-height: 100vh">
      <!-- route outlet -->
      <!-- component matched by the route will render here -->
      <router-view></router-view>
    </div>
    <br />
    <FooterSection />
  </div>
</template>

<script>
import NavBar from "./components/Navbar/NabBar.vue";
import FooterSection from "./components/Footer/FooterSection.vue";
export default {
  name: "App",
  components: {
    NavBar,
    FooterSection,
  },
};
</script>

<style>
#app {
}
</style>
