<template>
  <div class="page-container">
    <BestSeller />
  </div>
</template>
<script>
import BestSeller from './child/best-seller-content'
export default {
  name: 'Best-Seller-Parent',
  components: {
    BestSeller
  },
  data () {
    return {
    }
  }
}
</script>
