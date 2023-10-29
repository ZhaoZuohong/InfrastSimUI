<script setup>
import { darkTheme } from 'naive-ui'
import { inject, ref } from 'vue'
const state = inject('state')
const show_all = ref(false)

function translate(name) {
  const dictionary = {
    GlobalTradingEffiency: '全局贸易加成',
    GlobalManufacturingEffiency: '全局制造加成',
    common: '中枢'
  }

  if (name in dictionary) {
    return dictionary[name]
  }
  return name
}

function format_value(v) {
  let details = ''
  if (v.details) {
    details =
      '（' +
      v.details
        .map((detail) => `${translate(detail.tag)}${detail.value > 0 ? '+' : ''}${detail.value}`)
        .join(' ') +
      '）'
  }
  return v.value + details
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
          <td>{{ state.drones }}</td>
        </tr>
        <tr v-show="show_all">
          <td>无人机效率</td>
          <td>{{ state['drones-efficiency'].toFixed(2) }}</td>
        </tr>
        <template v-for="(v, name) in state['global-props']" :key="name">
          <tr v-if="v.value != 0" v-show="show_all">
            <td>{{ translate(name) }}</td>
            <td>{{ format_value(v) }}</td>
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
  width: 120px;
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
