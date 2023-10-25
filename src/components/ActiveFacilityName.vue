<script setup>
import { inject } from 'vue'
const active_facility = inject('active_facility')
const facility_state = inject('facility_state')
import { get_display_name } from '@/utils/display'
</script>

<template>
  {{ get_display_name(facility_state.type) }}
  <template v-if="active_facility.startsWith('B')">{{ active_facility }}</template>
  <template v-if="active_facility.startsWith('dormitory')">
    {{ parseInt(active_facility.slice(-1)) }}
  </template>
</template>
