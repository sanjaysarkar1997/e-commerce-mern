<template>
  <div class="container">
    <h6 class="title is-6" style="margin-bottom: 10px">Manage Address</h6>
    <div class="columns is-multiline">
      <div class="column is-12">
        <div class="card">
          <div class="card-content">
            <div class="content">
              <h6 class="title is-6" style="margin-bottom: 0px">
                ADD NEW ADDRESS
              </h6>
            </div>
          </div>
        </div>
      </div>
      <div
        class="column is-12"
        v-for="address of addresses"
        :key="address.mobile"
      >
        <div class="card">
          <div class="card-content">
            <div class="content">
              <span class="tag is-light">{{ address.type.toUpperCase() }}</span>
              <div style="margin: 8px 0px">
                <p class="title is-6">
                  {{ address.name }} &nbsp; {{ address.mobile }}
                </p>
                <p>
                  {{ address.address }}, {{ address.city }},
                  {{ address.state }}, {{ address.country }},
                  {{ address.pin }}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "CheckoutPage",
  data() {
    return {
      addresses: [],
    };
  },
  mounted() {
    console.log("CheckoutPage mounted");
    console.log(this.$store.state.cartValue.length);
    // if cart is empty, redirect to home
    if (this.$store.state.cartValue.length === 0) {
      this.$router.push("/").catch(() => {});
    }
    this.addresses = this.$store.state.userDetails.savedAddresses;
  },
};
</script>

<style></style>
