<template>
  <div>
    <v-btn
      class="hidden-sm-and-down"
      :outlined="$route.fullPath === '/'"
      :text="$route.fullPath !== '/'"
      @click="goTo('/')">
      Home
    </v-btn>
    <v-btn
      class="hidden-sm-and-down"
      @click="goTo('/catalog/best-seller')"
      :outlined="$route.fullPath === '/catalog/best-seller'"
      :text="$route.fullPath !== '/catalog/best-seller'">
      Best Sellers
    </v-btn>
    <v-btn
      class="hidden-sm-and-down"
      @click="goTo('/catalog/product-list')"
      :outlined="$route.fullPath === '/catalog/product-list'"
      :text="$route.fullPath !== '/catalog/product-list'">
      Product List
    </v-btn>
    <v-btn
      class="hidden-sm-and-down"
      :outlined="$route.fullPath === '/catalog/categories/all'"
      :text="$route.fullPath !== '/catalog/categories/all'"
      @click="goTo('/catalog/categories/all')">
      Categories
    </v-btn>
  </div>
</template>
<script>
export default {
  name: 'Menu'
}
</script>