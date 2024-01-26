<script setup>
import { ref, watch, inject, computed } from 'vue';
import { match } from 'pinyin-pro'
const config_operators = inject('config_operators')
const simulator = inject('simulator')
const state = inject('state')

function default_item() {
    return {name: '', upgraded: '', mood: ''}
}

const items = ref([default_item()]); // 初始列表包含一个空字符串
const operator_list = computed(() => {
  return state.value.operators.map((x) => ({
    label: x.name,
    value: x.name
  }))
})

function pinyinFilter(input, src) {
  return match(src.label, input);
}

watch(() => config_operators.value, (newValue) => {
    if (newValue) {
        items.value = [default_item()]
    }
})

// 使用watch来处理非输入事件（如粘贴）导致的列表更新
watch(() => items.value[items.value.length - 1], (newValue) => {
    if (newValue.name.trim() !== '') {
        items.value.push(default_item());
    }
}, { deep: true });

function operate() {
  config_operators.value = false
  for (var item of items.value) {
    if (item.name !== '') {
        simulator.value.set_op(item.name, item.upgraded, item.mood)
    }
  }
}
</script>

<template>
    <n-modal v-model:show="config_operators" transform-origin="center" :mask-closable="false" preset="card"
        :style="{ width: '600px' }">
        <template #header>
            <div class="card-title">调整干员</div>
        </template>
        <n-table :single-line="false">
            <thead>
                <tr>
                    <th>干员名称</th>
                    <th>进阶</th>
                    <th>心情</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="(item, index) in items" :key="index">
                    <td>
                        <n-select v-model:value="item.name" :options="operator_list" :filter="pinyinFilter" filterable />
                    </td>
                    <td>
                        <n-input-number v-model:value="item.upgraded" />
                    </td>
                    <td>
                        <n-input-number v-model:value="item.mood" />
                    </td>
                </tr>
            </tbody>
        </n-table>
        <div class="bottom-line">
            <n-button type="primary" @click="operate">确认</n-button>
            <n-button @click="config_operators = false">取消</n-button>
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
