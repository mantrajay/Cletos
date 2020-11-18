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
          <v-stepper value="2">
            <v-stepper-header>
              <v-stepper-step
                step="1"
                complete
                color="#d52827">
                SHIPPING INFORMATION
              </v-stepper-step>
              <v-divider></v-divider>
              <v-stepper-step
                step="2"
                color="#d52827">
                REVIEW AND PAY
              </v-stepper-step>
              <v-divider></v-divider>
              <v-stepper-step step="3">TRACKING ORDER</v-stepper-step>
            </v-stepper-header>
            <v-stepper-content step="2">
              <FormReviewPay
                @form="setForm"
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
          <v-text-field
            outlined
            class="mt-3"
            dense
            v-model="discountCode"
            label="Enter discount/promo code">
            <v-icon
              class="mr-n1"
              :disabled="!discountCode"
              slot="append"
              @click="checkCode"
              color="rgb(213 40 39)">
              mdi-magnify
            </v-icon>
          </v-text-field>
          <p
            class="mt-n6 error-alert"
            :class="{'success-alert': alertDiscount.type === 'success'}"
            v-if="alertDiscount.show">
            <v-icon
              small
              :color="alertDiscount.type === 'success' ? 'success' : '#d12222'">
              {{ alertDiscount.type === 'success' ? 'mdi-check' : 'mdi-close'}}
            </v-icon>
            {{ alertDiscount.message }}
          </p>
          <v-btn
            class="mt-n4 white--text"
            color="#D52827"
            :disabled="disableBtnPlaceOrder || loading"
            depressed
            @click="placeOrder"
            :loading="loading"
            block>
            Place Order
          </v-btn>
        </v-col>
      </v-row>
    </v-col>
  </v-row>
</div>
</template>
<script>
import FormReviewPay from './formReviewPay'
export default {
  components: {
    FormReviewPay
  },
  
  data () {
    return {
      loading: false,
      step: 1,
      rows: [
        { cols: 6, md: 2, sm: 2, type: 'card' },
        { cols: 4, md: 3, sm: 3, type: 'card' }
      ],
      enableBtn: false,
      form: {},
      discountCode: '',
      alertDiscount: {
        show: false,
        type: 'success',
        message: ''
      }
    }
  },

  computed: {
    disableBtnPlaceOrder () {
      return !this.cartItemsLenth || !parseInt(this.SHIPPING.id) || !this.SHIPPING_INFO.address || !parseInt(this.form.changeFor) || parseInt(this.form.changeFor) < parseInt(this.total)
    },

    total () {
      return parseFloat(this.SUBTOTAL) - parseFloat(this.SHIPPING.amount) - parseFloat(this.DISCOUNT.amount)
    }
  },

  methods: {
    async placeOrder () {
      try {
        this.loading = true
        const response = await this.API_POST({
          url: '/Checkout/placeOrder',
          data: {
            address: this.form.address,
            paymentMethod: this.form.paymentMethod,
            shipping: this.SHIPPING,
            discount: this.DISCOUNT,
            changeFor: this.form.changeFor,
            instructions: this.form.instructions,
            cartItems: this.CART_ITEMS
          }
        })
        let checkoutId = response.data.checkoutId
        this.goTo('/checkout/place-order/' + checkoutId)
        this.resetCart()
      } catch (error) {
        this.errorHandle(error)
      } finally { this.loading = false }
    },

    resetCart () {
      this.resetDicount()
      this.SET_SHIPPING_FEE({})
      this.SET_CART_ITEMS([])
    },

    setForm (form) {
      this.form = form
      Object.keys(form).forEach(index => {
        if (index !== 'instructions') {
          if (!form[index]) {
            this.enableBtn = true
          } else {
            if (index === 'changeFor') {
              if(parseFloat(form[index]) < this.total) this.enableBtn = true
            } else this.enableBtn = false
          } 
        }
      })
    },

    async checkCode () {
      try {
        this.loadingDiscount = true
        let response = await this.API_POST({
          url: '/Discount/checkDiscount',
          data: { code: this.discountCode }
        })
        let data = response.data.discount
        this.SET_DISCOUNT({
          amount: parseFloat(data.amount),
          name: data.name,
          id: data.id
        })
        this.showAlert('success', 'Discout/Promo Code has been applied')
      } catch (error) {
        let errorMes = error.response.data.response
        this.resetDicount()
        this.showAlert('error', errorMes)
      } finally { this.loadingDiscount = false }
    },

    showAlert (type, message) {
      this.alertDiscount.show = true
      this.alertDiscount.type = type
      this.alertDiscount.message = message
      setTimeout(() => {
        this.alertDiscount.show = false
        this.alertDiscount.type = 'error'
        this.alertDiscount.message = ''
      }, 3000)
    },

    resetDicount () {
      this.SET_DISCOUNT({
        amount: 0,
        name: '',
        id: ''
      })
    }
  }
}
</script>
<style scoped>
.success-alert {
  font-size: 12px;
  padding: 2px 10px;
  font-weight: bold;
  margin-left: -8px;
  color: #4caf50 !important;
}
.error-alert {
  color: #d12222;
  font-size: 12px;
  padding: 2px 10px;
  font-weight: bold;
  margin-left: -8px;
}
</style>