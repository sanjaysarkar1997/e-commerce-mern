<template>
  <div class="container">
    <div class="columns" style="margin: auto">
      <div class="column is-12">
        <form style="min-width: 400px">
          <h1 style="text-align: center">Vue Node E-Commerce User Login</h1>
          <br />
          <b-field label="Email">
            <b-input value="" v-model="email" maxlength="30"></b-input>
          </b-field>

          <b-field label="Password">
            <b-input type="password" v-model="password" password-reveal>
            </b-input>
          </b-field>
          <b-button v-on:click="submit()" type="is-primary">Login</b-button>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import { postServices } from "../services/httpServices";
import { mapActions } from "vuex";

export default {
  name: "SignIn",
  data() {
    return {
      email: "",
      password: "",
    };
  },
  methods: {
    ...mapActions(["setUserDetails"]),
    async submit() {
      console.log("submit", this.email, this.password);

      const { ok, message, data } = await postServices("/api/v1/user-login", {
        email: this.email,
        password: this.password,
      });
      if (ok) {
        console.log("data", data);
        localStorage.setItem("vue-node-token", data.token);
        this.setUserDetails(data.user);
        this.$buefy.toast.open({
          message: "Login Success",
          type: "is-success",
          queue: false,
          duration: 2000,
        });
        this.$router.push("/");
      } else {
        this.$buefy.toast.open({
          message: message,
          type: "is-danger",
        });
      }
    },
  },
};
</script>

<style scoped>
.container {
  max-width: 400px;
  margin: 0 auto;
  min-height: calc(100vh - 56px);
  display: flex;
  align-items: center;
}
</style>
