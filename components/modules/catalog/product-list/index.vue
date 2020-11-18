<template>
  <div class="page-container">
    <Header
      class="mt-5"
      title="PRODUCT LIST"
      :button="false"/>
    <v-row v-if="products.data.length">
      <v-col
        v-for="(items, index) in products.data"
        :key="index"
        cols="6"
        md="2"
        sm="2"
        @click="$router.push(`/catalog/product-detail/${items.id}`)">
        <v-hover>
          <template v-slot:default="{ hover }">
          <Card
            :loading="loading">
            <v-container fluid>
              <v-row>
                <v-col
                  cols="12"
                  md="12"
                  sm="12">
                  <v-img :src="`${GET_API_ASSETS}/products/${items.image}`"
                    :aspect-ratio="1"
                    class="mt-n5"/>
                </v-col>
                <v-col
                  cols="12"
                  md="12"
                  sm="12"
                  class="mt-n3">
                  <p class="name">{{ items.name }}</p>
                  <p class="price">₱{{ formatMoney(items.price) }}</p>
                </v-col>
              </v-row>
              <CardOverLay v-if="hover"/>
            </v-container>
            </Card>
          </template>
        </v-hover>
      </v-col>
    </v-row>
    <v-row v-else>
      <v-col
        cols="12"
        md="12"
        sm="12">
        <NoData
          :showOrder="false"
          message="No products available." />
      </v-col>
    </v-row>
  </div>
</template>
<script>
export default {
  data () {
    return {
      loading: false,
      products: {
        keyword: '',
        loading: false,
        data: []
      },
      pager: {
        pageNo: 1,
        totalPage: 1,
        limit: 4
      }
    }
  },

  created () {
    this.fetchData(1)
  },

  methods: {
    async fetchData (pageNo) {
      try {
        this.loading = true
        let response = await this.API_POST({
          url: '/Products/list',
          data: {
            keyword: this.products.keyword,
            currentPage: pageNo,
            limit: this.pager.limit
          }
        })
        this.products.data = response.data
        this.pager.currentPage = response.currentPage
        this.pager.totalPage = response.currentPage
      }
      catch (error) { }
      finally { this.loading = false }
    }
  }
}
</script>
<style scoped>
.name {
  color: #d12222;
  font-weight: bold;
  font-size: 14pt;
}
.price {
  font-size: 11pt;
}
p {
  margin: auto;
}
</style>