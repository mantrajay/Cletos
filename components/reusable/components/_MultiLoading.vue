<template>
<div class="bordered">
  <v-row v-for="(row, index) in rows"
    :key="index">
    <v-col
      v-for="col in row.cols"
      :key="col"
      cols="12"
      :md="row.md"
      :sm="row.sm">
      <v-skeleton-loader :type="row.type" />
    </v-col>
  </v-row>
</div>
</template>
<script>
export default {
  name: 'Multiple-Loading',
  props: {
    rows: {
      type: Array,
      default: [{ cols: 6, md: 2, sm: 2, type: 'card, article' }]
    }
  }
}
</script>
<style scoped>
.bordered {
  padding: 2px 7px;
  border: 1px solid rgb(232 232 232);
  border-radius: 4px;
} 
</style>