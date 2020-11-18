<template>
<v-app-bar app
  :clipped-left="$vuetify.breakpoint.lgAndUp"
  :color="scrolled ? '#ff8107' : '#d12222'"
  :collapseOnScroll="collapseOnScroll"
  elevate-on-scroll
  dark>
  <v-toolbar-title
    class="app-title"
    @click="goTo('/')">
    <v-icon class="mt-n2">mdi-cart</v-icon>
    <b>Cleto's Bakeshop</b>
  </v-toolbar-title>
  <Menu />
  <div class="flex-grow-1"></div>
  <v-spacer></v-spacer>
  <Account />
</v-app-bar>
</template>
<script>
import Menu from './menu'
import Account from './account'
import { mapGetters, mapMutations } from 'vuex'
export default {
  name: 'Navigation',
  components: {
    Menu,
    Account
  },
  data () {
    return {
      drawer: true,
      collapseOnScroll: false,
      scrolled: false,
      window: {
        width: 0,
        height: 0
      }
    }
  },

  computed: {
    currentRoute () {
      return this.$route.meta.routeTitle
    }
  },

  created () {
    window.addEventListener('scroll', this.handleScroll)
    window.addEventListener('resize', this.handleResize)
    this.handleResize()
  },

  destroyed () {
    window.removeEventListener('scroll', this.handleScroll)
    window.removeEventListener('resize', this.handleResize)
  },


  methods: {
    ...mapMutations({
      SET_DESTROY_AUTH: 'common/SET_DESTROY_AUTH'
    }),

    handleScroll () {
      this.scrolled = window.scrollY > 0
    },

    handleResize () {
      this.window.width = window.innerWidth
      this.window.height = window.innerHeight
    },

    profileEvent (item) {
      if (item.title === 'Logout') this.logout()
    },

    async logout () {
      this.SET_LOADING()
      setTimeout(() => {
        this.SET_DESTROY_AUTH()
        this.SET_CLOSE_LOADING()
        this.$router.push('/')
      }, 1500)
    }
  }
}
</script>
<style scoped>
.app-title {
  cursor: pointer;
  color: #fff;
  width: 250px;
}
</style>
