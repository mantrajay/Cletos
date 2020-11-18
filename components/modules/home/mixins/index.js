export const Home = {
  data () {
    return {
      loading: false,
      bestSeller: [],
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
          url: '/Products/homeProducts'
        })
        this.bestSeller = response.data.bestSeller
        this.categoties = response.data.categoties
      }
      catch (error) { }
      finally { this.loading = false }
    },

    headerEvent (title) {
      let route = '/catalog/best-seller'
      if (title === 'CATEGORIES') route = '/catalog/categories/all'
      this.goTo(route)
    }
  }
}