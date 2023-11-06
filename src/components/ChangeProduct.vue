<script setup>
import { inject } from 'vue'
const change_product = inject('change_product')
</script>

<template>
  <n-modal
    v-model:show="change_product"
    transform-origin="center"
    :mask-closable="false"
    preset="card"
    :style="{ width: '600px' }"
  >
    <template #header>
      <div class="card-title">变更产物</div>
    </template>
    Hello
  </n-modal>
</template>

<style scoped>
.card-title {
  width: 100%;
  display: flex;
  justify-content: center;
}
</style>
