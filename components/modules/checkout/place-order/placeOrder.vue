<template>
  <div class="page-container">
    <v-row>
      <v-col
        cols="12"
        md="6"
        sm="6"
        class="place-order-message">
        <v-row>
          <v-col
            cols="12"
            md="12"
            sm="12">
            <h1 class="tracking-no">TRACKING # {{ orderDetail.trackingNo }}</h1>
            <h2 class="header">Your order has been placed!</h2>
            <p class="paragraph">
              Thank you for ordering with <b class="cletos">Cleto's Bakeshop</b>
            </p>
            <h3>Your order will arrive soon.</h3>
            <p>To track your order status kindly <b class="tracking-route" @click="goTo('/orders')">Click Here</b></p>
          </v-col>
          <v-col>
            <v-btn
              class="white--text"
              @click="goTo('/')"
              color="#d12222">
              Order Again
            </v-btn>
          </v-col>
        </v-row>
      </v-col>
      <v-col
        cols="12"
        md="6"
        sm="6"
        class="text-center">
        <img
          class="image-tracking"
          :src="require(`~/assets/images/order-tracking.gif`)" />
      </v-col>
    </v-row>
  </div>
</template>
<script>
export default {
  data () {
    return {
      orderDetail: {}
    }
  },

  created () {
    this.fetchOrder()
  },

  methods: {
    async fetchOrder () {
      try {
        this.loading = true
        let response = await this.API_GET({ url: '/Orders/show/' + this.$route.params.id  })
        this.orderDetail = response.data
      } catch (error) {
        this.errorHandle(error)
      } finally { this.loading = false }
    }
  }
}
</script>
<style scoped>
.order-again {
  color: #fff;
}
.tracking-route {
  color: #2196f3;
  cursor: pointer;
}
.cletos {
  color: #d12222;
}
.tracking-no {
  color: #d12222;
  border: 1px solid #d12222;
}
.image-tracking {
  width: 60%;
}
.place-order-message {
  text-align: center;
  margin-top: 15px;
}
.header {
  margin-top: 20px;
}
</style>