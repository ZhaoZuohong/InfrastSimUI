<script setup>
import { computed, inject } from 'vue'
import { format_time, format_details, get_current_product } from "@/utils/display"
const select_operator = inject('select_operator')
const change_product = inject('change_product')
const use_drone = inject('use_drone')
const active_facility = inject('active_facility')
const facility_state = inject('facility_state')
const simulator = inject('simulator')
const state = inject('state')

const isWorkingStation = computed(() =>
  facility_state.value.type === 'Manufacturing' || facility_state.value.type === 'Trading'
)

function get_global_eff() {
  if (facility_state.type === 'Manufacturing') {``
    return state['global-props']['全局制造站效率'].value ?? 0.0
  } else if (facility_state.type === 'Trading') {
    return state['global-props']['全局贸易站效率'].value ?? 0.0
  }
  return 0.0
}

function get_remains() {
  const seconds = facility_state.value.remains;
  const efficiency = facility_state.value['base-efficiency'] + facility_state.value['operators-efficiency'] + get_global_eff()
  return seconds / efficiency;
}

function collect() {
  simulator.value.set_facility_state(active_facility.value, {
      'collect': 0
  })
  state.value = simulator.value.get_data_for_mower()
}

</script>

<template>
  <div class="facility-bar">
    <n-h2><active-facility-name /></n-h2>
    <div class="info">
      <div>等级：{{ facility_state.level }}</div>
      <template v-if="isWorkingStation">
        <div>
          容量：{{ facility_state.capacity }}
          {{ format_details(facility_state['capacity-details'], undefined, (v) => v.toFixed(0)) }}
        </div>
        <div>
          效率：{{ facility_state['base-efficiency']
            + facility_state['operators-efficiency']
            + get_global_eff() }}（工作站{{ facility_state['base-efficiency'] }}+干员{{
            facility_state['operators-efficiency']
          }}<template v-if="get_global_eff() != 0.0">+全局{{get_global_eff()}}</template>）
        </div>
        <template v-if="facility_state.type === 'Manufacturing'">
          <div>产物：{{ facility_state['product'] || '未设定' }}</div>
          <template v-if="facility_state['product']">
            <div>已完成：{{ facility_state['product-count'] }}</div>
            <div>进度：{{ Math.round(facility_state.progress * 100) }}%</div>
            <div>剩余时间： {{ format_time(get_remains()) }}</div>
          </template>
        </template>
        <template v-if="facility_state.type === 'Trading'">
          <div>策略：{{ get_current_product(facility_state) }}</div>
          <div>已完成：{{ facility_state['orders'].length }}</div>
          <template v-if="facility_state['current-order']">
            <div>进度：{{ Math.round(facility_state.progress * 100) }}%</div>
            <div>剩余时间： {{ format_time(get_remains()) }}</div>
          </template>
        </template>
      </template>
    </div>
    <n-button @click="select_operator = true">进驻干员</n-button>
    <template v-if="isWorkingStation">
      <n-button @click="use_drone = true">无人机加速</n-button>
      <n-button @click="change_product = true">变更产物</n-button>
      <n-button @click="collect">收取产物</n-button>
    </template>
  </div>
</template>

<style scoped>
.n-h2 {
  margin: 0 8px 0 0;
  white-space: nowrap;
}

.facility-bar {
  display: flex;
  gap: 8px;
  justify-content: space-around;
  align-items: center;
  padding: 4px 24px;
  border-top: 1px solid rgb(239, 239, 245);
  border-bottom: 1px solid rgb(239, 239, 245);
}

.info {
  display: flex;
  flex-wrap: wrap;
  flex-shrink: 2;
  flex-grow: 1;
  gap: 4px 24px;
}
</style>
