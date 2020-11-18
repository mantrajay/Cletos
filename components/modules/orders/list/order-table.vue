<template>
  <v-container fluid>
    <v-row>
      <v-col
        cols="12"
        md="12"
        sm="12"
        class="mt-3">
        <v-data-table
          :loading="loading"
          :headers="headers"
          :items="data"
          :items-per-page="10"
          class="elevation-1">
          <template v-slot:item.status="{ item }">
            <span :class="`status-${item.statCss}`">{{ item.status }}</span>
          </template>
          <template v-slot:item.actions="{ item }">
            <v-btn
              color="rgb(209 34 34)"
              class="white--text"
              small
              @click="goTo('/orders/tracking/' + item.id)">
              Show Order
              <v-icon color="#fff">mdi-gesture-double-tap</v-icon>
            </v-btn>
          </template>
        </v-data-table>
      </v-col>
    </v-row>
  </v-container>
</template>
<script>
export default {
  props: {
    loading: {
      type: Boolean,
      default: false
    },
    headers: {
      type: Array,
      default: () => []
    },
    data: {
      type: Array,
      default: () => []
    }
  }
}
</script>