import { createApp, ref } from 'vue'
import App from '@/App.vue'

const app = createApp(App)

app.provide('simulator', ref({}))
app.provide(
  'state',
  ref({
    time: Date.now(),
    drones: 0,
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
)
app.provide('active_facility', ref(''))
app.provide('construction_mode', ref(false))

app.mount('#app')
