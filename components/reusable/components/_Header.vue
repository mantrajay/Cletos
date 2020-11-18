<template>
  <v-row>
    <v-col
      cols="6"
      md="6"
      sm="6">
      <span class="title">{{ title }}</span>
    </v-col>
    <v-col
      cols="6"
      md="6"
      sm="6"
      class="text-right"
      v-if="button">
      <v-btn
        @click="$emit('event', title)"
        color="rgb(209 34 34)"
        :outlined="btnOutlined">
        <v-icon color="#fff">mdi-gesture-double-tap</v-icon>
        <span :class="{'btn-title': !btnOutlined}">{{ btnTitle }}</span>
      </v-btn>
    </v-col>
  </v-row>
</template>
<script>
export default {
  name: 'Header',
  props: {
    title: {
      type: String,
      default: 'Best Seller'
    },

    btnOutlined: {
      type: Boolean,
      default: false
    },

    button: {
      type: Boolean,
      default: true
    },

    btnTitle: {
      type: String,
      default: 'Show All'
    }
  }
}
</script>
<style scoped>
.title {
  font-size: 1.6em !important;
  font-weight: bold;
  color: rgb(209 34 34);
}
.btn-title {
  color: #fff;
}
</style>