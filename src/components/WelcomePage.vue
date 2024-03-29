<script setup>
import { ref, inject, computed } from 'vue'
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
const initial = ref('preset')
const initial_options = [
  {
    label: '从空白开始',
    value: 'blank'
  },
  {
    label: '载入预设',
    value: 'preset'
  },
  {
    label: '从本地导入状态',
    value: 'import'
  }
]

const preset = ref('252T21')
const presets = [
  {
    value: 'P2',
    label: '2电站',
    children: [
      {
        label: '右满252 21贸',
        value: '252T21'
      },
      {
        label: '右满252 11贸',
        value: '252T11'
      },
      {
        label: '右满252 31贸',
        value: '252T31'
      },
      {
        label: '右满252 32贸',
        value: '252T32'
      },
      {
        label: '右满342 321贸',
        value: '342T321'
      },
      {
        label: '右满342 222贸',
        value: '342T222'
      }
    ]
  },
  {
    value: 'P3',
    label: '3电站',
    children: [
      {
        label: '243',
        value: '243'
      },
      {
        label: '153',
        value: '153'
      },
      {
        label: '333',
        value: '333'
      }
    ]
  }
]

const links = {
  InfrastSim: 'https://github.com/Funny-ppt/InfrastSim',
  'arknights-mower': 'https://github.com/ArkMowers/arknights-mower'
}

import { WasmSimulator } from '@/utils/wasm'
const state_manager = inject('state_manager')
const state = inject('state')
const axios = inject('axios')

const loading = ref(false)
const upload_success = ref(false)
var upload_data = null
const canEnter = computed(() => loading.value || (initial.value == 'import' && !upload_success.value))

function handleFileChange(fileList) {
  const fileInfo = fileList[0];

  if (fileInfo && fileInfo.file instanceof File) {
    const reader = new FileReader();

    reader.onload = (e) => {
      try {
        JSON.parse(e.target.result);
        upload_success.value = true;
        upload_data = e.target.result;
      } catch (error) {
        upload_success.value = false;
      }
    };

    reader.readAsText(fileInfo.file);
  } else {
    upload_success.value = false;
  }
}

async function enter() {
  loading.value = true
  var simu
  if (initial.value == 'import') {
    simu = await new WasmSimulator(upload_data).ready()
  } else {
    simu = await new WasmSimulator().ready()
  }
  if (initial.value == 'preset') {
    const { data } = await axios.get(`/presets/${preset.value}.json`)
    simu.set_facilities_state(data)
  }
  state_manager.init(simu)
  state.value = simu.get_data(true)
  loading.value = false
  show.value = false
}
</script>

<template>
  <n-modal v-model:show="show" :mask-closable="false">
    <n-card class="card" :content-style="{
      display: 'flex',
      'flex-direction': 'column',
      'justify-content': 'center',
      'align-items': 'center',
      gap: '8px'
    }">
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
          <n-upload :on-update:file-list="handleFileChange" :max="1">
            <n-upload-dragger>点击或者拖拽上传</n-upload-dragger>
          </n-upload>
        </n-form-item>
        <n-form-item label="预设" v-if="initial == 'preset'">
          <n-cascader v-model:value="preset" :options="presets" check-strategy="child" />
        </n-form-item>
      </n-form>
      <n-button type="primary" @click="enter" :loading="loading" :disabled="canEnter">
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
