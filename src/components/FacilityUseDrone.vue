<script setup>
import { ref, inject } from 'vue'
const use_drone = inject('use_drone')
const active_facility = inject('active_facility')
const simulator = inject('simulator')

const amount = ref(1)

function operate() {
  use_drone.value = false
  simulator.value.set_facility_state(active_facility.value, {
    'drone': amount.value
  })
}
</script>

<template>
  <n-modal
    v-model:show="use_drone"
    transform-origin="center"
    :mask-closable="false"
    preset="card"
    :style="{ width: '600px' }"
  >
    <template #header>
      <div class="card-title">使用无人机</div>
    </template>
    
    <n-input-number v-model:value="amount" :show-button="false" placeholder="请输入使用无人机数量">
        <template #suffix>数量</template>
    </n-input-number>
    <div class="bottom-line">
      <n-button type="primary" @click="operate">确认</n-button>
      <n-button @click="use_drone = false">取消</n-button>
    </div>
  </n-modal>
</template>

<style scoped>
.card-title {
  width: 100%;
  display: flex;
  justify-content: center;
}
.bottom-line {
  display: flex;
  gap: 8px;
  justify-content: center;
  margin-top: 24px;
}
</style>
