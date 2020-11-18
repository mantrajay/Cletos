export default {
  /**
  * API GET Method
  * @param { string } url
  */
  API_GET ({ dispatch }, { url }) {
    return new Promise(async (resolve, reject) => {
      try {
        let headers = await dispatch('SET_HEADERS')
        let response = await this.$axios.$get(url, headers)
        resolve(response)
      } catch (error) {
        reject(error)
      }
    })
  },
  /**
  * API POST Method
  * @param { Array, Object } data
  * @param { String } url
  */
  API_POST ({ dispatch }, { url, data }) {
    return new Promise(async (resolve, reject) => {
      try {
        data = data || {}
        let headers = await dispatch('SET_HEADERS')
        let response = await this.$axios.$post(url, data, headers)
        resolve(response)
      } catch (error) {
        reject(error)
      }
    })
  },

  /**
  * API DELETE Method
  * @param { String } url
  */
  API_DELETE ({ dispatch }, { url }) {
    return new Promise(async (resolve, reject) => {
      try {
        let headers = await dispatch('SET_HEADERS')
        let response = await this.$axios.$delete(url, headers)
        resolve(response)
      } catch (error) {
        reject(error)
      }
    })
  },

  /**
  * API PUT Method
  * @param { Array, Object } data
  * @param { String } url
  */
  API_PUT ({ dispatch }, { url, data }) {
    return new Promise(async (resolve, reject) => {
      try {
        data = data || {}
        let headers = await dispatch('SET_HEADERS')
        let response = await this.$axios.$put(url, data, headers)
        resolve(response)
      } catch (error) {
        dispatch('UNSET_TOKEN', { error, reject })
      }
    })
  },

  SET_HEADERS ({ getters }) {
    return new Promise( async (resolve) => { 
      resolve({ headers: { Authorization: getters.GET_AUTH.token }})
    })
  }
}