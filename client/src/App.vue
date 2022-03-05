<template>
  <div id="app">
    <NavBar />
    
    <!-- route outlet -->
    <!-- component matched by the route will render here -->
    <router-view></router-view>
  </div>
</template>

<script>
import NavBar from "./components/Navbar/NabBar.vue";

export default {
  name: "App",
  components: {
    NavBar,
  },
};
</script>

<style>
#app {
}
</style>
