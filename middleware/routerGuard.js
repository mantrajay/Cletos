export default async function ({app, store, redirect}) {
  try {
    await store.dispatch('common/API_GET', { url: 'Auth/checkToken' })
    return redirect()
  } catch (error) {
    store.commit('common/SET_DESTROY_AUTH')
    return redirect('/')
  }
}