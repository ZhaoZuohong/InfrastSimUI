import { WasmSimulator } from '@/utils/wasm'
import { shallowRef, computed } from 'vue'
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
  return CheckPoint(data.time, data, simu.prev_cp, simu.scripts)
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
  }

  init(simu) {
    const data = simu.get_data()
    const init_cp = new CheckPoint(data.time, data, null, '')
    simu.cp = init_cp

    this.cp_list = [init_cp]
    this.cp_simus = {}
    this.cp_simus[init_cp] = []
    this.switch_simu(simu)
  }

  switch_simu(simu) {
    this.cur_simu.value.on_script_executed = null
    simu.on_script_executed = this.on_script_executed

    if (this.cp_simus[simu.cp].indexOf(simu) === -1) {
      this.cp_simus[simu.cp].push(simu)
    }
    this.cur_simu.value = simu
  }
  async switch_cp(cp) {
    if (this.cp_list.indexOf(cp) === -1) {
      this.cp_list.push(cp)
      this.cp_simus[cp] = []
    }
    var simu = await new WasmSimulator(cp.data).ready()
    this.switch_simu(simu)
  }
  create_cp() {
    var new_cp = create_cp(this.cur_simu.value)
    this.switch_cp(new_cp)
  }
}
