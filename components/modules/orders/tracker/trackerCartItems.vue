<template>
<div>
  <v-row
    class="mt-2"
    v-if="items.length">
    <v-col
      v-for="(items, index) in items"
      :key="index"
      cols="12"
      md="12"
      sm="12">
      <Card
        :elevation="0"
        :outlined="true"
        class="mt-n5"
        :loading="loading">
        <v-container fluid>
          <v-row>
            <v-col
              cols="12"
              md="2"
              sm="2"
              class="ml-2">
              <v-img
                :src="`${GET_API_ASSETS}/products/${items.image}`"
                :aspect-ratio="1.3"/>
            </v-col>
            <v-col
              cols="12"
              md="6"
              sm="6">
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
              class="text-right">
              <span
                class="cart-price"
                v-if="items.varaintId">
                ₱{{ formatMoney(parseFloat(items.variantPrice)*parseFloat(items.quantity)) }}
              </span>
              <span
                class="cart-price"
                v-else>
                ₱{{ formatMoney(parseFloat(items.price)*parseFloat(items.quantity)) }}
              </span><br/>
              <span>x{{ items.quantity }}</span>
            </v-col>
          </v-row>
        </v-container>
      </Card>
    </v-col>
  </v-row>
  <v-row v-else>
    <v-col
      cols="12"
      md="12"
      sm="12">
      <NoData message="No product available in this order."/>
    </v-col>
  </v-row>
</div>
</template>
<script>
import { mapMutations } from 'vuex'
export default {
  props: {
    loading: {
      type: Boolean,
      default: false
    },

    items: {
      type: Array,
      default: () => []
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