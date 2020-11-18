<template>
<div>
  <v-row v-if="!addressList.length && !loading">
    <v-col
      cols="12"
      md="12"
      sm="12">
      <v-alert
        text
        prominent
        type="error"
        icon="mdi-cloud-alert">
        No address found.
      </v-alert>
    </v-col>
  </v-row>
  <v-row>
    <v-col
      v-for="(items, index) in addressList"
      :key="index"
      cols="12"
      md="6"
      sm="6"
      @click="setBillingAddress(items.id)">
      <v-hover>
        <template v-slot:default="{ hover }">
          <Card
            :hover="false"
            :class="{'default': parseInt(items.defaultAdd)}"
            :loading="loading">
            <v-container
              :class="{'active-card': parseInt(items.defaultAdd)}"
              fluid>
              <v-row>
                <v-col
                  cols="12"
                  md="8"
                  sm="8">
                  <p class="name">{{ `${items.firstName} ${items.middleName} ${items.lastName}` }}</p>
                  <p class="text mt-n3">{{ items.mobile }}</p>
                  <p class="text">{{ `${items.street}, ${items.barangay.brgyName},` }}</p>
                  <p class="text">{{ `${items.city.cityName}, ${items.province.provinceName}` }}</p>
                  <p class="text">{{ `${items.region.regionName}` }}</p>
                  <p class="text">{{ `${items.country.countryName} ${items.city.zipCode}` }}</p>
                </v-col>
                <v-col
                  cols="12"
                  md="4"
                  sm="4"
                  class="text-center">
                  <v-btn x-large
                    text>
                    <v-icon x-large
                      :color="items.isSelected ? '#d52827' : 'secondary'">
                      {{ parseInt(items.defaultAdd) ? 'mdi-check' : 'mdi-minus' }}
                    </v-icon>
                  </v-btn>
                  <h4>{{ items.type }}</h4>
                </v-col>
              </v-row>
              <CardOverLay v-if="hover"
                icon="mdi-check"
                label="Set as Shipping Address"/>
            </v-container>
          </Card>
        </template>
      </v-hover>
    </v-col>
    <v-col
      cols="12"
      md="6"
      sm="6">
      <h5>Delivery Instructions</h5>
      <v-textarea
        class="mt-2"
        outlined
        v-model="instructions"
        @blur="$emit('set-instructions', instructions)"
        name="input-7-4"
        label="Enter Shipping Instructions"
      ></v-textarea>
    </v-col>
  </v-row>
</div>
</template>
<script>
import { mapMutations } from 'vuex'
export default {
  name: 'Address-Items',
  data () {
    return {
      loading: false,
      loadingSetter: false,
      addressList: [],
      instructions: ''
    }
  },

  created () {
    this.fetchAddresses()
  },

  methods: {
    ...mapMutations({
      SET_SHIPPING_INSTRUCTION: 'common/SET_SHIPPING_INSTRUCTION'
    }),
  
    async setBillingAddress (id) {
      let selectedAddress = {}
      this.addressList.forEach(items => {
        if (parseInt(items.id) === parseInt(id)) {
          items.defaultAdd = 1
          selectedAddress = items
          this.$emit('address', items)
        }
        else items.defaultAdd = 0
      })
      try {
        this.loadingSetter = true
        let response = await this.API_POST({
          url: '/Shipping/show',
          data: {
            cityId: selectedAddress.city.cityId,
            provinceId: selectedAddress.province.provinceId
          }
        })
        let shipping = response.data
        console.log(shipping)
        this.SET_SHIPPING_FEE(shipping)
      }
      catch (error) {
        this.SET_SHIPPING_FEE(0)
      }
      finally { this.loadingSetter = false }
    },

    async fetchAddresses () {
      try {
        this.loading = true
        let response = await this.API_GET({ url: '/Address' })
        this.addressList = response.data
        let defAddress = {}
        this.addressList.forEach(items => {
          if (parseInt(items.defaultAdd)) defAddress = items
        })
        this.setBillingAddress(defAddress.id)
      }
      catch (error) { }
      finally { this.loading = false }
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
.active-card {
  background-color: #ffa42414;
}
</style>