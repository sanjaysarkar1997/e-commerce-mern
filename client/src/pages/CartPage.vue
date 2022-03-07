<template>
  <div class="container">
    <div class="columns is-multiline">
      <div class="column is-12" v-for="product of products" :key="product._id">
        <div class="box">
          <div class="columns">
            <div class="column is-3">
              <img :src="product.image" :alt="product.name" />
            </div>
            <div class="column is-9">
              <div style="display: flex; justify-content: space-between">
                <div style="line-height: 40px">
                  Name :
                  <span class="title is-6"> {{ product.name }}</span>
                  <br />
                  Qty:
                  <span class="title is-6">{{ product.quantity }}</span> <br />
                  Price: <span class="title is-6">{{ product.price }}</span>
                  <br />
                  Total:
                  <span class="title is-6">{{
                    product.quantity * product.price
                  }}</span>
                </div>
                <b-button
                  type="is-danger"
                  @click="removeFromCart(product._id)"
                  icon-right="delete"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="column is-12" v-if="products.length">
        <div class="box">
          <div style="display: flex; justify-content: space-between">
            <div style="line-height: 40px">
              Total:
              <span class="title is-6">{{ getTotal(products) }}</span>
            </div>
            <b-button type="is-success" @click="goToCheckout()"
              >Checkout</b-button
            >
          </div>
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

    goToCheckout() {
      this.$router.push("/checkout").catch(() => {});
    },

    getTotal(products) {
      return products.reduce((acc, product) => {
        return acc + product.quantity * product.price;
      }, 0);
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
