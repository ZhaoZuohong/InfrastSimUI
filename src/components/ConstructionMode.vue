<script setup>
import { inject } from 'vue'
const construction_mode = inject('construction_mode')
const state = inject('state')

const options5 = [
  { label: '不建', value: 0 },
  { label: '1级', value: 1 },
  { label: '2级', value: 2 },
  { label: '3级', value: 3 },
  { label: '4级', value: 4 },
  { label: '5级', value: 5 }
]
const options3 = options5.slice(0, 4)
</script>

<template>
  <n-modal
    v-model:show="construction_mode"
    transform-origin="center"
    :mask-closable="false"
    preset="card"
    :style="{ width: '1168px' }"
  >
    <template #header>
      <div class="card-title">建造模式</div>
    </template>
    <div class="container">
      <div :style="{ 'grid-row': 1, 'grid-column': 4 }">
        控制中枢：
        <n-select v-model:value="state['control-center'].level" :options="options5" />
      </div>
      <div
        v-for="(dorm, idx) in state.dormitories"
        :key="idx"
        :style="{ 'grid-row': 2 + idx, 'grid-column': 4 }"
      >
        宿舍{{ idx + 1 }}：
        <n-select v-model:value="dorm.level" :options="options5" />
      </div>
    </div>
  </n-modal>
</template>

<style scoped lang="scss">
.card-title {
  width: 100%;
  display: flex;
  justify-content: center;
}

.container {
  display: grid;
  grid-template-rows: repeat(5, 1fr);
  grid-template-columns: repeat(3, 240px) repeat(2, 200px);

  & > div {
    display: flex;
    justify-content: flex-end;
    align-items: center;
  }

  .n-select {
    width: 100px;
  }
}
</style>
