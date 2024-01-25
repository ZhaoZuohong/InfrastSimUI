<script setup>
import { ref, computed, inject, watch } from 'vue'
import { match } from 'pinyin-pro'
import { get_current_product, get_product_list } from '@/utils/display'
const change_product = inject('change_product')
const active_facility = inject('active_facility')
const facility_state = inject('facility_state')
const simulator = inject('simulator')

const new_product = ref('')
const product_list = computed(() => get_product_list(facility_state.value))

watch(change_product, (new_value) => {
    if (new_value) {
      new_product.value = get_current_product(facility_state.value)
    }
  }
)

function pinyinFilter(input, src) {
  return match(src.label, input);
}
function operate() {
  change_product.value = false
  if (facility_state.value.type === 'Manufacturing') {
    simulator.value.set_facility_state(active_facility.value, {
      'product': new_product.value
    })
  } else {
    simulator.value.set_facility_state(active_facility.value, {
      'strategy': new_product.value
    })
  }
}
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
    <n-select v-model:value="new_product" :options="product_list" :filter="pinyinFilter"
            filterable />
    <div class="bottom-line">
      <n-button type="primary" @click="operate">确认</n-button>
      <n-button @click="change_product = false">取消</n-button>
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
