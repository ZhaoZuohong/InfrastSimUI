<script setup>
import { inject, ref } from 'vue'

const construction_mode = inject('construction_mode')
const config_operators = inject('config_operators')
const simulator = inject('simulator')

const simulate_minutes = ref(1)

function simulate(minutes) {
  simulator.value.simulate(minutes * 60)
}
function collect_all() {
  simulator.value.collect_all()
}
function download() {
  const data = JSON.stringify(simulator.value.get_data());
  const blob = new Blob([data], { type: 'text/json' });
  const url = URL.createObjectURL(blob);

  const link = document.createElement('a');
  link.href = url;
  link.download = 'infrast.json';
  document.body.appendChild(link);

  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}
</script>

<template>
  <div class="top-bar">
    <div>
      <n-h1>基建模拟器</n-h1>
      <n-input-number v-model:value="simulate_minutes" :show-button="false" placeholder="请输入模拟时间">
        <template #suffix>分钟</template>
      </n-input-number>
      <n-button @click="simulate(simulate_minutes)">运行</n-button>
      <n-button @click="simulate(60 * 4)">运行4小时</n-button>
      <n-button @click="simulate(60 * 24)">运行1天</n-button>
      <n-button @click="download">下载</n-button>
    </div>
    <div>
      <n-button>收益统计</n-button>
      <n-button @click="construction_mode = true">建造模式</n-button>
      <n-button @click="config_operators = true">配置干员</n-button>
      <!-- <n-button>理智充无人机</n-button> -->
      <!-- <n-button>撤下干员</n-button> -->
      <n-button @click="collect_all">收取全部产物</n-button>
    </div>
  </div>
</template>

<style scoped lang="scss">
.n-h1 {
  margin: 0 12px 0 0;
}

.top-bar {
  display: flex;
  justify-content: space-between;
  padding: 0 24px;

  &>div {
    display: flex;
    align-items: center;
    gap: 6px;
  }
}
</style>
