<script setup>
import { darkTheme } from 'naive-ui'
import { inject, ref } from 'vue'
import { format_details } from "@/utils/display"
const state = inject('state')
const show_all = ref(false)

const display_props = {
  'drones-efficiency': '无人机生产效率',
  'office-efficiency': '办公室效率',
  'manufacturing-efficiency': '制造站总效率',
  'trading-efficiency': '贸易站总效率',
} 
const translate_dict = {
  'common': '中枢'
}
</script>

<template>
  <n-config-provider :theme="darkTheme">
      <n-card
        :bordered="false"
        content-style="padding: 2px 6px"
        @mouseenter="show_all = true"
        @mouseleave="show_all = false"
      >
        <table>
          <tr>
            <td>无人机数量</td>
            <td>{{ Math.floor(state.drones) }}</td>
          </tr>
          <template v-for="(name, key) in display_props" :key="name">
            <tr v-if="key in state">
              <td>{{ name }}</td>
              <td>{{ state[key].toFixed(2) }}</td>
            </tr>
          </template>
          <template v-for="(v, propName) in state['global-props']" :key="propName">
            <tr v-if="v.value != 0" v-show="show_all">
              <td>{{ propName }}</td>
              <td>{{ v.value }} {{ format_details(v, translate_dict) }}</td>
            </tr>
          </template>
        </table>
      </n-card>
  </n-config-provider>
</template>

<style scoped lang="scss">
.n-card {
  position: absolute;
  top: 12px;
  left: 12px;
  width: 160px;
  opacity: 0.3;
  transition: opacity 200ms;
  z-index: 200;

  &:hover {
    opacity: 0.8;
    width: 400px;
  }
}

table {
  width: 100%;
}
</style>
