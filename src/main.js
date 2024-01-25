import { createApp, ref, computed } from 'vue'
import App from '@/App.vue'

const app = createApp(App)

const state = ref({
  time: Date.now(),
  drones: 0,
  'drones-efficiency': 1,
  'control-center': {
    type: 'ControlCenter',
    level: 0,
    operators: []
  },
  office: {
    type: 'Office',
    level: 0,
    operators: []
  },
  reception: {
    type: 'Reception',
    level: 0,
    operators: []
  },
  training: {
    type: 'Training',
    level: 0,
    operators: []
  },
  crafting: {
    type: 'Crafting',
    level: 0,
    operators: []
  },
  dormitories: [
    {
      type: 'Dormitory',
      level: 0,
      operators: []
    },
    {
      type: 'Dormitory',
      level: 0,
      operators: []
    },
    {
      type: 'Dormitory',
      level: 0,
      operators: []
    },
    {
      type: 'Dormitory',
      level: 0,
      operators: []
    }
  ],
  'modifiable-facilities': [null, null, null, null, null, null, null, null, null]
})
const state_manager = new StateManager()
state_manager.on_script_executed = function(simulator) {
  state.value = simulator.get_data(true)
}

app.provide('state_manager', state_manager)
app.provide('simulator', state_manager.cur_simu)
app.provide('state', state)
const active_facility = ref('')
app.provide('active_facility', active_facility)
app.provide('construction_mode', ref(false))
app.provide('select_operator', ref(false))
app.provide('change_product', ref(false))
app.provide('use_drone', ref(false))
app.provide('config_operators', ref(false))

import { get_left_index } from '@/utils/display'
const facility_state = computed(() => {
  if (active_facility.value.startsWith('dormitory')) {
    return state.value.dormitories[parseInt(active_facility.value.slice(-1)) - 1]
  } else if (active_facility.value.startsWith('B')) {
    return state.value['modifiable-facilities'][get_left_index(active_facility.value)]
  } else {
    return state.value[active_facility.value]
  }
})
app.provide('facility_state', facility_state)

import axios from 'axios'
import VueAxios from 'vue-axios'
import { StateManager } from './utils/state_management'

app.use(VueAxios, axios)
app.provide('axios', app.config.globalProperties.axios)

app.mount('#app')
