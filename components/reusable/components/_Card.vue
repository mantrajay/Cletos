<template>
  <v-card
    :class="{'card-container': hover}"
    :elevation="elevation"
    :disabled="loading"
    :outlined="outlined">
    <v-container
      v-if="loading">
      <v-skeleton-loader :type="type" />
    </v-container>
    <slot v-else></slot>
  </v-card>
</template>
<script>
export default {
  name: 'Card',
  props: {
    loading: {
      type: Boolean,
      default: true
    },
    outlined: {
      type: Boolean,
      default: false
    },
    hover: {
      type: Boolean,
      default: true
    },
    type: {
      type: String,
      default: 'card'
    },
    elevation: {
      type: Number,
      default: 2
    }
  }
}
</script>
<style scoped>
.card-container {
  transition: 300ms;
}
.card-container:hover {
  cursor: pointer;
  margin-top: -10px;
  transition: 300ms ease-in-out;
}
</style>