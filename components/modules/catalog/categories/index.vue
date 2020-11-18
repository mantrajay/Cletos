<template>
  <div class="page-container">
    <v-row class="mt-2">
      <v-col
        cols="12"
        md="12"
        sm="12">
        <Categories
        :loading="loading"
        :categoties="categoties"/>
      </v-col>
    </v-row>
  </div>
</template>
<script>
import Categories from './category-list'
export default {
  components: {
    Categories
  },

  data () {
    return {
      loading: false,
      categoties: []
    }
  },

  created () {
    this.fetchData()
  },

  methods: {
    async fetchData () {
      try {
        this.loading = true
        let response = await this.API_POST({
          url: '/Products/allCategories'
        })
        this.categoties = response.data
      } catch (error) {
        this.errorHandle(error)
      } finally { this.loading = false }
    }
  }
}
</script>