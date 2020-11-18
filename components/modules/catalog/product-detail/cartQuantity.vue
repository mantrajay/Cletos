<template>
<div>
  <v-row>
    <v-col cols="12" md="12" sm="12">
      <p class="product-desc">Quantity</p>
    </v-col>
  </v-row>
  <v-row class="mt-n8">
    <v-col
      cols="12"
      md="6"
      sm="6"
      class="text-center">
      <v-text-field
        outlined
        readonly
        class="quantity"
        dense
        rounded
        v-model="quantity">
        <v-icon
          slot="prepend-inner"
          :class="{ 'quantity-minus': quantity <= 1 }"
          :color="quantity > 1 ? 'secondary' : '#d5d1d1'"
          @click="decrement">
          mdi-minus
        </v-icon>
        <v-icon @click="quantity++" slot="append" color="rgb(213 40 39)">
          mdi-plus
        </v-icon>
      </v-text-field>
    </v-col>
  </v-row>
  <v-row class="mt-n10">
    <v-col
      cols="12"
      md="6"
      sm="6"
      class="text-center">
      <v-tooltip
        color="warning"
        v-model="successAdd"
        top >
        <template v-slot:activator="{ on, attrs }">
          <v-btn
            class="btn-tooltip"
            icon
            v-bind="attrs"
            v-on="on">
          </v-btn>
        </template>
        <span>
          <v-icon color="#fff">mdi-cart-plus</v-icon>
          {{ successMessage }}
        </span>
      </v-tooltip>
      <v-btn
        class="mt-n10"
        block
        rounded
        color="#D52827"
        dark
        @click="addToCart"
        :loading="loading">
        <v-icon>mdi-cart</v-icon>
        <span class="btn-add-cart ml-2 ">Add to Cart</span>
      </v-btn>
    </v-col>
  </v-row>
</div>
</template>
<script>
export default {
  data() {
    return {
      modalShow: false,
      quantity: 1,
      loadingAdd: false,
      successAdd: false,
      successMessage: ''
    }
  },

  props: {
    loading: {
      type: Boolean,
      default: false
    },

    inventory: {
      type: Object,
      default: null
    },

    variantId: {
      type: Object,
      default: null
    }
  },

  methods: {
    decrement() {
      if (this.quantity <= 1) return
      this.quantity--
    },

    validateStock() {
      return this.inventory.totalQty < parseInt(this.quantity)
        ? false
        : this.inventory.totalQty < this.inventory.minQty
        ? false
        : true
    },

    async addToCart () {
      if (!this.GET_AUTH.token) {
        this.SET_SHOW_LOGIN()
        return
      }
      try {
        this.loadingAdd = true
        let response = await this.API_POST({
          url: '/Cart/create',
          data: {
            productId: this.$route.params.id,
            quantity: parseInt(this.quantity)
          }
        })
        this.successAdd = true
        this.successMessage = 'Product successfully added to cart!'
        setTimeout(() => {
          this.successAdd = false
          this.successMessage = ''
        }, 3000)
        console.log(response.data)
        this.SET_CART_ITEMS(response.data)
        this.SNACKBAR_SHOW({ message: response.totalPage })
      }
      catch (error) {
        this.errorHandle(error)
      }
      finally { this.loadingAdd = false }
    }
  }
}
</script>
<style scoped>
.btn-add-cart {
  text-transform: initial;
}
.quantity-wrapper {
  border: 1px solid #ede9dc;
  border-radius: 22px;
  width: 100% !important;
}
.quantity-label >>> .v-btn__content {
  color: #222b45 !important;
  font-weight: bold;
  font-size: 16px;
}

.v-btn:not(.v-btn--round).v-size--default {
  height: 41px;
}
.disable-minus {
  pointer-events: none;
}
.product-desc {
  font-size: 14px;
}
.quantity >>> input {
  text-align: center !important;
  font-size: 18px !important;
}
.quantity-minus {
  pointer-events: none !important;
}
.add-cart-btn {
  width: 250px;
}
.btn-tooltip {
  /* visibility: hidden; */
}
</style>
