<template>
<div class="page-container">
  <v-row>
    <v-col
      cols="12"
      md="12"
      sm="12"
      class="ml-n4 mt-2">
      <v-breadcrumbs
        :items="headerList"
        divider="-">
        <template v-slot:item="{ item }">
          <v-breadcrumbs-item
            :to="item.href"
            :disabled="item.disabled">
            {{ item.text.toUpperCase() }}
          </v-breadcrumbs-item>
        </template>
      </v-breadcrumbs>
    </v-col>
  </v-row>
  <ProductList
    :loading="loading"
    :products="products"/>
</div>
</template>
<script>
import ProductList from './product-list'
export default {
  comments: {
    ProductList
  },

  data () {
    return {
      loading: false,
      products: [],
      headerList: []
    }
  },

  created () {
    this.fetchProducts()
  },

  methods: {
    async fetchProducts () {
      try {
        this.loading = true
        let response = await this.API_GET({
          url: '/Products/byCategory/' + this.$route.params.id
        })
        let category = response.data.category
        this.products = response.data.products
        this.setHeader(category)
      } catch (error) {
        console.log(error)
      } finally {
        this.loading = false
      }
    },

    setHeader (item) {
      this.headerList = [
        {
          text: 'Category',
          disabled: false,
          href: '/catalog/categories/all',
        },
        {
          text: `${item.name} (${this.products.length })`,
          disabled: true
        }
      ]
    }
  }
}
</script>