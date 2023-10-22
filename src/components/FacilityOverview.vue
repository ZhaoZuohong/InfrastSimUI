<script setup>
import { inject } from 'vue'

const state = inject('state')
</script>

<template>
  <div class="facility-container">
    <template v-for="(facility, i) in state['modifiable-facilities']" :key="i">
      <n-button
        v-if="facility"
        :style="{ 'grid-column': (i % 3) + 2, 'grid-row': Math.floor(i / 3) + 2 }"
      >
        生产设施{{ i }}
      </n-button>
      <n-button v-else :style="{ 'grid-column': (i % 3) + 2, 'grid-row': Math.floor(i / 3) + 2 }">
        B{{ Math.floor(i / 3) + 1 }}0{{ (i % 3) + 1 }}<br />待建造
      </n-button>
    </template>
    <template v-for="(dormitory, i) in state.dormitories" :key="i">
      <n-button v-if="dormitory.level" :style="{ 'grid-column': 5, 'grid-row': i + 2 }">
        宿舍{{ i + 1 }}
      </n-button>
      <n-button v-else :style="{ 'grid-column': 5, 'grid-row': i + 2 }">
        宿舍{{ i + 1 }}<br />待建造
      </n-button>
    </template>
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
