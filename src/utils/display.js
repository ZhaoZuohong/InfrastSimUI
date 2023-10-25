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
    Trading: '贸易站',
    Manufacturing: '制造站',
    Power: '发电站'
  }

  if (state != null) {
    if (facility in right_display_name) {
      if (state) return `${state}级${right_display_name[facility]}`
      else return '未建造'
    }
    if (facility.startsWith('dormitory')) {
      if (state) return `${state}级宿舍`
      else return '未建造'
    }
    if (facility.startsWith('B')) {
      if (state.type) return `${state.level}级${left_display_name[state.type]}`
      else return '未建造'
    }
  } else {
    if (facility in left_display_name) return left_display_name[facility]
    else if (facility in right_display_name) return right_display_name[facility]
    else if (facility.startsWith('dormitory')) return `宿舍${facility.slice(-1)}`
    return facility
  }
  return '无'
}

export function get_left_location(idx) {
  return `B${Math.floor(idx / 3) + 1}0${(idx % 3) + 1}`
}
