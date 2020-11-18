<template>
  <div class="mt-n5">
    <v-row v-if="!products.length && !loading">
      <v-col
        cols="12"
        md="4"
        sm="4">
        <v-alert
          text
          prominent
          type="error"
          icon="mdi-cloud-alert">
          No products found.
        </v-alert>
      </v-col>
    </v-row>
    <v-row>
      <v-col
        v-for="(items, index) in products"
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
              </v-container>
              <CardOverLay v-if="hover"/>
            </Card>
          </template>
        </v-hover>
      </v-col>
  </v-row>
  </div>
</template>
<script>
export default {
  props: {
    loading: {
      type: Boolean,
      default: false
    },

    products: {
      type: Array,
      default: () => []
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