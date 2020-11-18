<template>
  <v-snackbar
    :top="true"
    :app="true"
    :right="true"
    color="error"
    :outlined="true"
    :value="SNACKBAR.show">
    <span class="message">{{ SNACKBAR.message }}</span>
    <template v-slot:action="{ attrs }">
      <v-btn
        color="red"
        text
        fab
        small
        v-bind="attrs"
        @click="CLOSE_SNACKBAR">
        <v-icon>mdi-close</v-icon>
      </v-btn>
    </template>
  </v-snackbar>
</template>
<script>
export default {
  name: 'SnackBar'
}
</script>