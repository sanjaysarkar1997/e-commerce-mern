<template>
  <div class="container">
    <br />
    <div class="columns is-multiline is-mobile">
      <div class="column is-4" v-for="product of products" :key="product.id">
        <router-link :to="'/product/' + product._id">
          <div class="card">
            <div class="card-image">
              <figure class="image is-4by3">
                <img
                  :src="product.image"
                  :alt="product.name"
                />
              </figure>
            </div>
            <div class="card-content">
              <div class="media">
                <div class="media-left">
                  <figure class="image is-48x48">
                    <img
                      :src="product.image"
                      :alt="product.name"
                    />
                  </figure>
                </div>
                <div class="media-content">
                  <p class="title is-4">{{ product.name }}</p>
                  <p class="subtitle is-6">@{{ product.slug }}</p>
                </div>
              </div>

              <div class="content">
                {{ product.description }}
                <br />
                <time datetime="2016-1-1">{{ product.createdAt }}</time>
              </div>
            </div>
          </div>
        </router-link>
      </div>
    </div>
  </div>
</template>

<script>
import { getServices } from "../services/httpServices";

export default {
  name: "HomePage",
  data() {
    return {
      products: [],
    };
  },
  methods: {
    async getProducts() {
      const { ok, message, data } = await getServices(
        "/api/v1/get-all-active-products"
      );
      if (ok) {
        console.log("data", data);
        this.products = data;
      } else {
        this.$buefy.toast.open({
          message: message,
          type: "is-danger",
        });
      }
    },
  },
  mounted() {
    this.getProducts();
    console.log("HomePage mounted");
  },
};
</script>

<style></style>
