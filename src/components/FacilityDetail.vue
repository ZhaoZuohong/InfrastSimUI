<script setup>
import { inject } from 'vue'

const facility_state = inject('facility_state')

function format_working_time(seconds) {
  const h = Math.floor(seconds / 3600)
  const m = Math.floor((seconds % 3600) / 60)
  const s = Math.floor(seconds % 60)
  let result = ''
  if (h > 0) result += `${h}h `
  result += `${m}m `
  result += `${s}s`
  return result
}

function format_mood_detail(details) {
  return details
    .map(
      (detail) =>
        `${detail.tag == 'facility' ? '工作站' : detail.tag}${
          detail.value > 0 ? '+' : ''
        }${detail.value.toFixed(2)}`
    )
    .join(' ')
}
</script>

<template>
  <n-table
    :single-line="false"
    size="small"
    v-if="facility_state.operators.filter((x) => x).length"
  >
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
            {{ operator.efficiency.toFixed(2)
            }}<template v-if="operator['efficiency-details'].details.filter((x) => x).length">
              （{{ format_mood_detail(operator['efficiency-details'].details) }}）
            </template>
          </td>
          <td>{{ operator.mood.toFixed(2) }}</td>
          <td>
            {{ operator['mood-consume-rate'].toFixed(2)
            }}<template v-if="operator['mood-consume-rate-details'].details.filter((x) => x).length"
              >（{{ format_mood_detail(operator['mood-consume-rate-details'].details) }}）
            </template>
          </td>
          <td>
            {{ format_working_time(operator['working-time-seconds']) }}
          </td>
        </template>
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
