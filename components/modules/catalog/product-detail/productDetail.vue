<template>
<div>
  <Header
    title="PRODUCT DETAIL"
    :button="false"/>
  <v-row class="ml-1">
    <v-col
      v-for="(items, index) in productDetail"
      :key="index"
      cols="12"
      md="12"
      sm="12">
      <v-row>
        <v-col
          cols="12"
          md="4"
          sm="4"
          class="img-border ml-n2"
          :style="{
            'background-image': `url(${GET_API_ASSETS}/products/${items.image})`,
            'background-size': 'cover',
            'background-position': '50% 50%',
            'height': '350px'
          }">
        </v-col>
        <v-col
          cols="12"
          md="3"
          sm="3"
          class="mt-n3">
          <v-row class="ml-2">
            <v-col
              cols="12"
              md="12"
              sm="12">
              <h4 class="product-variant">Variants</h4>
            </v-col>
            <v-col
              cols="12"
              md="12"
              sm="12"
              class="mt-n3">
              <v-radio-group v-model="selectedVariant"
                class="radio mt-n1 remove-border">
                <v-row>
                  <v-col
                    cols="12"
                    md="12"
                    sm="12"
                    class="mt-n8">
                    <v-radio-group v-model="selectedVariant">
                      <v-radio
                        v-for="item in productVariants"
                        :key="item.id"
                        :label="item.name"
                        :value="item.id"
                      ></v-radio>
                    </v-radio-group>
                  </v-col>
                </v-row>
              </v-radio-group>
            </v-col>
          </v-row>
        </v-col>
        <v-col
          cols="12"
          md="5"
          sm="5"
          class="mt-n3">
          <v-row>
            <v-col
              cols="12"
              md="12"
              sm="12">
              <h1 class="name">{{ items.name }}</h1>
            </v-col>
            <v-col
              cols="12"
              md="12"
              sm="12"
              class="mt-n6">
              <h2>₱{{ formatMoney(items.price) }}</h2>
            </v-col>
            <v-col
              cols="12"
              md="10"
              sm="10">
              <p class="description">{{ items.description }}</p>
            </v-col>
          </v-row>
          <CartQuantity />
        </v-col>
      </v-row>
    </v-col>
  </v-row>
</div>
</template>
<script>
import CartQuantity from './cartQuantity'
export default {
  name: 'Detail',
  props: {
    loading: {
      type: Boolean,
      default: false
    },

    productDetail: {
      type: Array,
      default: () => []
    },

    productVariants: {
      type: Array,
      default: () => []
    }
  },

  components: {
    CartQuantity
  },
  
  data () {
    return {
      selectedVariant: 1
    }
  }
}
</script>
<style scoped>
.product-variant {
  font-weight: bold;
}
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
.radio-label >>> label{
  color: #1e1e1e;
  font-weight: bold;
  font-size: 13px !important;
}
.description {
  color: #9e9e9e;
  font-size: 13px;
}
.desc-wrapper {
  width: 100%;
  margin-top: 10px;
}
.radio-col {
  height: 35px;
}
</style>