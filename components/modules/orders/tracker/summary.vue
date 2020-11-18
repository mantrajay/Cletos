<template>
  <Card
    :hover="false"
    :loading="false"
    :outlined="true"
    :elevation="0"
    type="card, article"
    class="pa-2 card-container-computation">
    <v-container
      class="mt-n8"
      fluid>
      <v-row>
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
          <p class="label-value">₱{{ formatMoney(computation.subTotal) }}</p>
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
          <p class="label-value">₱{{ formatMoney(computation.shippingFee) }}</p>
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
          <p class="label-value">₱{{ formatMoney(computation.discount) }}</p>
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
          <p class="label-value">₱{{ formatMoney(computation.total) }}</p>
        </v-col>
      </v-row>
      <v-row class="mt-n8">
        <v-col>
          <p class="vat-label">VAT included, where applicable</p>
        </v-col>
      </v-row>
    </v-container>
  </Card>
</template>
<script>
export default {
  props: {
    loading: {
      type: Boolean,
      default: false
    },

    computation: {
      type: Object,
      default: {}
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
  height: 30vh;
}
</style>
