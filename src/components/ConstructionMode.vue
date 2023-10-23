<script setup>
import { inject, ref, computed, watch } from 'vue'
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
const left_options = [
  { label: '不建', value: '' },
  { label: '贸易站', value: 'Trading' },
  { label: '制造站', value: 'Manufacturing' },
  { label: '发电站', value: 'Power' }
]

const initial_state = computed(() => {
  return {
    control_center: state.value['control-center'].level,
    reception: state.value.reception.level,
    workshop: state.value.crafting.level,
    office: state.value.office.level,
    training: state.value.training.level,
    dormitories: state.value.dormitories.map((x) => x.level),
    left_side: state.value['modifiable-facilities'].map((x) => {
      if (x) {
        return {
          type: x.type,
          level: x.level
        }
      }
      return {
        type: '',
        level: 1
      }
    })
  }
})

const new_state = ref({})

function get_new_state() {
  new_state.value = {
    control_center: initial_state.value.control_center,
    reception: initial_state.value.reception,
    workshop: initial_state.value.workshop,
    office: initial_state.value.office,
    training: initial_state.value.training,
    dormitories: structuredClone(initial_state.value.dormitories),
    left_side: structuredClone(initial_state.value.left_side)
  }
}

watch(construction_mode, (new_value) => {
  if (new_value) {
    get_new_state()
  }
})
</script>

<template>
  <n-modal
    v-model:show="construction_mode"
    transform-origin="center"
    :mask-closable="false"
    preset="card"
    :style="{ width: '1140px' }"
  >
    <template #header>
      <div class="card-title">建造模式</div>
    </template>
    <div class="container">
      <div :style="{ 'grid-row': 1, 'grid-column': 4 }">
        <span class="w-70">控制中枢</span>
        <n-select v-model:value="new_state.control_center" :options="options5" />
      </div>
      <div
        v-for="(_, idx) in new_state.dormitories"
        :key="idx"
        :style="{ 'grid-row': 2 + idx, 'grid-column': 4 }"
      >
        <span class="w-70">宿舍{{ idx + 1 }}</span>
        <n-select v-model:value="new_state.dormitories[idx]" :options="options5" />
      </div>
      <div :style="{ 'grid-row': 1, 'grid-column': 5 }">
        <span>会客室</span>
        <n-select v-model:value="new_state.reception" :options="options3" />
      </div>
      <div :style="{ 'grid-row': 2, 'grid-column': 5 }">
        <span>加工站</span>
        <n-select v-model:value="new_state.workshop" :options="options3" />
      </div>
      <div :style="{ 'grid-row': 3, 'grid-column': 5 }">
        <span>办公室</span>
        <n-select v-model:value="new_state.office" :options="options3" />
      </div>
      <div :style="{ 'grid-row': 4, 'grid-column': 5 }">
        <span>训练室</span>
        <n-select v-model:value="new_state.training" :options="options3" />
      </div>
      <div
        v-for="(facility, idx) in new_state.left_side"
        :key="idx"
        :style="{ 'grid-row': Math.floor(idx / 3) + 2, 'grid-column': (idx % 3) + 1 }"
      >
        <span>B{{ Math.floor(idx / 3) + 1 }}0{{ (idx % 3) + 1 }}</span>
        <n-select v-model:value="facility.type" :options="left_options" />
        <n-select :disabled="!facility.type" v-model:value="facility.level" :options="options3" />
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

.w-70 {
  width: 70px;
  display: inline-block;
  text-align: right;
}

.container {
  display: grid;
  grid-template-rows: repeat(5, 1fr);
  grid-template-columns: repeat(3, 240px) 180px 150px;
  gap: 12px;

  & > div {
    display: flex;
    align-items: center;
    gap: 6px;
  }

  .n-select {
    width: 90px;
    display: inline-block;
  }
}
</style>
