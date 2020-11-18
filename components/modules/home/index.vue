<template>
<div>
  <v-row>
    <v-col
      cols="12"
      md="12"
      sm="12">
      <v-parallax :src="require('~/assets/images/wallpaper.jpg')">
        <v-row>
          <v-col
            cols="12"
            md="6"
            sm="6"
            class="text-center">
            <div class="home-title">
              <h1>HAPPINESS</h1>
              <h1>SMELLING BREAD</h1>
              <h4><b class="cletos">Cleto's Bakeshop</b> E-commerce ready to take your order online.</h4>
              <v-btn
                class="white--text mt-10"
                color="#d12222">
                Order Now
              </v-btn>
            </div>
          </v-col>
        </v-row>
      </v-parallax>
    </v-col>
  </v-row>
  <div class="page-container">
    <Home />
  </div>
</div>
</template>
<script>
import Home from './child/content'
export default {
  name: 'Sales',
  components: {
    Home
  }
}
</script>
<style scoped>
h1 {
  font-size: 60px;
}
.cletos {
  font-size: 20px;
  color: #fbd800;
}
.home-title {
  position: relative;
  top: 20%;
  width: 90%;
  margin: auto;
}
.v-parallax {
  min-height: 91vh;
}
</style>