<template>
<div class="page-container">
  <v-row class="mt-8">
    <v-col
      cols="12"
      md="12"
      sm="12">
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
            complete
            color="#d52827">
            REVIEW AND PAY
          </v-stepper-step>
          <v-divider></v-divider>
          <v-stepper-step
            color="#d52827"
            complete
            step="3">
            TRACKING ORDER
          </v-stepper-step>
        </v-stepper-header>
        <v-stepper-content step="2">
          <PlaceOrder />
        </v-stepper-content>
      </v-stepper>
    </v-col>
  </v-row>
</div>
</template>
<script>
import PlaceOrder from './placeOrder'
export default {
  components: {
    PlaceOrder
  }
}
</script>