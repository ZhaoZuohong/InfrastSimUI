export const facility_location = [
  {
    display: '控制中枢',
    name: 'control-center',
    col: 5,
    row: 1
  },
  {
    display: '会客室',
    name: 'reception',
    col: 6,
    row: 1
  },
  {
    display: '加工站',
    name: 'crafting',
    col: 6,
    row: 2
  },
  {
    display: '办公室',
    name: 'office',
    col: 6,
    row: 3
  },
  {
    display: '训练室',
    name: 'training',
    col: 6,
    row: 4
  }
]

const right_display_name = Object.fromEntries(
  facility_location.map((facility) => [facility.name, facility.display])
)

export function get_display_name(facility, state) {
  const left_display_name = {
    trading: '贸易站',
    manufacturing: '制造站',
    power: '发电站'
  }

  let lower_facility = facility.toLowerCase()
  if (lower_facility == 'controlcenter') {
    lower_facility = 'control-center'
  }

  if (state != null) {
    if (lower_facility in right_display_name) {
      if (state) return `${state}级${right_display_name[lower_facility]}`
      else return '未建造'
    }
    if (lower_facility.startsWith('dormitory')) {
      if (state) return `${state}级宿舍`
      else return '未建造'
    }
    if (lower_facility.startsWith('b')) {
      if (state.type) return `${state.level}级${left_display_name[state.type.toLowerCase()]}`
      else return '未建造'
    }
  } else {
    if (lower_facility in left_display_name) return left_display_name[lower_facility]
    else if (lower_facility in right_display_name) return right_display_name[lower_facility]
    else if (lower_facility.startsWith('dormitory')) {
      let result = '宿舍'
      if (lower_facility != 'dormitory') {
        result += lower_facility.slice(-1)
      }
      return result
    }
    return facility
  }
  return '无'
}

export function format_time(seconds) {
  const h = Math.floor(seconds / 3600)
  const m = Math.floor((seconds % 3600) / 60)
  const s = Math.floor(seconds % 60)
  let result = ''
  if (h > 0) result += `${h}h `
  result += `${m}m `
  result += `${s}s`
  return result
}

export function format_details(details, dict, conv) {
  const res = details['details']
    .filter((detail) => !detail.disabled && Math.abs(detail.value) > 1e-6)
    .map(
      (detail) =>
        `${translate(detail.tag, dict)}${detail.value > 0 ? '+' : ''}`
        + (conv ? conv(detail.value) : detail.value.toFixed(2))
    )
    .join(' ')
  return res !== '' ? `（${res}）` : ''
}

function make_pair(label, value = undefined) {
  return {
    label: label,
    value: value ?? label
  }
}

export function translate(name, dict) {
  const dictionary = {
    GlobalTradingEfficiency: '全局贸易加成',
    GlobalManufacturingEfficiency: '全局制造加成',
    facility: '设施',
    base: '设施',
    'control-center': '中枢',
    'dorm-vip': 'VIP',
    'dorm-atmosphere': '宿舍氛围',
    'dorm-extra': '群回宿管',
    'control-center-mod': '控制中枢',
    'control-center-extra': '控制中枢技能',
  }

  if (dict && name in dict) {
    return dict[name]
  }
  if (name in dictionary) {
    return dictionary[name]
  }
  return name
}

export function get_current_product(fac) {
  const dict = {
    'Gold': "龙门商法",
    'OriginStone': "开采协力"
  }

  if (fac.type === "Manufacturing") {
    return fac.product ?? "(无)"
  } else if (fac.type === "Trading") {
    return dict[fac.strategy] ?? "(无)"
  } else {
    return undefined;
  }
}
export function get_product_list(fac) {
  if (fac.type === "Manufacturing") {
    return [ "基础作战记录", "初级作战记录", "中级作战记录", "赤金", ]
      .map((x) => make_pair(x))
      .concat([
        make_pair("源石碎片(使用固源岩)", "源石碎片_固源岩"),
        make_pair("源石碎片(使用装置)", "源石碎片_装置")
      ])
  } else if (fac.type === "Trading") {
    return [make_pair("龙门商法", "Gold"), make_pair("开采协力", "OriginStone")]
  } else {
    return undefined;
  }
}

export function get_left_location(idx) {
  return `B${Math.floor(idx / 3) + 1}0${(idx % 3) + 1}`
}

export function get_left_index(location) {
  if (!location.startsWith('B')) {
    return -1
  }
  const row = parseInt(location.slice(1, 2))
  const col = parseInt(location.slice(3, 4))
  return (row - 1) * 3 + col - 1
}

export function facility_name_list(operators) {
  return operators.map(o => o === null ? '' : o.name)
}