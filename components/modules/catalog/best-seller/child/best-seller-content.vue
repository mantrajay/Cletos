<template>
<v-row class="mt-2">
  <v-col
    cols="12"
    md="12"
    sm="12">
    <MultiLoading
      :rows="rows"
      v-if="loading"
      class="mt-2"/>
    <v-row v-else>
      <v-col
        cols="12"
        md="12"
        sm="12">
        <BestSeller />
      </v-col>
    </v-row>
  </v-col>
</v-row>
</template>
<script>
import { bestSellerMixins } from '../mixins/bestSellerMixins'
import BestSeller from './child-best-seller'
export default {
  name: 'Best-Seller-Child',
  mixins: [bestSellerMixins],
  components: {
    BestSeller
  },

  data () {
    return {
      rows: [
        { cols: 6, md: 2, sm: 2, type: 'card' },
        { cols: 4, md: 3, sm: 3, type: 'card' }
      ]
    }
  }
}
</script>