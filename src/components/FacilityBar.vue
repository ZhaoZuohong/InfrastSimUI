<script setup>
import { inject } from 'vue'
const select_operator = inject('select_operator')
const facility_state = inject('facility_state')
</script>

<template>
  <div class="facility-bar">
    <n-h2><active-facility-name /></n-h2>
    <div class="info">
      <div>等级：{{ facility_state.level }}</div>
      <template v-if="facility_state.type == 'Manufacturing'">
        <div>
          容量：{{ facility_state.capacity }}（工作站{{ facility_state['base-capacity'] }}+干员{{
            facility_state.capacity - facility_state['base-capacity']
          }}）
        </div>
        <div>
          效率：{{
            (facility_state['base-efficiency'] + facility_state['operators-efficiency']).toFixed(2)
          }}（工作站{{ facility_state['base-efficiency'].toFixed(2) }}+干员{{
            facility_state['operators-efficiency'].toFixed(2)
          }}）
        </div>
        <div>产物：{{ facility_state['product'] || '未设定' }}</div>
        <template v-if="facility_state['product']">
          <div>已完成：{{ facility_state['product-count'] }}</div>
          <div>进度：{{ Math.round(facility_state.progress * 100) }}%</div>
          <div>剩余时间：<n-time format="HH:mm" /></div>
        </template>
      </template>
    </div>
    <n-button @click="select_operator = true">进驻干员</n-button>
    <n-button>无人机加速</n-button>
    <n-button>变更产物</n-button>
    <n-button>收取产物</n-button>
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
