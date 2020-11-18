<template>
<div>
  <v-row class="mt-n7">
    <v-col>
      <v-row>
        <v-col
          cols="12"
          md="6"
          sm="6">
          <p class="name">{{ `${SHIPPING_INFO.address.firstName} ${SHIPPING_INFO.address.middleName} ${SHIPPING_INFO.address.lastName}` }}</p>
          <p class="text mt-n3">{{ SHIPPING_INFO.address.mobile }}</p>
          <p class="text">{{ `${SHIPPING_INFO.address.street}, ${SHIPPING_INFO.address.barangay.brgyName},` }}</p>
          <p class="text">{{ `${SHIPPING_INFO.address.city.cityName}, ${SHIPPING_INFO.address.province.provinceName}` }}</p>
          <p class="text">{{ `${SHIPPING_INFO.address.region.regionName}` }}</p>
          <p class="text">{{ `${SHIPPING_INFO.address.country.countryName} ${SHIPPING_INFO.address.city.zipCode}` }}</p>
        </v-col>
        <v-col
          cols="12"
          md="6"
          sm="6">
          <h5>Delivery Instructions:</h5>
          <p class="text mt-1" v-html="SHIPPING_INFO.instructions" />
        </v-col>
        <v-col
          cols="12"
          md="12"
          sm="12">
          <v-divider></v-divider>
        </v-col>
      </v-row>
    </v-col>
  </v-row>
  <v-row>
     <v-col
      cols="12"
      md="5"
      sm="5">
      <h5>Payment Method</h5>
      <v-select
        class="mt-2"
        v-model="paymentMethod.id"
        :items="paymentMethodList"
        label="Standard"
        item-text="name"
        item-value="id"
        dense
        outlined
      ></v-select>
    </v-col>
    <v-col
      cols="12"
      md="5"
      sm="5">
      <h5>Change</h5>
      <v-text-field
        @keypress="integerOnly($event)"
        class="mt-2"
        outlined
        v-model="changeFor"
        dense
        label="Enter Change"
      ></v-text-field>
    </v-col>
  </v-row>
</div>
</template>
<script>
import { mapMutations, mapGetters } from 'vuex'
export default {
  data () {
    return {
      loading: false,
      loadingDiscount: false,
      paymentMethodList: [],
      paymentMethod: {
        id: '',
        name: '',
        description: ''
      },
      changeFor: null
    }
  },

  watch: {
    changeFor (val) {
      if (val) this.emitForm()
    }
  },

  created () {
    this.fetchPaymentMethod()
  },

  methods: {
    async fetchPaymentMethod () {
      try {
        this.loading = true
        let response = await this.API_GET({ url: '/Payment' })
        let data = response.data
        this.paymentMethodList = data
        data.forEach((items, index) => {
          if (!index) {
            this.paymentMethod = {
              id: items.id,
              name: items.name,
              description: items.description
            }
          }
        })
        this.emitForm()
      }
      catch (error) { }
      finally { this.loading = false }
    },

    emitForm () {
      this.$emit('form', {
        address: this.SHIPPING_INFO.address,
        paymentMethod: this.paymentMethod,
        changeFor: this.changeFor,
        instructions: this.SHIPPING_INFO.instructions
      })
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
</style>