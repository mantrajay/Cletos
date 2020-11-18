export default () => ({
  auth: {
    token: '',
    userId: '',
    roleId: '',
    roleName: '',
    email: ''
  },
  cartItems: [],
  subTotal: 0,
  shipping: {
    id: '',
    name: '',
    amount: 0
  },
  discount: {
    id: '',
    name: '',
    amount: 0
  },
  alert: {
    toggle: false,
    title: 'Success',
    variant: 'success',
    message: 'Success'
  },
  loading: {
    toggle: false,
    title: ''
  },
  pageLoading: {
    boilerplate: false,
    toggle: false,
    type: 'article, article, article'
  },
  snackbar: {
    show: false,
    message: '',
    top: true,
    right: true,
    bottom: false,
    left: false
  },
  shippingInfo: {
    address: {},
    instructions: ''
  },
  showLogin: false,
  assetsApi: process.env.NODE_ENV === 'development' ? process.env.VUE_APP_API_DEV : process.env.VUE_APP_API_PROD
})
