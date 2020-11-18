<template>
<div class="page-container">
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
          <ProductDetail
            :loading="loading"
            :productDetail="productDetail"
            :productVariants="productVariants"/>
        </v-col>
        <v-col
          cols="12"
          md="12"
          sm="12"
          v-if="relatedProducts.length">
          <Header
            title="RELATED PRODUCTS"
            :button="false"/>
          <RelatedProducts
            :loading="loading"
            :cols="{ col: 12,  md: 2, sm: 2 }"
            :relatedProducts="relatedProducts"/>
        </v-col>
      </v-row>
    </v-col>
  </v-row>
</div>
</template>
<script>
import ProductDetail from './productDetail'
export default {
  components: {
    ProductDetail
  },

  data () {
    return {
      rows: [
        { cols: 1, md: 12, sm: 12, type: 'card' },
        { cols: 6, md: 2, sm: 2, type: 'card' }
      ],
      loading: false,
      productDetail: [],
      productVariants: [
        { id: 1, productId: 1, name: 'Small', price: '300' },
        { id: 2, productId: 1, name: 'Medium', price: '400' },
        { id: 3, productId: 1, name: 'Large', price: '500' }
      ],
      relatedProducts: []
    }
  },

  created () {
    this.fetchData()
  },

  methods: {
    async fetchData () {
      try {
        this.loading = true
        let response = await this.API_GET({
          url: '/Products/show/' + this.$route.params.id,
        })
        this.productDetail = response.data.productDetail
        this.relatedProducts = response.data.relatedProducts
      }
      catch (error) { }
      finally { this.loading = false }
    }
  }
}
</script>