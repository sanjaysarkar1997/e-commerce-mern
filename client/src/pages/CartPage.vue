<template>
  <div class="container">
    <div class="columns is-multiline">
      <div class="column is-12" v-for="product of products" :key="product._id">
        <div class="box">
          <img :src="product.image" :alt="product.name" />
          <div>
            {{ product.name }}
          </div>
          <b-button
            type="is-danger"
            @click="removeFromCart(product._id)"
            icon-right="delete"
          />
        </div>
      </div>
    </div>
    <div class="columns" v-if="!products.length">
      <div class="column is-12">
        <div class="box" style="width: 100%">
          <p class="has-text-centered">Your cart is empty</p>
          <br />
          <b-button style="margin: auto; display: block" @click="goToHome()">
            Continue shopping
          </b-button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions } from "vuex";

export default {
  name: "MyCart",
  data() {
    return {
      products: [],
    };
  },
  methods: {
    ...mapActions(["removeFromCart"]),
    goToHome() {
      this.$router.push("/").catch(() => {});
    },
  },

  mounted() {
    console.log("MyCart mounted");
    this.$store.state.cartValue.forEach((item) => {
      console.log("item", item);
    });
    this.products = this.$store.state.cartValue;
  },
};
</script>

<style></style>
