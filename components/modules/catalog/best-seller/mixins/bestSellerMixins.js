export const bestSellerMixins = {
  data () {
    return {
      loading: false,
      bestSeller: [],
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
          url: '/Products/homeProducts'
        })
        this.bestSeller = response.data.bestSeller
      }
      catch (error) { }
      finally { this.loading = false }
    }
  }
}