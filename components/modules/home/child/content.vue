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
        <Categories class="mt-10"/>
      </v-col>
    </v-row>
  </v-col>
</v-row>
</template>
<script>
import { Home } from '../mixins'
import BestSeller from './home-best-seller'
import Categories from './home-categories'
export default {
  name: 'Content',
  mixins: [Home],
  components: {
    BestSeller,
    Categories
  },

  data () {
    return {
      model: [],
      rows: [
        { cols: 6, md: 2, sm: 2, type: 'card' },
        { cols: 4, md: 3, sm: 3, type: 'card' }
      ]
    }
  }
}
</script>