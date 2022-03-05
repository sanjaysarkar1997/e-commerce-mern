<template>
  <div>
    <br />
    <div class="container">
      <nav class="breadcrumb" aria-label="breadcrumbs">
        <ul>
          <li><a href="#">Vue-Node</a></li>
          <li><a href="#">Products</a></li>
          <li><a href="#">Mobile</a></li>
          <li class="is-active">
            <a href="#" aria-current="page">{{ $route.params.id }}</a>
          </li>
        </ul>
      </nav>

      <div class="card">
        <b-carousel>
          <b-carousel-item v-for="(carousel, i) in product.images" :key="i">
            <section>
              <div class="hero-body has-text-centered">
                <img :src="carousel" alt="Placeholder image" />
              </div>
            </section>
          </b-carousel-item>
        </b-carousel>
        <div class="card-content">
          <div class="media">
            <div class="media-left">
              <figure class="image is-48x48">
                <img
                  src="https://bulma.io/images/placeholders/96x96.png"
                  alt="Placeholder image"
                />
              </figure>
            </div>
            <div class="media-content">
              <p class="title is-4">{{ product.name }}</p>
              <p class="subtitle is-6">@{{ product.slug }}</p>
            </div>
          </div>

          <div class="columns">
            <div class="column">
              <div class="content">
                {{ product.description }}
                <br />
                <time datetime="2016-1-1">{{ product.createdAt }}</time>
              </div>
            </div>
            <div class="column">
              <b-button
                style="float: right"
                type="is-success"
                :disabled="isAdded(product._id) && 'true'"
                @click="addToCart(product)"
                >{{
                  isAdded(product._id) ? "Added To Cart" : "Add to Cart"
                }}</b-button
              >
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { getServices } from "../services/httpServices";
import { mapGetters, mapActions } from "vuex";

export default {
  name: "SingleProduct",
  data() {
    return {
      product: {},
    };
  },
  methods: {
    ...mapActions(["increment", "decrement", "addToCart"]),
    async created() {
      const { ok, message, data } = await getServices(
        `/api/v1/get-product/${this.$route.params.id}`
      );
      if (ok) {
        this.product = data;
      } else {
        this.$buefy.toast.open({
          message: message,
        });
      }
    },
    isAdded(id) {
      console.log("id", id);
      if (this.$store.state.cartValue.find((item) => item._id === id)) {
        return true;
      } else {
        return false;
      }
    },
  },
  computed: mapGetters(["evenOrOdd"]),

  mounted() {
    this.created();
    console.log("this.product", this.$store.state);
  },
};
</script>

<style></style>
