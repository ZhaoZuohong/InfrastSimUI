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
const left_options3 = options3.slice(1, 4)

const initial_state = computed(() => {
  return {
    control_center: state.value['control-center'].level,
    reception: state.value.reception.level,
    crafting: state.value.crafting.level,
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
    crafting: initial_state.value.crafting,
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

const operations = computed(() => {
  const result = {}
  for (const facility of ['control_center', 'reception', 'crafting', 'office', 'training']) {
    if (new_state.value[facility] != initial_state.value[facility]) {
      result[facility] = {
        before: initial_state.value[facility],
        after: new_state.value[facility]
      }
    }
  }
  for (let i = 0; i < 4; ++i) {
    if (initial_state.value.dormitories[i] != new_state.value.dormitories[i]) {
      result[`dormitory ${i + 1}`] = {
        before: initial_state.value.dormitories[i],
        after: new_state.value.dormitories[i]
      }
    }
  }
  for (let i = 0; i < 9; ++i) {
    if (
      initial_state.value.left_side[i].type != new_state.value.left_side[i].type ||
      (initial_state.value.left_side[i].type &&
        initial_state.value.left_side[i].level != new_state.value.left_side[i].level)
    ) {
      result[`B${Math.floor(i / 3) + 1}0${(i % 3) + 1}`] = {
        before: initial_state.value.left_side[i],
        after: new_state.value.left_side[i]
      }
    }
  }
  return result
})

function get_display_name(facility, state) {
  const left_display_name = {
    Trading: '贸易站',
    Manufacturing: '制造站',
    Power: '发电站'
  }

  const right_display_name = {
    reception: '会客室',
    crafting: '加工站',
    office: '办公室',
    training: '训练室',
    control_center: '控制中枢'
  }

  if (state != null) {
    if (facility in right_display_name) {
      if (state) return `${state}级${right_display_name[facility]}`
      else return '未建造'
    }
    if (facility.startsWith('dormitory')) {
      if (state) return `${state}级宿舍`
      else return '未建造'
    }
    if (facility.startsWith('B')) {
      if (state.type) return `${state.level}级${left_display_name[state.type]}`
      else return '未建造'
    }
  } else {
    if (facility in left_display_name) return left_display_name[facility]
    else if (facility in right_display_name) return right_display_name[facility]
    else if (facility.startsWith('dormitory')) return `宿舍${facility.slice(-1)}`
    return facility
  }
  return '无'
}
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
    <n-scrollbar style="max-height: calc(100vh - 160px)">
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
          <n-select v-model:value="new_state.crafting" :options="options3" />
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
          <n-select
            :disabled="!facility.type"
            v-model:value="facility.level"
            :options="left_options3"
          />
        </div>
      </div>
      <n-table :single-line="false" size="small">
        <thead>
          <tr>
            <th>设施</th>
            <th>原状态</th>
            <th>目标状态</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(state, facility) in operations" :key="facility">
            <td>{{ get_display_name(facility) }}</td>
            <td>{{ get_display_name(facility, state.before) }}</td>
            <td>{{ get_display_name(facility, state.after) }}</td>
          </tr>
        </tbody>
      </n-table>
    </n-scrollbar>
    <div class="bottom-line">
      <n-button type="primary">确认</n-button>
      <n-button>取消</n-button>
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
  grid-template-columns: repeat(3, 235px) 180px 150px;
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

.n-table {
  width: 600px;
  margin: 24px auto;
  th,
  td {
    padding: 6px 12px;
  }
}

.bottom-line {
  display: flex;
  gap: 8px;
  justify-content: center;
}
</style>
