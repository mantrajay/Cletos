<template>
  <v-dialog v-model="GET_ALERT.toggle"
    persistent
    max-width="350">
    <!-- :id="GET_ALERT.variant" -->
    <v-card>
      <v-card-title class="ml-n3 header">
        <h4 class="title">
          <!-- <v-icon color="#fff">mdi-thumb-up-outline</v-icon> -->
          <span>{{ GET_ALERT.title.toUpperCase() }}</span>
        </h4>
        <!-- :class="`dialog-${GET_ALERT.variant}`" -->
      </v-card-title>
      <v-card-text>
        <p v-html="GET_ALERT.message"
          class="message"></p>
      </v-card-text>
      <v-card-actions class="actions">
        <!-- :color="GET_ALERT.variant" -->
        <v-row>
          <v-col
            class="text-right">
            <v-btn color="#d52827"
              class="white--text"
              small
              @click="SET_ALERT_CLOSE()">
              OK
            </v-btn>
          </v-col>
        </v-row>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>
<script>
import { mapGetters } from 'vuex'
export default {
  name: 'Alert',
  computed: {
    ...mapGetters({
      GET_ALERT: 'common/GET_ALERT'
    })
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
}
p {
  margin: auto;
}
.actions {
  overflow: hidden;
  height: 45px;
  margin-top: 25px;
}
/* For variants */
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