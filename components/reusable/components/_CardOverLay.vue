<template>
  <v-fade-transition>
    <v-overlay
      absolute
      color="#000">
      <v-btn color="#d52827">
        <v-icon>{{ icon }}</v-icon>
        {{ label }}
      </v-btn>
    </v-overlay>
  </v-fade-transition>
</template>
<script>
export default {
  name: 'Card-Overlay',
  props: {
    label: {
      type: String,
      default: 'Add to Cart'
    },
    icon: {
      type: String,
      default: 'mdi-cart'
    }
  }
}
</script>