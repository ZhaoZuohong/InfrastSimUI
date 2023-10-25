<script setup>
import { inject, computed } from 'vue'
const active_facility = inject('active_facility')
const state = inject('state')
import { get_left_index, get_display_name } from '@/utils/display'

const facility = computed(() => {
  if (active_facility.value.startsWith('dormitory')) {
    return state.value.dormitories[parseInt(active_facility.value.slice(-1))]
  } else if (active_facility.value.startsWith('B')) {
    return state.value['modifiable-facilities'][get_left_index(active_facility.value)]
  } else {
    return state.value[active_facility.value]
  }
})
</script>

<template>
  <div class="facility-bar">
    <n-h2>
      {{ get_display_name(facility.type) }}
      <template v-if="active_facility.startsWith('B')">
        {{ active_facility }}
      </template>
      <template v-if="active_facility.startsWith('dormitory')">
        {{ parseInt(active_facility.slice(-1)) + 1 }}
      </template>
    </n-h2>
    <div class="info">
      <div>等级：3</div>
      <div>容量：54+28=82</div>
      <div>效率：1.03+1.08=2.11</div>
      <div>产物：中级作战记录</div>
      <div>已完成：3</div>
      <div>进度：31%</div>
      <div>剩余时间：<n-time format="HH:mm" /></div>
    </div>
    <n-button>进驻干员</n-button>
    <n-button>无人机加速</n-button>
    <n-button>变更产物</n-button>
    <n-button>收取产物</n-button>
  </div>
</template>

<style scoped>
.n-h2 {
  margin: 0;
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
  gap: 4px 24px;
}
</style>
