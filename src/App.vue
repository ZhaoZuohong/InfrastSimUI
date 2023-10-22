<script setup>
import { zhCN, dateZhCN } from 'naive-ui'
</script>

<template>
  <n-config-provider :locale="zhCN" :date-locale="dateZhCN">
    <div class="parent">
      <div class="header">
        <top-bar />
      </div>
      <div class="sidebar">
        <n-scrollbar>
          <state-list />
        </n-scrollbar>
        <state-action />
      </div>
      <div class="main">
        <n-scrollbar>
          <facility-overview />
          <facility-bar />
          <facility-detail />
        </n-scrollbar>
      </div>
    </div>
    <welcome-page />
    <construction-mode />
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
  grid-template-columns: 200px 1fr;
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

.main {
  grid-area: main;
  overflow: hidden;
}

.n-divider {
  margin: 0;
}

.n-scrollbar {
  height: 100%;
}
</style>
