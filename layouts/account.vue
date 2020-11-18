<template>
<div>
  <v-toolbar flat
    color="transparent">
    <v-spacer></v-spacer>
    <v-btn
      v-if="GET_AUTH.token"
      @click="goTo('/orders')"
      text>
      <span class="hidden-sm-and-down">My Orders</span>
      <v-icon color="#fff">mdi-clipboard-text-multiple</v-icon>
    </v-btn>
    <v-btn
      v-if="GET_AUTH.token"
      @click="goTo('/cart')"
      text>
      <span class="hidden-sm-and-down text">My Cart</span>
      <v-badge
        bordered
        color="#d52827"
        :value="cartItemsLenth"
        :content="cartItemsLenth"
        overlap
        class="tool-bar ml-n2">
        <v-btn
          text
          fab
          small
          color="#fff"
          elevation="0">
          <v-icon color="#fff">mdi-cart</v-icon>
        </v-btn>
      </v-badge>
    </v-btn>
    <v-btn
      v-if="!GET_AUTH.token"
      text
      @click="SET_SHOW_LOGIN"
      color="#fff"
      elevation="0"
      class="tool-bar">
      <span
        class="hidden-sm-and-down text">
        Login
      </span>
      <v-icon color="#fff">mdi-account-circle</v-icon>
    </v-btn>
    <v-menu offset-y
      v-else>
      <template v-slot:activator="{ on, attrs }">
        <v-btn
          text
          v-bind="attrs"
          v-on="on">
          <v-icon color="#fff">mdi-account-circle</v-icon>
          {{ GET_AUTH.email.split('@')[0] }}
          <v-icon color="#fff">mdi-chevron-down</v-icon>
        </v-btn>
      </template>
      <v-list>
        <v-list-item
          v-for="(item, index) in items"
          :key="index"
          @click="accountMenu(item)">
          <v-list-item-title>
            <v-icon>{{ item.icon }}</v-icon>
            {{ item.title }}
          </v-list-item-title>
        </v-list-item>
      </v-list>
    </v-menu>
    <v-btn
      text
      v-if="!GET_AUTH.token"
      @click="showLogin = true"
      color="#fff"
      elevation="0"
      class="tool-bar">
      <span class="hidden-sm-and-down text">Register</span>
      &nbsp;
      <v-icon color="#fff">mdi-account-edit-outline</v-icon>
    </v-btn>
  </v-toolbar>
  <AlertCallBack
    btnTitle="Logout"
    v-if="callBack.show"
    :callBack="callBack"
    @close="callBack.show = false"
    @event="logOut"/>
</div>
</template>
<script>
import { mapGetters } from 'vuex'
export default {
  name: 'Menu',
  data () {
    return {
      showLogin: false,
      callBack: {
        show: false,
        variant: 'error',
        title: 'Confirm',
        message: 'Are you sure you want to logout?'
      },
      items: [
        { icon: 'mdi-account-box', title: 'My Profile', route: '/profile' },
        { icon: 'mdi-map-marker', title: 'Address', route: '/address' },
        { icon: 'mdi-account-arrow-right-outline', title: 'Logout' }
      ]
    }
  },

  methods: {
    accountMenu (item) {
      if (item.title !== 'Logout') this.goTo(item.route)
      else this.callBack.show = true
    },

    logOut () {
      this.SET_DESTROY_AUTH()
      this.SET_CART_ITEMS([])
      this.callBack.show = false
      this.goTo('/')
    }
  }
}
</script>
<style scoped>
.tool-bar >>> .v-badge__badge::after{
  border-color: #ffffff !important;
}
.tool-bar {
  margin-left: 0px;
  margin-right: 0px;
}
.tool-bar >>> .v-badge__badge {
  top: 0px !important;
}
.text {
  color: #fff;
}
</style>