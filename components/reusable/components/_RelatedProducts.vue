<template>
<v-row>
  <v-col
    v-for="(items, index) in relatedProducts"
    :key="index"
    :cols="cols.col"
    :md="cols.md"
    :sm="cols.sm"
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
          <CardOverLay v-if="hover" />
        </Card>
      </template>
    </v-hover>      
  </v-col>
</v-row>
</template>
<script>
export default {
  name: 'Related-Products',
  props: {
    relatedProducts: {
      type: Array,
      default: () => []
    },
    cols: {
      type: Object,
      default: { col: 12,  md: 3, sm: 3 }
    },
    loading: {
      type: Boolean,
      default: false
    },
    hover: {
      type: Boolean,
      default: true
    }
  }
}
</script>
<style scoped>
.name {
  color: rgb(209 34 34);
  font-weight: bold;
}
.price {
  font-size: 12px;
}
p {
  margin: auto;
}
</style>