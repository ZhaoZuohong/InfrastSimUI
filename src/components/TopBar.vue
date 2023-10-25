<script setup>
import { inject } from 'vue'

const construction_mode = inject('construction_mode')
const state = inject('state')
</script>

<template>
  <div class="top-bar">
    <div>
      <n-h1>基建模拟器</n-h1>
      <div>无人机：{{ state.drones }}</div>
    </div>
    <div>
      <n-input-number :show-button="false" placeholder="请输入模拟时间">
        <template #suffix>分钟</template>
      </n-input-number>
      <n-button>运行</n-button>
      <n-button>下载</n-button>
    </div>
    <div>
      <n-button>收益统计</n-button>
      <n-button>配置干员</n-button>
      <n-button @click="construction_mode = true">建造模式</n-button>
      <n-button>理智充无人机</n-button>
      <n-button>撤下干员</n-button>
      <n-button>收取全部产物</n-button>
    </div>
  </div>
</template>

<style scoped lang="scss">
.n-h1 {
  margin: 0 12px 0 0;
}

.top-bar {
  display: flex;
  justify-content: space-around;

  & > div {
    display: flex;
    align-items: center;
    gap: 6px;
  }
}
</style>
