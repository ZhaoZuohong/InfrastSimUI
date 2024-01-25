<script setup>
import { ref, watch, inject } from 'vue';
const simulator = inject('simulator')
const state = inject('state')
const scripts = ref('')

watch(state, () => {
    scripts.value = simulator.value.scripts
})
</script>

<template>
    <n-input placeholder="" type="textarea" v-model:value="scripts" />
</template>