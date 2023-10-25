<script setup>
const props = defineProps({
  facility: String,
  operators: Array
})
</script>

<template>
  <div class="outer">
    <div>{{ props.facility }}</div>
    <div class="inner">
      <n-avatar
        v-for="(name, idx) in props.operators"
        :key="idx"
        size="large"
        :src="`/avatar/${name}.png`"
      />
    </div>
  </div>
</template>

<style scoped>
.outer,
.inner {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 8px;
}

.inner {
  flex-direction: row;
}
</style>
