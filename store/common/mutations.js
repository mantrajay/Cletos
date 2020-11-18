export default {
  SET_AUTH: (state, data) => {
    state.auth.token = data.token
    state.auth.userId = data.userId
    state.auth.roleId = data.roleId
    state.auth.roleName = data.roleName
    state.auth.email = data.email
  },

  SET_DESTROY_AUTH: (state) => {
    state.auth = {
      token: '',
      userId: '',
      roleId: '',
      roleName: '',
      email: ''
    }
  },

  /**
   * Alert Method
   */
  
  SET_ALERT_ERROR: (state, message) => {
    state.alert.toggle = true
    state.alert.title = 'Error'
    state.alert.variant = 'error'
    state.alert.message = message
  },

  SET_ALERT_SUCCESS: (state, message) => {
    state.alert.toggle = true
    state.alert.title = 'Success'
    state.alert.variant = 'success'
    state.alert.message = message
  },

  SET_ALERT_WARNING: (state, message) => {
    state.alert.toggle = true
    state.alert.title = 'Warning'
    state.alert.variant = 'warning'
    state.alert.message = message
  },

  SET_ALERT_CONFIRM: (state, message) => {
    state.alert.toggle = true
    state.alert.title = 'Confirm'
    state.alert.variant = 'primary'
    state.alert.message = message
  },

  SET_ALERT_CLOSE: (state) => {
    state.alert.toggle = false
  },

  /**
   * Loaidng Methods
   */
  SET_LOADING: (state, title = 'LOADING') => {
    state.loading.toggle = true
    state.loading.title = title
  },

  SET_CLOSE_LOADING: (state) => {
    state.loading.toggle = false
    state.loading.title = ''
  },

  SET_PAGE_LOADING: (state) => {
    state.pageLoading.toggle = true
  },

  SET_PAGE_LOADING_CLOSE: (state) => {
    state.pageLoading.toggle = false
  },
  
  /**
   * Cart Items
   */
  SET_CART_ITEMS: (state, data) => {
    state.cartItems = data
    if (data.length) {
      let subTotal = 0
      data.forEach(items => {
        subTotal += parseFloat(items.price) * parseFloat(items.quantity)
      })
      state.subTotal = subTotal
    }
    if (!data.length) state.subTotal = 0
  },

  SET_CART_QTY: (state, {index, type}) => {
    if (type === 'add') state.cartItems[index].quantity++
    if (type === 'minus') state.cartItems[index].quantity--
  },

  SET_SHIPPING_FEE: (state, data) => {
    state.shipping.id = data.id
    state.shipping.name = data.businessName
    state.shipping.amount = data.amount || 0
  },

  SET_DISCOUNT: (state, data) => {
    state.discount.id = data.id
    state.discount.name = data.name
    state.discount.amount = data.amount || 0
  },
  /**
   * Shipping Information
   */
  SET_SHIPPING_INFO: (state, data) => {
    state.shippingInfo.address = data.address
    state.shippingInfo.instructions = data.instructions
  },

  /**
   * Snackbar Methods
   */
  SNACKBAR_SHOW: (state, data) => {
    state.snackbar.show = true
    state.snackbar.message = data.message || ''
    state.snackbar.top = data.top || true
    state.snackbar.right = data.right || true
    state.snackbar.left = data.left || false
    state.snackbar.bottom = data.bottom || false
  },

  CLOSE_SNACKBAR: (state) => {
    state.snackbar.show = false
  },

  /**
   * Login Show Modal
   */
  SET_SHOW_LOGIN: (state) => {
    state.showLogin = true
  },

  CLOSE_LOGIN: (state) => {
    state.showLogin = false
  }
}
