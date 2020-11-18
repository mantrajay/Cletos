<template>
  <v-app id="inspire">
    <client-only>
    <Navigation />
    <v-main>
      <v-fade-transition>
        <nuxt />
      </v-fade-transition>
    </v-main>
    <Alert />
    <Loading />
    <Login />
   </client-only>
  </v-app>
</template>
<script>
import { mapGetters } from 'vuex'
import Navigation from './navigation'
export default {
  name: 'Application',
  components: {
    Navigation
  }
}
</script>
<style>
body {
  color: #222b45;
}
.v-toolbar__content {
  padding: 4px 5px !important;
}
.v-breadcrumbs li {
  font-size: 20px !important;
  font-weight: bold !important;
}
/* Page Container */
.page-container {
  width: 95%;
  margin: auto;
}
.no-data {
  font-size: 13px;
  color: #9e9e9e;
}
/* Text Input Validation */
.text-input .v-input__slot fieldset {
  border: 1.5px solid red !important;
}
.text-input .v-text-field__slot label {
  color: red !important;
  font-size: 12px;
}
.v-text-field__slot label {
  font-size: 12px !important;
}
.text-input .v-select__slot label {
  color: red !important;
}
.text-input .v-select__slot label {
  color: red !important;
}
.empty .v-input__slot fieldset {
  border: 1.5px solid red !important;
}
.error-text {
  position: relative;
  top: -30px;
  font-size: 11px;
  color: red;
}
p {
  margin: auto;
}
.message {
  color: #222b45;
}
/* Order Status */
.status-1 {
  font-weight: bold;
  padding: 6px 12px;
  color: #1976d2;
  border-radius: 15px;
  background-color: #ffffff;
  border: 1px solid #1976d2;
}
.status-2 {
  font-weight: bold;
  padding: 6px 12px;
  color: #19d2a4;
  border-radius: 15px;
  background-color: #ffffff;
  border: 1px solid #19d2a4;
}
.status-3 {
  font-weight: bold;
  padding: 6px 12px;
  color: #fb8c00;
  border-radius: 15px;
  background-color: #ffffff;
  border: 1px solid #fb8c00;
}
.status-4 {
  font-weight: bold;
  padding: 6px 12px;
  color: #d12222;
  border-radius: 15px;
  background-color: #ffffff;
  border: 1px solid #d12222;
}
.status-5 {
  font-weight: bold;
  padding: 6px 12px;
  color: #4caf50;
  border-radius: 15px;
  background-color: #ffffff;
  border: 1px solid #4caf50;
}
.status-6 {
  font-weight: bold;
  padding: 6px 12px;
  color: #fb8c00;
  border-radius: 15px;
  border: 1px solid #fb8c00;
  background-color: #fff;
}
.status-7 {
  font-weight: bold;
  padding: 6px 12px;
  color: #fff;
  border-radius: 15px;
  border: 1px solid #fb8c00;
  background-color: #fb8c00;
}
</style>