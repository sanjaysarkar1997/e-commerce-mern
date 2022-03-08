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
              <p class="title is-4">
                {{ product.name }}
                <b-rate
                  v-if="rating"
                  v-model="rating"
                  disabled="disabled"
                  size="small"
                >
                </b-rate>
              </p>

              <!-- <p class="subtitle is-6">@{{ product.slug }}</p> -->
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
            <div class="column is-2">
              <div class="" style="display: flex">
                <b-button @click="increment()"> + </b-button>
                <b-input type="text" v-model="quantity" placeholder="Quantity">
                </b-input>
                <b-button
                  :disabled="quantity === 1 && 'true'"
                  @click="decrement()"
                >
                  -
                </b-button>
              </div>
            </div>
            <div class="column is-3">
              <b-button
                style="float: right; margin-left: 10px"
                type="is-primary"
                >Buy Now</b-button
              >
              <b-button
                style="float: right"
                type="is-success"
                :disabled="isAdded(product._id) && 'true'"
                @click="addToCart({ ...product, quantity: quantity })"
                >{{
                  isAdded(product._id) ? "Go To Cart" : "Add to Cart"
                }}</b-button
              >
            </div>
          </div>
        </div>
      </div>
      <br />
      <div class="columns">
        <div class="column">
          <div class="card">
            <div class="card-content">
              <h6 class="title is-5">Reviews</h6>
            </div>
          </div>
        </div>
      </div>
      <div class="columns is-multiline">
        <div
          class="column is-6"
          v-for="review of product.reviews"
          :key="review._id"
        >
          <div class="card">
            <div class="card-content">
              <h6 class="title is-6 light">{{ review.review }}</h6>
              <b-rate v-model="review.rating"> </b-rate>
            </div>
          </div>
        </div>
      </div>
      <div class="columns">
        <div class="column">
          <div class="card">
            <div class="card-content">
              <h6 class="title is-5">Write a Review</h6>
              <div class="field">
                <b-field label="Review">
                  <b-input v-model="name"></b-input>
                </b-field>
                <label class="label">Rating</label>
                <b-rate v-model="submitRating"></b-rate>
                <b-button type="is-primary" @click="submitReview()"
                  >Submit</b-button
                >
              </div>
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
      quantity: 1,
      rating: 0,
      name: "",
      submitRating: 0,
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
        this.calculatedRating(data.reviews);
      } else {
        this.$buefy.toast.open({
          message: message,
        });
      }
    },

    async submitReview() {
      console.log(this.name, this.submitRating);
      // const { ok, message, data } = await postServicesWithToken(
      //   `/api/v1/submit-review/${this.$route.params.id}`,
      //   {
      //     name: this.name,
      //     rating: this.rating,
      //     review: this.review,
      //   }
      // );
      // if (ok) {
      //   this.product.reviews.push(data);
      //   this.calculatedRating(this.product.reviews);
      //   this.name = "";
      //   this.review = "";
      // } else {
      //   this.$buefy.toast.open({
      //     message: message,
      //   });
      // }
    },

    increment() {
      this.quantity++;
      this.product.quantity = this.quantity;
    },

    decrement() {
      if (this.quantity > 1) {
        this.quantity--;
      }
    },

    isAdded(id) {
      if (this.$store.state.cartValue.find((item) => item._id === id)) {
        return true;
      } else {
        return false;
      }
    },
    calculatedRating(ratings) {
      let total = 0;
      ratings.forEach((rating) => {
        total += rating.rating;
      });
      total = total / ratings.length;
      total = +total.toFixed(1);
      this.rating = total;
    },
  },

  computed: mapGetters(["evenOrOdd"]),

  mounted() {
    this.created();
  },
};
</script>

<style></style>
