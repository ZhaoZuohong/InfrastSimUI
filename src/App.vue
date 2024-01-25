<script setup>
import { zhCN, dateZhCN } from 'naive-ui'
import { inject } from 'vue'
const active_facility = inject('active_facility')
</script>

<template>
  <n-config-provider :locale="zhCN" :date-locale="dateZhCN">
    <div class="parent">
      <div class="header">
        <top-bar />
      </div>
      <div class="sidebar">
        <n-scrollbar style="flex: 1;">
          <state-list />
        </n-scrollbar>
        <live-script-editor style="flex: 2;" />
        <state-action />
      </div>
      <div class="main">
        <n-scrollbar>
          <facility-overview />
          <global-property />
          <facility-bar v-if="active_facility" />
          <facility-detail v-if="active_facility" />
        </n-scrollbar>
      </div>
    </div>
    <welcome-page />
    <construction-mode />
    <select-operator />
    <change-product />
    <facility-use-drone />
    <config-operators />
  </n-config-provider>
</template>

<style>
#app {
  width: 100vw;
  height: 100vh;
}

body {
  margin: 0;
}
</style>

<style scoped>
.parent {
  height: 100vh;
  width: 100vw;
  overflow: hidden;
  display: grid;
  grid-template-rows: 48px 1fr;
  grid-template-columns: 24em 1fr;
  grid-template-areas:
    'header header'
    'sidebar main';
}

.header {
  grid-area: header;
  border-bottom: 1px solid rgb(239, 239, 245);
}

.sidebar {
  grid-area: sidebar;
  overflow: hidden;
  border-right: 1px solid rgb(239, 239, 245);
  display: flex;
  flex-direction: column;
}

.state-action {
  flex: none;
  height: auto;
}

.main {
  grid-area: main;
  overflow: hidden;
  position: relative;
}

.n-divider {
  margin: 0;
}
</style>
