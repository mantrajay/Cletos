<template>
<div>
  <Header
    title="BEST SELLER"
    :button="false"/>
  <v-row>
    <v-col
      v-for="(items, index) in bestSeller"
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
              <CardOverLay v-if="hover" />
            </v-container>
          </Card>
        </template>
      </v-hover>
    </v-col>
  </v-row>
</div>
</template>
<script>
import { bestSellerMixins } from '../mixins/bestSellerMixins'
export default {
  name: 'Best-Seller',
  mixins: [bestSellerMixins]
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