<script setup>
import { inject, computed, ref, watch } from 'vue'
import { match } from 'pinyin-pro'
// import { _ } from 'lodash'
import { facility_name_list } from '@/utils/display'

const select_operator = inject('select_operator')
const active_facility = inject('active_facility')
const facility_state = inject('facility_state')
const state = inject('state')
const simulator = inject('simulator')

const operator_list = computed(() => {
  const x = state.value.operators.map((x) => ({
    label: x.name,
    value: x.name
  }))
  x.unshift({ label: '（无）', value: '' })
  return x
})

const operators = ref([])

watch(select_operator, (new_value) => {
  if (new_value) {
    operators.value = facility_name_list(facility_state.value.operators)
  }
})

// watch(
//   operators,
//   (new_value) => {
//     const length = new_value.length
//     const selected = new_value.filter((x) => x) // TODO
//     const result = selected.concat(Array(length - selected.length).fill(''))
//     if (_.isEqual(result, new_value)) {
//       operators.value = result
//     }
//   },
//   { deep: true }
// )

function operate() {
  select_operator.value = false
  simulator.value.set_facility_state(active_facility.value, {
    'operators': operators.value.filter((x) => x)
  })
  state.value = simulator.value.get_data_for_mower()
}

function pinyinFilter(input, src) {
  return match(src.label, input);
}
</script>

<template>
  <n-modal
    v-model:show="select_operator"
    transform-origin="center"
    :mask-closable="false"
    preset="card"
    :style="{ width: '600px' }"
  >
    <template #header>
      <div class="card-title">进驻干员（<active-facility-name />）</div>
    </template>
    <n-table :single-line="false">
      <thead>
        <tr>
          <th>调整前</th>
          <th>调整后</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(_, idx) in operators" :key="idx">
          <td>
            {{ facility_state.operators[idx] ? facility_state.operators[idx].name : '（无）' }}
          </td>
          <td>
            <n-select v-model:value="operators[idx]" :options="operator_list" :filter="pinyinFilter"
            filterable />
          </td>
        </tr>
      </tbody>
    </n-table>
    <div class="bottom-line">
      <n-button type="primary" @click="operate">确认</n-button>
      <n-button @click="select_operator = false">取消</n-button>
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
