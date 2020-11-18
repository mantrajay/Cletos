/* eslint-disable */
import { mapGetters, mapMutations, mapActions } from 'vuex'
export const Mixins = {
  data () {
    return {
      errMessage: 'Please fix the form error(s)!',
      cartList: [],
      shppingFee: 0,
      loadingDiscount: false,
      discount: {
        amount: 0,
        name: '',
        id: ''
      }
    }
  },

  computed: {
    ...mapGetters({
      GET_AUTH: 'common/GET_AUTH',
      GET_ALERT: 'common/GET_ALERT',
      GET_LOADING: 'common/GET_LOADING',
      GET_API_ASSETS: 'common/GET_API_ASSETS',
      CART_ITEMS: 'common/CART_ITEMS',
      SUBTOTAL: 'common/SUBTOTAL',
      SHIPPING: 'common/SHIPPING',
      DISCOUNT: 'common/DISCOUNT',
      SHOW_LOGIN: 'common/SHOW_LOGIN',
      SHIPPING_INFO: 'common/SHIPPING_INFO'
    }),
  
    cartItemsLenth () {
      let counter = 0
      if (this.CART_ITEMS.length) {
        this.CART_ITEMS.forEach(items => {
          counter += parseInt(items.quantity)
        })
      }
      return counter
    }
  },

  methods: {
    ...mapMutations({
      SET_ALERT: 'common/SET_ALERT',
      SET_ALERT_CLOSE: 'common/SET_ALERT_CLOSE',
      SET_LOADING: 'common/SET_LOADING',
      SET_CLOSE_LOADING: 'common/SET_CLOSE_LOADING',
      SET_ALERT_ERROR: 'common/SET_ALERT_ERROR',
      SET_ALERT_WARNING: 'common/SET_ALERT_WARNING',
      SET_ALERT_CONFIRM: 'common/SET_ALERT_CONFIRM',
      SET_ALERT_SUCCESS: 'common/SET_ALERT_SUCCESS',
      SET_PAGE_LOADING: 'common/SET_PAGE_LOADING',
      SET_CART_ITEMS: 'common/SET_CART_ITEMS',
      SET_SHIPPING_FEE: 'common/SET_SHIPPING_FEE',
      SET_DISCOUNT: 'common/SET_DISCOUNT',
      SNACKBAR_SHOW: 'common/SNACKBAR_SHOW',
      CLOSE_SNACKBAR: 'common/CLOSE_SNACKBAR',
      SET_AUTH: 'common/SET_AUTH',
      SET_DESTROY_AUTH: 'common/SET_DESTROY_AUTH',
      SET_SHOW_LOGIN: 'common/SET_SHOW_LOGIN',
      SET_SHIPPING_INFO: 'common/SET_SHIPPING_INFO',
      SET_CART_QTY: 'common/SET_CART_QTY',
    }),
    ...mapActions({
      API_POST: 'common/API_POST',
      API_GET: 'common/API_GET'
    }),

    errorHandle (error) {
      let errorCode = error.response.status
      if (errorCode === 401) {
        this.SET_DESTROY_AUTH()
        this.SET_SHOW_LOGIN()
        return
      }
      let message = error.response.data.response
      this.SET_ALERT_ERROR(message)
    },

    getOrderStatus (status) {
      let orderStatus = ''
      if (status === 1) orderStatus = 'Order Placed'
      if (status === 2) orderStatus = 'Order Confirmed'
      if (status === 3) orderStatus = 'Preparing Order'
      if (status === 4) orderStatus = 'Rider on the way'
      if (status === 5) orderStatus = 'Order Recieve'
      if (status === 6) orderStatus = 'Order Cancelled by Admin'
      if (status === 7) orderStatus = 'Order Cancelled by Customer'
      return orderStatus
    },

    integerOnly(event) {
      var key = window.event ? event.keyCode : event.which
      if (event.keyCode === 8 || event.keyCode === 46 || key < 48 || key > 57) {
        event.preventDefault()
      }
    },

    /**
     * @param { Number } amount
     * Will convert amount into Money format 
     */
    formatMoney (amount) {
      var formatter = new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'PHP'
      })
      let total = formatter.format(amount)
      return total.split('PHP')[1]
    },

    /**
     * @param {string} route 
     */
    goTo (route) {
      this.$router.push(route)
    },

    /**
     * Will route to previous page
     */
    goBack () {
      this.$router.go(-1)
    },

    /**
     * Form validation
     * @param { string } value
     * @param { boolean } required value required
     * @param { boolean } email value email
     * @param { array } lenMax min and max length value
     */
    iRules (value = null, required = false, email = false, lenMax = []) {
      return {
        value: value,
        required: required,
        email: email,
        lenMax: lenMax,
        isEmpty: false,
        msg: ''
      }
    },

    /**
     * 
     * @param { object } form
     * Will reset form
     */
    resetForm (form) {
      return Object.keys(form).forEach(index => {
        this.form[index].isEmpty = false
        this.form[index].value = null
        this.form[index].msg = ''
      })
    },

    /**
     * Form validation
     * @param { Object } valueRules
     * @param { String } field
     * Will validate the form according to  field
     * via Keypress
     */
    
    validationKey (valueRules, field) {
      const isRequired = valueRules.required
      const isEmail = valueRules.email
      const lenMax = valueRules.lenMax
      let value = valueRules.value
      if (!value && isRequired) {
        valueRules.isEmpty = true
        valueRules.msg = `${field} is required`
      } else if (isEmail && value) {
        if (!this.isEmail(value)) {
          valueRules.isEmpty = true
          valueRules.msg = 'Invalid email'
        } else {
          valueRules.isEmpty = false
          valueRules.msg = ''
        }
      } else if (lenMax.length && value) {
        let min = lenMax[0], max = lenMax[1], val = value.length
        if (val < min) {
          valueRules.isEmpty = true
          valueRules.msg = `${field} length not less than ${min}`
        } else if (val > max) {
          valueRules.isEmpty = true
          valueRules.msg = `${field} length not greater than ${max}`
        } else {
          valueRules.isEmpty = false
          valueRules.msg = ''
        }
      } else {
        valueRules.msg = ''
        valueRules.isEmpty = false
      }
    },
    
    
    /**
     * Form validation
     * @param { array } form
     * Will validate the form according to @function rules
     */
    validateForm (form) {
      let willProceed = true
      Object.keys(form).forEach((keys) => {
        const isRequired = this.form[keys].required
        const value = this.form[keys].value
        const isEmail = this.form[keys].email
        const lenMax = this.form[keys].lenMax
        if (!value && isRequired) {
          this.form[keys].isEmpty = true
          this.form[keys].msg = `${keys} is required`
          willProceed = false
        } else if (isEmail && value) {
          if (!this.isEmail(value)) {
            this.form[keys].isEmpty = true
            this.form[keys].msg = 'Invalid email'
            willProceed = false
          } else {
            this.form[keys].isEmpty = false
            this.form[keys].msg = ''
          }
        } else if (lenMax.length && value) {
          const min = lenMax[0]
          const max = lenMax[1]
          const val = value.length
          if (val < min) {
            this.form[keys].isEmpty = true
            this.form[keys].msg = `${keys} length not less than ${min}`
            willProceed = false
          } else if (val > max) {
            this.form[keys].isEmpty = true
            this.form[keys].msg = `${keys} length not greater than ${max}`
            willProceed = false
          } else {
            this.form[keys].isEmpty = false
            this.form[keys].msg = ''
          }
        } else {
          this.form[keys].isEmpty = false
        }
      })
      return willProceed
    },

    /**
     * Will check if the valus is email
     * @param { string } value
     */
    isEmail(value) {
      const pattern = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      if (!pattern.test(value)) return false
      return true
    },

    getLocalDate(date, time = false) {
      console.log(time)
      var months = [
        'January',
        'February',
        'March',
        'April',
        'May',
        'June',
        'July',
        'August',
        'September',
        'October',
        'November',
        'December'
      ]
      let tempDate = date.split('-')
      if (time) {
        let dayTemp = tempDate[2].split(' ')
        let day = dayTemp[0]
        let time = dayTemp[1]
        return  months[Number(tempDate[1]) - 1] + ' ' + day + ', ' + tempDate[0] + ' ' + time
      }
      return  months[Number(tempDate[1]) - 1] + ' ' + tempDate[2] + ', ' + tempDate[0]
    },

    monthFormat (date) {
      let dateLocal = this.getLocalDate(date)
      let dateValue = dateLocal.split(' ')
      return dateValue[1] + ' ' + dateValue[2]
    },

    filterArray (form, type) {
      let typeValue = false
      form.filter((value) => {
        if (value.type === type) typeValue = true
      })
      return typeValue
    },

    stringLimit (string, length) {
      let charLimit = !length ? this.charLimit : length
      if (string.length >= charLimit) {
        return string.slice(0, charLimit) + ' ..'
      }
      return string
    },

    b64toBlob (b64Data, contentType, sliceSize) {
      contentType = contentType || ''
      sliceSize = sliceSize || 512
      var byteCharacters = atob(b64Data)
      var byteArrays = []
      for (var offset = 0; offset < byteCharacters.length; offset += sliceSize) {
        var slice = byteCharacters.slice(offset, offset + sliceSize)
        var byteNumbers = new Array(slice.length)
        for (var i = 0; i < slice.length; i++) {
          byteNumbers[i] = slice.charCodeAt(i)
        }
        var byteArray = new Uint8Array(byteNumbers)
        byteArrays.push(byteArray)
      }
      var blob = new Blob(byteArrays, {type: contentType})
      return blob
    }
  }
}
