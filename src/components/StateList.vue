<template>
  <n-timeline>
    <n-timeline-item v-for="i in 100" :key="i">
      <n-time format="yyyy-MM-dd HH:mm" />
    </n-timeline-item>
  </n-timeline>
</template>

<style scoped>
.n-timeline {
  padding: 8px 12px;
}
</style>
