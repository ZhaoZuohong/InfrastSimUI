<script setup>
import { ref, inject } from 'vue'
const show = ref(true)
const run = ref('wasm')
const run_options = [
  {
    label: '在浏览器中运行（WASM）',
    value: 'wasm'
  },
  {
    label: '连接服务器',
    value: 'server',
    disabled: true
  }
]
const instance = ref('auto')
const instance_options = [
  {
    label: '自动创建',
    value: 'auto'
  },
  {
    label: '选择已有',
    value: 'select',
    disabled: true
  }
]
const initial = ref('blank')
const initial_options = [
  {
    label: '从空白开始',
    value: 'blank'
  },
  {
    label: '载入预设',
    value: 'preset',
    disabled: true
  },
  {
    label: '从本地导入状态',
    value: 'import',
    disabled: true
  }
]

const preset = ref('252')
const presets = [
  {
    label: '右满252 21贸',
    value: '252'
  },
  {
    label: '243',
    value: '243'
  }
]

const links = {
  InfrastSim: 'https://github.com/Funny-ppt/InfrastSim',
  'arknights-mower': 'https://github.com/ArkMowers/arknights-mower'
}

import { WasmSimulator } from '@/utils/wasm'
const simulator = inject('simulator')

const state = inject('state')
const loading = ref(false)

async function enter() {
  loading.value = true
  simulator.value = await new WasmSimulator().ready()
  state.value = simulator.value.get_data_for_mower()
  loading.value = false
  show.value = false
}
</script>

<template>
  <n-modal v-model:show="show" :mask-closable="false">
    <n-card
      class="card"
      :content-style="{
        display: 'flex',
        'flex-direction': 'column',
        'justify-content': 'center',
        'align-items': 'center',
        gap: '8px'
      }"
    >
      <n-h1>基建模拟器</n-h1>
      <n-form label-placement="left" label-width="80" :show-feedback="false">
        <n-form-item label="运行方式">
          <n-select v-model:value="run" :options="run_options" />
        </n-form-item>
        <n-form-item label="URL" v-if="run == 'server'">
          <n-input type="text" />
        </n-form-item>
        <n-form-item label="实例">
          <n-select v-model:value="instance" :options="instance_options" />
        </n-form-item>
        <n-form-item label="编号" v-if="instance == 'select'">
          <n-input-number />
        </n-form-item>
        <n-form-item label="初始状态">
          <n-select v-model:value="initial" :options="initial_options" />
        </n-form-item>
        <n-form-item label="文件" v-if="initial == 'import'">
          <n-upload>
            <n-upload-dragger>点击或者拖拽上传</n-upload-dragger>
          </n-upload>
        </n-form-item>
        <n-form-item label="预设" v-if="initial == 'preset'">
          <n-select v-model:value="preset" :options="presets" />
        </n-form-item>
      </n-form>
      <n-button type="primary" @click="enter" :loading="loading" :disabled="loading">
        进入基建
      </n-button>
      <n-divider />
      <n-h2>友情链接</n-h2>
      <div>
        <div v-for="(link, name) in links" :key="name">
          {{ name }}: <n-a :href="link" target="_blank">{{ link }}</n-a>
        </div>
      </div>
    </n-card>
  </n-modal>
</template>

<style scoped>
.n-h1,
.n-h2 {
  margin: 0;
}

.card {
  width: 600px;
}

.n-form {
  width: 320px;
}

.n-form-item {
  margin: 12px 0;
}

.n-divider {
  margin: 8px 0 0 0;
}
</style>
