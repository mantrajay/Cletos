<template>
  <Card
    :hover="false"
    :loading="false"
    :outlined="outlined"
    :elevation="elevation"
    type="card, article"
    class="card-container-computation">
    <v-row class="mt-n3">
      <v-col
        cols="12"
        md="12"
        sm="12">
        <p class="header mt-3">Order Summary</p>
      </v-col>
    </v-row>
    <v-row class="mt-n7">
      <v-col
        cols="6"
        md="6"
        sm="6">
        <p class="label">Subtotal</p>
      </v-col>
      <v-col
        cols="6"
        md="6"
        sm="6"
        class="text-right">
        <p class="label-value">₱{{ formatMoney(parseFloat(SUBTOTAL) || 0) }}</p>
      </v-col>
    </v-row>
    <v-row class="mt-n8">
      <v-col
        cols="6"
        md="6"
        sm="6">
        <p class="label">Shipping Fee</p>
      </v-col>
      <v-col
        cols="6"
        md="6"
        sm="6"
        class="text-right">
        <p class="label-value">₱{{ formatMoney(parseFloat(SHIPPING.amount) || 0) }}</p>
      </v-col>
    </v-row>
    <v-row class="mt-n8">
      <v-col
        cols="6"
        md="6"
        sm="6">
        <p class="label">Discount</p>
      </v-col>
      <v-col
        cols="6"
        md="6"
        sm="6"
        class="text-right">
        <p class="label-value">₱{{ formatMoney(parseFloat(DISCOUNT.amount) || 0) }}</p>
      </v-col>
    </v-row>
    <v-row class="mt-n8">
      <v-col
        cols="6"
        md="6"
        sm="6">
        <p class="label">Total</p>
      </v-col>
      <v-col
        cols="6"
        md="6"
        sm="6"
        class="text-right">
        <p class="label-value">₱{{ formatMoney(parseFloat(total) || 0) }}</p>
      </v-col>
    </v-row>
    <v-row class="mt-n8 mb-n3">
      <v-col>
        <p class="vat-label">VAT included, where applicable</p>
      </v-col>
    </v-row>
  </Card>
</template>
<script>
export default {
  props: {
    outlined: {
      type: Boolean,
      default: true
    },

    elevation: {
      type: Number,
      default: 0
    }
  },

  computed: {
    total () {
      return parseFloat(this.SUBTOTAL) + parseFloat(this.SHIPPING.amount) - parseFloat(this.DISCOUNT.amount)
    }
  }
}
</script>

<style scoped>
.header {
  color: #222b45;
  font-weight: bold;
  font-size: 16px;
}
.label {
  font-size: 14px;
  color: #222b45;
  font-weight: bold;
}
.label-value {
  font-size: 14px;
  color: #222B45;
  font-weight: 500;
}
.btn-title {
  font-size: 13px;
  color: #fff;
  text-transform: initial;
  font-weight: bold;
}
.label-total {
  font-size: 15px;
  color: #222b45;
  font-weight: bold;
}
.vat-label {
  font-size: 10px;
  text-align: right;
  color: #8F9BB3;
}
.card-container-computation {
  /* height: 30vh; */
  padding: 5px 15px;
}
</style>
