import { dotnet } from '@/wasm/dotnet'

export class WasmSimulator {
  promise_ready
  id
  service
  cp
  scripts
  on_script_executed

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
    this.scripts = ''

    return this
  }

  ready() {
    return this.promise_ready
  }

  execute_script(script) {
    this.scripts = this.scripts + script + '\n'
    this.service.ExecuteScript(this.id, script)
    if (this.on_script_executed) this.on_script_executed(this)
  }

  simulate(seconds) {
    this.execute_script(`simulate ${seconds}`)
  }

  get_data(detailed = false) {
    return JSON.parse(this.service.GetData(this.id, detailed))
  }

  set_op(op, upgraded, mood) {
    if (!upgraded && upgraded != 0 || typeof(upgraded) === 'string' && upgraded.trim() === '') {
      upgraded = '_'
    }
    if (!mood && mood != 0 || typeof(mood) === 'string' && mood.trim() === '') {
      mood = '_'
    }
    this.execute_script(`setOpState ${op} ${upgraded} ${mood}`)
  }

  set_facility_state(facility, state) {
    var script = `with ${facility}`
    const append = function(content) {
      script = script + '; ' + content
    }

    if ('type' in state) {
      append(`setFac ${state['type']}`);
    }
    if ('destroy' in state) {
      append('setFac _');
    }
    if ('level' in state) {
      append(`setLevel ${state['level']}`);
    }
    if ('strategy' in state) {
      append(`setStrategy ${state['strategy']}`);
    }
    if ('product' in state) {
      append(`setProduct ${state['product']}`);
    }
    if ('operators' in state) {
      append(`setOps ${state['operators'].join(' ')}`);
    }
    if ('drones' in state) {
      append(`useDrones ${state['drones']}`);
    }
    if ('collect' in state) {
      append(`collect ${state['collect']}`);
    }

    this.execute_script(script)
    // this.service.SetFacilityState(this.id, facility, JSON.stringify(state))
  }

  set_facilities_state(state) {
    // 目前的代码中，只有载入预设的时候会使用该代码，故暂不进行脚本化改造
    this.service.SetFacilitiesState(this.id, JSON.stringify(state))
  }

  collect_all() {
    this.execute_script('collectAll')
  }
}
