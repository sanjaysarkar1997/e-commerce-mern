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
        <div class="card-image">
          <figure class="image is-4by3">
            <img
              src="https://bulma.io/images/placeholders/1280x960.png"
              alt="Placeholder image"
            />
          </figure>
        </div>
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

          <div class="content">
            {{ product.description }}
            <br />
            <time datetime="2016-1-1">{{ product.createdAt }}</time>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { getServices } from "../services/httpServices";

export default {
  name: "SingleProduct",
  data() {
    return {
      product: {},
    };
  },
  methods: {
    async created() {
      const { ok, message, data } = await getServices(
        `/api/v1/get-product/${this.$route.params.id}`
      );
      if (ok) {
        console.log("data", data);
        this.product = data;
      } else {
        this.$buefy.toast.open({
          message: message,
        });
      }
    },
  },
  mounted() {
    this.created();
  },
};
</script>

<style></style>
