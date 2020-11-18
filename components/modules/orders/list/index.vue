<template>
  <div class="page-container">
    <v-row class="mt-3">
      <v-col
        cols="12"
        md="12"
        sm="12">
        <h3 class="mt-2">My Orders</h3>
        <v-tabs
          :color="colorTab"
          left
          class="mt-3">
          <v-tab @click="tab = 'ongoing'">
            <v-icon left>mdi-archive-outline</v-icon>
            Ongoing
          </v-tab>
          <v-tab @click="tab = 'recieved'">
            <v-icon left>mdi-archive-arrow-up-outline</v-icon>
            Recieved
          </v-tab>
          <v-tab @click="tab = 'cancelled'">
            <v-icon left>mdi-archive-arrow-up-outline</v-icon>
            Cancelled
          </v-tab>
          <v-tab-item>
            <OrderList
              :headers="headers"
              :loading="loading"
              :data="orderList"/>
          </v-tab-item>
          <v-tab-item>
            <OrderList
              :headers="headers"
              :loading="loading"
              :data="orderList"/>
          </v-tab-item>
          <v-tab-item>
            <OrderList
              :headers="headers"
              :loading="loading"
              :data="orderList"/>
          </v-tab-item>
        </v-tabs>
      </v-col>
    </v-row>
  </div>
</template>
<script>
import OrderList from './order-table'
export default {
  components: {
    OrderList
  },

  data () {
    return {
      loading: false,
      orderList: [],
      tab: 'ongoing',
      rows: [
        { cols: 6, md: 2, sm: 2, type: 'card' },
        { cols: 4, md: 3, sm: 3, type: 'card' }
      ],
      headers: [
        { text: 'Tracking Number', value: 'trackingNo' },
        { text: 'Total', value: 'total' },
        { text: 'Order Date & Time', value: 'dateCreated' },
        { text: 'Status', value: 'status' },
        { text: 'Actions', value: 'actions' }
      ],
    }
  },

  computed: {
    colorTab () {
      return this.tab === 'ongoing'
        ? '#d12222'
        : this.tab === 'recieved'
          ? '#4caf50'
          : '#fb8c00'
    }
  },

  watch: {
    tab () {
      this.fetchData()
    }
  },

  created () {
    this.fetchData()
  },

  methods: {
    async fetchData () {
      try {
        this.loading = true
        let response = await this.API_POST({
          url: '/Orders/list',
          data: { status: this.tab }
        })
        let data = response.data
        this.orderList = []
        data.forEach(items => {
          this.orderList.push({
            id: items.id,
            trackingNo: items.trackingNo,
            total: `₱${this.formatMoney(items.total)}`,
            status: this.getOrderStatus(parseInt(items.status)),
            statCss: items.status,
            dateCreated: this.getLocalDate(items.dateCreated, true)
          })
        })
      }
      catch (error) {
        this.errorHandle(error)
      }
      finally { this.loading = false }
    }
  }
}
</script>
<style scoped>
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
  color: #fff;
  border-radius: 15px;
  background-color: #4caf50;
}
.status-7 {
  font-weight: bold;
  background-color: #eeeeee;
  padding: 6px 12px;
  color: #222b45;
  border-radius: 15px;
}
.status-8 {
  font-weight: bold;
  background-color: #eeeeee;
  padding: 6px 12px;
  color: #222b45;
  border-radius: 15px;
}
</style>