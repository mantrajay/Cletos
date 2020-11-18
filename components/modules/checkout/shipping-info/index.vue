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
            title="CHECKOUT INFORMATION" />
          <v-stepper value="1">
            <v-stepper-header>
              <v-stepper-step
                step="1"
                color="#d52827">
                SHIPPING INFORMATION
              </v-stepper-step>
              <v-divider></v-divider>
              <v-stepper-step step="2">REVIEW AND PAY</v-stepper-step>
              <v-divider></v-divider>
              <v-stepper-step step="3">TRACKING ORDER</v-stepper-step>
            </v-stepper-header>
            <v-stepper-content step="1">
              <v-row>
                <v-col
                  cols="12"
                  md="6"
                  sm="6">
                  <h4>Delivery Address</h4>
                  <small class="mt-n1"><b>Note:</b> Selected shipping address marked with check</small>
                </v-col>
                <v-col
                  cols="12"
                  md="6"
                  sm="6"
                  v-if="!parseInt(SHIPPING.amount)">
                  <v-alert
                    dense
                    outlined
                    type="error">
                    Shipping address out of reach.
                    </v-alert>
                </v-col>
              </v-row>
              <Addresses
                class="mt-n5"
                @address="setAddress"
                @set-instructions="setInstructions"
                :loading="loading"/>
            </v-stepper-content>
          </v-stepper>
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
            :disabled="disableCheckout"
            depressed
            @click="eventReviewPay"
            block>
            Checkout Now
          </v-btn>
        </v-col>
      </v-row>
    </v-col>
  </v-row>
</div>
</template>
<script>
import Addresses from './addressList'
export default {
  name: 'Shipping-Information',
  components: {
    Addresses
  },

  data () {
    return {
      step: 1,
      rows: [
        { cols: 6, md: 2, sm: 2, type: 'card' },
        { cols: 4, md: 3, sm: 3, type: 'card' }
      ],
      loading: false,
      address: {},
      instructions: ''
    }
  },

  computed: {
    disableCheckout () {
      return !this.cartItemsLenth || !parseInt(this.SHIPPING.id) || !this.address
    }
  },

  methods: {
    setAddress (address) {
      this.address = address
    },

    setInstructions (setInstructions) {
      this.instructions = setInstructions
    },

    eventReviewPay () {
      this.SET_SHIPPING_INFO({
        address: this.address,
        instructions: this.instructions,
      })
      this.goTo('/checkout/order-review')
    }
  }
}
</script>