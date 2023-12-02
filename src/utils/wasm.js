import { dotnet } from '@/wasm/dotnet'

export class WasmSimulator {
  promise_ready
  id
  service

  constructor(data) {
    this.promise_ready = this.#init(data)
  }

  async #init(data) {
    const { setModuleImports, getAssemblyExports, getConfig } = await dotnet.create()

    setModuleImports('main.js', {
      window: {
        location: {
          href: () => window.location.href
        }
      }
    })

    const config = getConfig()
    const exports = await getAssemblyExports(config.mainAssemblyName)
    this.service = exports.InfrastSim.Wasm.SimulatorService
    this.id = data ? this.service.CreateWithData(data) : this.service.Create()

    return this
  }

  ready() {
    return this.promise_ready
  }

  simulate(seconds) {
    this.service.Simulate(this.id, seconds)
  }

  get_data() {
    return JSON.parse(this.service.GetData(this.id))
  }

  get_data_for_mower() {
    return JSON.parse(this.service.GetData(this.id, true))
  }

  set_facility_state(facility, state) {
    this.service.SetFacilityState(this.id, facility, JSON.stringify(state))
  }

  set_facilities_state(state) {
    this.service.SetFacilitiesState(this.id, JSON.stringify(state))
  }

  collect_all() {
    this.service.CollectAll(this.id)
  }
}
