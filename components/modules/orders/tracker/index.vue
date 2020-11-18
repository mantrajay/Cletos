<template>
<div class="page-container">
  <v-row class="order-label">
    <v-col
      cols="12"
      sm="4"
      md="4"
      class="border">
      Order Detail
    </v-col>
    <v-col
      cols="12"
      sm="5"
      md="5"
      class="border">
      {{ `Product Items (${cartItems.length || 0})` }}
    </v-col>
    <v-col
      cols="12"
      sm="3"
      md="3"
      class="border">
      Order Summary
    </v-col>
  </v-row>
  <v-row>
    <v-col
      cols="12"
      md="4"
      sm="4">
      <Detail
        :loading="loading"
        :checkOut="checkOut"
        :addressInfo="addressInfo"/>
    </v-col>
    <v-col
      cols="12"
      md="5"
      sm="5"
      class="mt-2">
      <CartItems
        :loading="loading"
        :items="cartItems"/>
    </v-col>
    <v-col
      cols="12"
      md="3"
      sm="3"
      class="mt-2">
      <Summary
        :computation="computation"
        :loading="loading" />
    </v-col>
  </v-row>
</div>
</template>
<script>
import CartItems from './trackerCartItems'
import Detail from './trackerDetail'
import Summary from './summary'
import { mapMutations } from 'vuex'
export default {
  components: {
    CartItems,
    Detail,
    Summary
  },

  data () {
    return {
      loading: false,
      cartItems: [],
      checkOut: {},
      addressInfo: {},
      shppingFee: 0,
      discount: 0,
      computation: {}
    }
  },

  created () {
    this.fetchOrder()
  },

  methods: {
    async fetchOrder () {
      try {
        this.loading = true
        const response = await this.API_POST({
          url: '/Orders/detail/' + this.$route.params.id
        })
        console.log(response.data)
        this.checkOut = response.data.checkuOut
        this.cartItems = response.data.cartItems
        this.addressInfo = response.data.addressInfo
        let shipping = response.data.shipping
        let discount = response.data.discount
        let total = 0
        this.cartItems.forEach(items => { total += parseFloat(items.price) * parseFloat(items.quantity) })
        let grandTotal = total + parseFloat(shipping.amount) - parseFloat(discount.amount)
        this.computation = {
          subTotal: total,
          shippingFee: shipping.amount,
          discount: discount.amount,
          total: grandTotal
        }
      } catch (error) {
        console.log(error)
      } finally { this.loading = false }
    }
  }
}
</script>
<style scoped>
.order-label {
  margin-top: 30px;
  background-color: #d12222;
  color: #fff;
  font-weight: bold;
  border-bottom: dotted;
}
.border {
  border: 7px solid #fff;
}
.tracking-no {
  color: #d52827;
}
</style>