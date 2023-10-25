<script setup>
import { inject } from 'vue'

const state = inject('state')

import { get_display_name, facility_location } from '@/utils/display'

const button_type = {
  Trading: 'info',
  Manufacturing: 'warning',
  Power: 'primary'
}
</script>

<template>
  <div class="facility-container">
    <template v-for="(facility, i) in state['modifiable-facilities']" :key="i">
      <n-button
        v-if="facility"
        secondary
        :type="button_type[facility.type]"
        :style="{ 'grid-column': (i % 3) + 2, 'grid-row': Math.floor(i / 3) + 2 }"
      >
        {{ get_display_name(facility.type) }}（{{ facility.level }}级）
      </n-button>
      <n-button
        v-else
        dashed
        :style="{ 'grid-column': (i % 3) + 2, 'grid-row': Math.floor(i / 3) + 2 }"
      >
        待建造
      </n-button>
    </template>
    <template v-for="(dormitory, i) in state.dormitories" :key="i">
      <n-button v-if="dormitory.level" secondary :style="{ 'grid-column': 5, 'grid-row': i + 2 }">
        宿舍{{ i + 1 }}（{{ dormitory.level }}级）
      </n-button>
      <n-button v-else dashed :style="{ 'grid-column': 5, 'grid-row': i + 2 }">待建造</n-button>
    </template>
    <n-button
      v-for="facility in facility_location"
      :key="facility.name"
      :secondary="state[facility.name].level > 0"
      :dashed="!state[facility.name].level"
      :style="{ 'grid-column': facility.col, 'grid-row': facility.row }"
    >
      {{ facility.display }}（{{
        state[facility.name].level ? `${state[facility.name].level}级` : '未建造'
      }}）
    </n-button>
  </div>
</template>

<style scoped>
.facility-container {
  display: grid;
  gap: 8px;
  grid-template-rows: repeat(5, 75px);
  grid-template-columns: 1fr repeat(3, 175px) 277px 175px 1fr;
  margin: 16px 0;
}

.n-button {
  width: 100%;
  height: 100%;
}
</style>
