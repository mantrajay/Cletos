<template>
  <v-dialog v-model="dialog"
    persistent
    max-width="400">
    <!-- :id="callBack.variant" -->
    <v-card>
       <v-card-title class="ml-n3 header">
        <h4 class="title">
          <!-- <v-icon color="#fff">mdi-alert-box-outline</v-icon> -->
          <span>{{ callBack.title.toUpperCase() }}</span>
        </h4>
        <!-- :class="`dialog-${GET_ALERT.variant}`" -->
      </v-card-title>
      <v-card-text>
        <p v-html="callBack.message"
          class="message mt-2"></p>
      </v-card-text>
      <v-card-actions class="actions">
        <!-- :color="GET_ALERT.variant" -->
        <v-row>
          <v-col
            class="text-right">
            <v-btn :color="callBack.variant"
              small
              :loading="callBack.loading"
              @click="$emit('close')">
              Cancel
            </v-btn>
            <v-btn :color="callBack.variant"
              small
              :loading="callBack.loading"
              @click="$emit('event')">
              {{ btnTitle }}
            </v-btn>
          </v-col>
        </v-row>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>
<script>
export default {
  name: 'CallBack',
  props: {
    btnTitle: {
      type: String,
      default: 'Yes'
    },

    callBack: {
      type: Object,
      default: null
    }
  },

  data () {
    return {
      dialog: true
    }
  }
}
</script>
<style scoped>
.header {
  background-color: #d52827 !important;
  height: 40px;
}
.title {
  color: #ffffff !important;
  font-size: 15px !important;
  margin-top: -10px !important;
}
.message {
  position: relative;
  top: 17px;
  color: #424242;
  font-size: 15px;
}
p {
  margin: auto;
}
.actions {
  overflow: hidden;
  height: 45px;
  margin-top: 25px;
}
/* Call Alert Variants */
#success >>> .v-card__title {
  border-bottom: 2px solid #4caf50 !important;
  height: 45px;
}
#error >>> .v-card__title {
  border-bottom: 2px solid red !important;
  height: 45px;
}
#warning >>> .v-card__title {
  border-bottom: 2px solid #fb8c00 !important;
  height: 45px;
}
#primary >>> .v-card__title {
  border-bottom: 2px solid #1f89e5 !important;
  height: 45px;
}
.dialog-success {
  color: #4caf50;
  margin-top: -11px;
}
.dialog-error {
  color: red;
  margin-top: -11px;
}
.dialog-warning {
  color: #fb8c00;
  margin-top: -11px;
}
.dialog-primary {
  color: #1f89e5;
  margin-top: -11px;
}
</style>