export default {
  GET_AUTH: state => state.auth,
  CART_ITEMS: state => state.cartItems,
  SUBTOTAL: state => state.subTotal,
  SHIPPING: state => state.shipping,
  DISCOUNT: state => state.discount,
  SNACKBAR: state => state.snackbar,
  GET_LOADING: state => state.loading,
  GET_ALERT: state => state.alert,
  GET_PAGE_LOADING: state => state.pageLoading,
  SHIPPING_INFO: state => state.shippingInfo,
  SHOW_LOGIN: state => state.showLogin,
  GET_API_ASSETS: state => state.assetsApi + '/assets'
}
