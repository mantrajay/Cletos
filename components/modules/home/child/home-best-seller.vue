<template>
<div class="ml-n2">
  <Header
    title="BEST SELLER"
    @event="headerEvent"/>
    <v-sheet
      class="slide"
      max-width="100%" >
      <v-slide-group
        multiple
        show-arrows>
        <v-slide-item
          v-for="(items, index) in bestSeller"
          :key="index"
          class="pa-2">
          <v-hover>
            <template v-slot:default="{ hover }">
              <v-card
                @click="$router.push(`/catalog/product-detail/${items.id}`)"
                height="250"
                class="ma-1"
                width="200"
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
            </v-card>
          </template>
        </v-hover>
      </v-slide-item>
    </v-slide-group>
  </v-sheet>
</div>
</template>
<script>
import { Home } from '../mixins'
export default {
  name: 'Best-Seller',
  mixins: [Home]
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
.slide >>> .v-slide-group__prev {
  min-width: 5px !important;
}
.slide >>> .v-slide-group__next {
  min-width: 5px !important;
}
.slide >>> .mdi-chevron-right {
  margin-left: 20px !important;
}
.slide >>> .mdi-chevron-left {
  margin-left: -20px !important;
}
.slide >>> .v-slide-group__content {
  margin-left: -10px !important;
}
</style>
