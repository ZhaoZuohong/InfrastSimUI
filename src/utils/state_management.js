import { WasmSimulator } from '@/utils/wasm'
import { ref, shallowRef, computed } from 'vue'
export class CheckPoint {
  name
  data
  prev_cp
  scripts

  constructor(name, data, prev_cp, scripts) {
    this.name = name
    this.data = data
    this.prev_cp = prev_cp
    this.scripts = scripts
  }
}
export function create_cp(simu) {
  const data = simu.get_data()
  return new CheckPoint(Date.now(), data, simu.prev_cp, simu.scripts)
}

export class StateManager {
  cp_list // checkpoint列表
  cp_simus // checkpoint到simulator的映射

  cur_simu
  cur_cp

  on_script_executed

  constructor() {
    this.cur_simu = shallowRef({})
    this.cur_cp = computed(() => this.cur_simu.value.cp)
    this.cp_list = ref([])
    this.cp_simus = ref({})
  }

  init(simu) {
    const data = simu.get_data()
    const init_cp = new CheckPoint('初始', data, null, '')
    simu.cp = init_cp

    this.cp_list.value.push(init_cp)
    this.cp_simus.value[init_cp.name] = []
    this.switch_simu(simu)
  }

  switch_simu(simu) {
    if (this.cur_simu == simu) return
    
    this.cur_simu.value.on_script_executed = null
    simu.on_script_executed = this.on_script_executed

    if (this.cp_simus.value[simu.cp.name].indexOf(simu) === -1) {
      this.cp_simus.value[simu.cp.name].push(simu)
    }
    this.cur_simu.value = simu
    this.on_script_executed && this.on_script_executed(simu)
  }
  async switch_cp(cp) {
    if (this.cp_list.value.indexOf(cp) === -1) {
      this.cp_list.value.push(cp)
      this.cp_simus.value[cp.name] = []
    }
    const simu = await new WasmSimulator(cp.data).ready()
    simu.cp = cp
    this.switch_simu(simu)
  }
  create_cp() {
    const new_cp = create_cp(this.cur_simu.value)
    this.switch_cp(new_cp)
  }
}
