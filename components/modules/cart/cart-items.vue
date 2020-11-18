<template>
<div>
  <v-row
    class="mt-2"
    v-if="CART_ITEMS.length">
    <v-col
      v-for="(items, index) in CART_ITEMS"
      :key="index"
      cols="12"
      md="12"
      sm="12">
      <Card
        :elevation="0"
        :outlined="true"
        class="mt-n5"
        :loading="loading">
        <v-row>
          <v-col
            cols="12"
            md="2"
            sm="2"
            class="ml-2">
            <v-img
              :src="`${GET_API_ASSETS}/${items.image}`"
              :aspect-ratio="1.7"/>
          </v-col>
          <v-col
            cols="12"
            md="3"
            sm="3"
            class="mt-2">
            <p class="cart-name">{{ items.name.toLowerCase() }}</p>
            <p class="variant-name">
              {{ items.varaintName }}
              <span
                v-if="items.varaintId"
                class="variant-info">₱{{ formatMoney(items.variantPrice) }}</span>
              <span
                v-else
                class="variant-info">₱{{ formatMoney(items.price) }}</span>
            </p>
          </v-col>
          <v-col
            cols="12"
            md="3"
            sm="3"
            class="mt-3">
            <v-text-field
              outlined
              dense
              readonly
              rounded
              class="quantity"
              :loading="items.isLoading"
              :disabled="items.isLoading"
              v-model="items.quantity">
              <v-icon
                slot="prepend-inner"
                :class="{'quantity-minus': items.quantity <= 1}"
                :color="items.quantity > 1 ? 'secondary' : '#d5d1d1'"
                @click="changeQuantity(index, items, 'minus')">
                mdi-minus
              </v-icon>
              <v-icon
                slot="append"
                color="rgb(213 40 39)"
                @click="changeQuantity(index, items, 'add')">
                mdi-plus
              </v-icon>
            </v-text-field>
          </v-col>
          <v-col
            cols="12"
            md="2"
            sm="2"
            class="text-center mt-4">
            <span
              class="cart-price"
              v-if="items.varaintId">
              ₱{{ formatMoney(parseFloat(items.variantPrice)*parseFloat(items.quantity)) }}
            </span>
            <span
              class="cart-price"
              v-else>
              ₱{{ formatMoney(parseFloat(items.price)*parseFloat(items.quantity)) }}
            </span>
          </v-col>
          <v-col
            cols="2"
            md="1"
            sm="1"
            class="text-right mt-3">
            <v-btn
              fab
              small
              elevation="0"
              color="error"
              :disabled="items.isLoading"
              @click="confirmDelete(index, items.cartId)">
              <v-icon>mdi-trash-can-outline</v-icon>
            </v-btn>
          </v-col>
        </v-row>
      </Card>
    </v-col>
  </v-row>
  <v-row v-else>
    <v-col
      cols="12"
      md="12"
      sm="12">
      <NoData />
    </v-col>
  </v-row>
  <AlertCallBack
    v-if="showAlert"
    @event="deleteCartItem"
    @close="showAlert = false"
    :callBack="alertCallBack" />
</div>
</template>
<script>
import { mapMutations } from 'vuex'
export default {
  name: 'Cart-Items-Cart',
  props: {
    loading: {
      type: Boolean,
      default: false
    },

    items: {
      type: Array,
      default: () => []
    }
  },

  data () {
    return {
      showAlert: false,
      item: {
        index: null,
        id: null
      }
    }
  },

  methods: {
    confirmDelete (index, id) {
      this.item = {
        index: index,
        id: id
      }
      this.showAlert = true
      this.alertCallBack = {
        variant: 'error',
        title: 'Confirmation',
        message: 'Are you sure you want to delete this item?'
      }
    },

    async changeQuantity (index, item, type) {
      this.SET_CART_QTY({index: index, type: type })
      try {
        item.loading = true
        let response = await this.API_POST({
          url: '/Cart/create',
          data: {
            productId: item.id,
            quantity: item.quantity,
          }
        })
        this.SET_CART_ITEMS(response.data)
      } catch (error) {
        this.errorHandle(error)
        this.SET_CART_QTY(index, 'minus')
      } finally { item.loading = false }
    },

    async minusQuantity (items) {

    },

    async deleteCartItem () {
      try {
        this.alertCallBack.loading = true
        let response = await this.API_POST({
          url: '/Cart/delete',
          data: { id: this.item.id}
        })
        this.items.splice(this.item.index, 1)
        this.SET_CART_ITEMS(response.data)
        this.SET_ALERT_SUCCESS(response.totalPage)
      } catch (error) { this.errorHandle(error)
      } finally {
        this.alertCallBack.loading = false
        this.showAlert = false
      }
    }
  }
}
</script>
<style scoped>
p {
  margin: auto;
}
.cart-length {
  font-weight: bold;
  font-size: 19px;
  color: #222b45;
}
.cart-quantity {
  font-size: 12px;
  color: #222b45;
}
.cart-name {
  text-transform: capitalize;
  color: #222b45;
  font-size: 20px;
  font-weight: bold;
}
.variant-name {
  font-size: 12px;
}
.quantity >>> input {
  text-align: center !important;
  font-size: 14px !important;
}
.quantity >>> .v-input__slot {
  width: 100%;
  height: 40px;
  margin: auto;
}
.quantity >>> .v-text-field__slot {
  height: 40px !important;
}
.quantity-minus {
  pointer-events: none !important;
}
.total-price {
  background-color: #d52827;
}
.cart-price {
  font-weight: bold;
  color: #222b45;
  font-size: 20px;
}
.variant-info {
  font-size: 15px;
  color: #222b45;
}
</style>