<template>
<div>
  <div v-if="!loading">
    <v-row>
      <v-col
        cols="12"
        md="6"
        sm="6">
        <h5>Tracking Number</h5>
        <p class="tracking-no">{{ checkOut.trackingNo }}</p>
      </v-col>
      <v-col
        cols="12"
        md="6"
        sm="6">
        <h5 class="mb-2">Status</h5>
        <span
          :class="`status-${checkOut.status}`">
          {{ getOrderStatus(parseInt(checkOut.status)) }}
        </span>
      </v-col>
      <v-col
        cols="12"
        md="6"
        sm="6"
        class="mt-n5">
        <h5>Payment Method</h5>
        <p>{{ checkOut.paymentMethod }}</p>
      </v-col>
      <v-col
        cols="12"
        md="6"
        sm="6"
        class="mt-n5">
        <h5>Change For</h5>
        <p>₱{{ formatMoney(checkOut.changeFor) }}</p>
      </v-col>
    </v-row>
    <v-row>
      <v-col
        cols="12"
        md="12"
        sm="12"
        class="mt-n3">
        <h4>Delivery Address</h4>
        <div class="mt-2">
          <p>{{ `${addressInfo.firstName} ${addressInfo.middleName} ${addressInfo.lastName}` }}</p>
          <p class="text mt-n3">{{ addressInfo.mobile }}</p>
          <p class="text">{{ `${addressInfo.street}, ${addressInfo.address.brgyName},` }}</p>
          <p class="text">{{ `${addressInfo.address.cityName}, ${addressInfo.address.provinceName}` }}</p>
          <p class="text">{{ `${addressInfo.address.regionName}` }}</p>
          <p class="text">{{ `${addressInfo.address.countryName} ${addressInfo.address.zipCode}` }}</p>
        </div>
      </v-col>
      <v-col
        cols="12"
        md="12"
        sm="12">
        <h5>Delivery Instructions:</h5>
        <p class="text">{{ checkOut.instructions }}</p>
      </v-col>
    </v-row>
  </div>
  <div v-else>
    <MultiLoading
      :rows="[{ cols: 1, md: 12, sm: 12, type: 'card, article' }]"/>
  </div>
</div>
</template>
<script>
export default {
  props: {
    loading: {
      type: Boolean,
      default: false
    },

    addressInfo: {
      type: Object,
      default: () => []
    },

    checkOut: {
      type: Object,
      default: () => []
    }
  }
}
</script>
<style scoped>
.name {
  text-transform: capitalize;
  color: #222b45;
  font-size: 17px;
  font-weight: bold;
}
.text {
  font-size: 13px;
  margin: auto;
}
.default {
  border: 2px solid #d52827;
}
.tracking-no {
  color: #d52827;
  font-weight: bold;
  font-size: 16px;
}
</style>