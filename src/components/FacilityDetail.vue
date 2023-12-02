<script setup>
import { inject } from 'vue'
import { format_time, format_details } from "@/utils/display"
const facility_state = inject('facility_state')
</script>

<template>
  <n-table :single-line="false" size="small" v-if="facility_state.operators.filter((x) => x).length">
    <thead>
      <tr>
        <th>干员</th>
        <th>效率</th>
        <th>心情</th>
        <th>心情消耗速率</th>
        <th>工作时间</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="(operator, idx) in facility_state.operators" :key="idx">
        <template v-if="operator !== null">
          <td>{{ operator.name }}</td>
          <td>
            {{ operator.efficiency.toFixed(2) }}
            {{ format_details(operator['efficiency-details']) }}
          </td>
          <td>{{ operator.mood.toFixed(2) }}</td>
          <td>
            {{ operator['mood-consume-rate'].toFixed(2) }}
            {{ format_details(operator['mood-consume-rate-details']) }}
          </td>
          <td> {{ format_time(operator['working-time-seconds']) }} </td>
        </template>
      </tr>
    </tbody>
  </n-table>
  <n-table v-if="facility_state.orders && facility_state.orders.length > 0" :single-line="false" size="small">
    <thead>
      <tr>
        <th>订单时间</th>
        <th>订单消耗</th>
        <th>订单收益</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="(order, i) in facility_state.orders" :key="i">
        <td> {{ format_time(order['produce-time'] / 1e7) }} </td>
        <td> {{ `${order.consume} ${order['consume-count']}` }} </td>
        <td> {{ `${order.earn} ${order['earn-count']}` }} </td>
      </tr>
    </tbody>
  </n-table>
</template>

<style scoped lang="scss">
.n-table {
  width: 1000px;
  margin: 24px auto;

  th,
  td {
    padding: 6px 12px;
  }
}
</style>
