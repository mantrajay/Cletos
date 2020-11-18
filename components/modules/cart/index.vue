<template>
<div class="page-container">
  <v-row class="mt-2">
    <v-col
      cols="12"
      md="12"
      sm="12">
      <v-row>
        <v-col
          cols="12"
          md="9"
          sm="9">
          <Header
            :button="false"
            :title="`MY CART LIST - (${cartItemsLenth || 0})`" />
          <CartItems />
        </v-col>
        <v-col
          cols="12"
          md="3"
          sm="3"
          class="mt-14">
          <Computation />
          <v-btn
            class="mt-3 white--text"
            color="#D52827"
            :disabled="!cartItemsLenth"
            depressed
            @click="goTo('/checkout/shipping-information')"
            block>
            Proceed to Checkout
          </v-btn>
        </v-col>
      </v-row>
    </v-col>
  </v-row>
</div>
</template>
<script>
import CartItems from './cart-items'
export default {
  components: {
    CartItems,
  },

  data () {
    return {
      rows: [
        { cols: 6, md: 2, sm: 2, type: 'card' },
        { cols: 4, md: 3, sm: 3, type: 'card' }
      ]
    }
  }
}
</script>