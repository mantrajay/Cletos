<template>
<div>
  <Header
    :button="false"
    title="CATEGORIES"/>
  <v-row>
    <v-col
      v-for="(items, index) in categoties"
      :key="index"
      cols="12"
      md="2"
      sm="2"
      @click="goTo('/catalog/categories/products/' + items.id)">
      <v-hover>
        <template v-slot:default="{ hover }">
          <Card
            :loading="loading">
            <v-container fluid>
              <v-row>
                <v-col
                  cols="12"
                  md="12"
                  sm="12"
                  class="col-name">
                  <span class="name">{{ items.name }}</span>
                </v-col>
                <v-col
                  cols="12"
                  md="12"
                  sm="12"
                  class="mt-n1">
                  <v-img :src="`${GET_API_ASSETS}/products/${items.image}`"
                    :aspect-ratio="1"/>
                </v-col>
              </v-row>
              <CardOverLay v-if="hover"
                label="Show All"/>
            </v-container>
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
    categoties: {
      type: Array,
      default: () => []
    }
  }
}
</script>
<style scoped>
.title {
  color: rgb(209 34 34);
  font-size: 30px !important;
  font-weight: bold;
}
.name {
  font-weight: bold;
  color: #fff;
  font-size: 20px !important;
  text-align: center;
}
.price {
  font-size: 12px;
}
.image {
  width: 100%;
  height: 170px;
  margin-top: -13px;
  border-radius: 5px;
}
.col-name {
  background-color: rgb(209 34 34);
  margin-top: -12px;
}
</style>