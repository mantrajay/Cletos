<template>
<v-dialog
  v-model="SHOW_LOGIN"
  max-width="500"
  persistent>
  <v-card>
    <v-container
      class="card-content"
      fluid>
      <v-row>
        <v-col
          cols="12"
          md="12"
          sm="12"
          class="text-right mt-n5">
          <v-btn
            @click="CLOSE_LOGIN"
            elevation="0"
            fab
            text
            color="#d12222"
            small>
            <v-icon>mdi-close-circle-outline</v-icon>
          </v-btn>
        </v-col>
      </v-row>
      <v-row class="mt-n7">
        <v-col
          cols="12"
          md="12"
          sm="12">
          <h2 class="header-card mt-n2">CLETO'S BAKESHOP</h2>
        </v-col>
      </v-row>
      <v-row class="mt-n3">
        <v-col
          cols="12"
          md="12"
          sm="12">
          <v-text-field
            :auto-complete="false"
            @keypress="validationKey(form.email, 'email')"
            v-model="form.email.value"
            :class="{'empty': form.email.isEmpty}"
            outlined
            dense
            label="Enter email" />
        </v-col>
      </v-row>
      <v-row class="mt-n10">
        <v-col
          cols="12"
          md="12"
          sm="12">
          <v-text-field
            :auto-complete="false"
            @keypress="validationKey(form.password, 'Password')"
            type="password"
            v-model="form.password.value"
            :class="{'empty': form.password.isEmpty}"
            outlined
            dense
            label="Enter password" />
        </v-col>
        <v-col
          class="mt-n12"
          cols="12"
          md="12"
          sm="12">
          <v-btn
            color="#d12222"
            text>
            <span>Forgot Password?</span>
          </v-btn>
        </v-col>
      </v-row>
      <v-row class="mt-n2">
        <v-col
          cols="12"
          md="12"
          sm="12"
          class="text-center">
          <v-btn
            @click="signIn"
            color="#d12222"
            class="white--text"
            block>
            Sign In
          </v-btn>
          <div class="mt-5">
            <span class="or-label">or</span>
            <hr class="or-divider">
          </div>
        </v-col>
      </v-row>
      <v-row>
        <v-col
          cols="6"
          md="6"
          sm="6">
          <v-btn
            elevation="0"
            color="primary">
            <v-icon color="#fff">mdi-facebook</v-icon>
            Login w/ Facebook
          </v-btn>
        </v-col>
        <v-col
          cols="6"
          md="6"
          sm="6">
          <v-btn
            elevation="0"
            class="white--text"
            color="#d12222">
            <v-icon color="#fff">mdi-gmail</v-icon>
            Login w/ Google
          </v-btn>
        </v-col>
      </v-row>
    </v-container>
  </v-card>
</v-dialog>
</template>
<script>
import { mapMutations } from 'vuex'
export default {
  name: 'Login-Modal',
  data () {
    return {
      form: {
        email: this.iRules('jay@gmail.com', true),
        password: this.iRules('123', true)
      }
    }
  },

  methods: {
    ...mapMutations({
      CLOSE_LOGIN: 'common/CLOSE_LOGIN'
    }),

    async signIn () {
      if (!this.validateForm(this.form)){
        this.SET_ALERT_ERROR('Please fill-in required fields.')
        return
      }
      try {
        let response = await this.API_POST({
          url: '/Auth/validateAuth',
          data: {
            email: this.form.email.value,
            password: this.form.password.value
          }
        })
        let data = response.data
        this.SET_AUTH({
          token: data.token,
          userId: data.userId,
          roleId: data.roleId,
          roleName: data.roleName,
          email: data.email
        })
        this.fetchCart()
        this.$emit('close')
      } catch (error) {
        this.errorHandle(error)
      } finally { }
    },

    async fetchCart () {
      try {
        let response = await this.API_POST({
          url: '/Cart/list'
        })
        let data = response.data.cartList
        this.SET_CART_ITEMS(data)
        this.CLOSE_LOGIN()
      } catch (error) {
        this.errorHandle(error)
      } finally { }
    }
  }
}
</script>
<style scoped>
.card-content {
  width: 90%;
  margin: auto;
}
.sign-up {
  margin: auto;
  font-size: 13px;
  color: #fb8c00;
  font-weight: bold;
  text-decoration: underline;
  cursor: pointer;
}
.header-card {
  color: #d12222;
  font-weight: bold;
  text-align: center;
}
.or-divider {
  border-top: 1.5px solid #8787877d;
  width: 100%;
  margin: auto;
  position: relative;
  top: -10px;
}
.or-label {
  padding: 1px 12px;
  background-color: white;
  font-size: 15px;
  z-index: 2;
  color: #878787;
  position: relative;
}
</style>