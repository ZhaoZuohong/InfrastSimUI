<template>
  <n-table :single-line="false" size="small">
    <thead>
      <tr>
        <th>干员</th>
        <th>效率</th>
        <th>心情</th>
        <th>心情消耗速率</th>
        <th>工作时间</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="i in 5" :key="i">
        <td>红云</td>
        <td>0.16</td>
        <td>24.0</td>
        <td>0.4</td>
        <td><n-time format="HH:mm" /></td>
      </tr>
    </tbody>
  </n-table>
</template>

<style scoped lang="scss">
.n-table {
  width: 600px;
  margin: 24px auto;

  th,
  td {
    padding: 6px 12px;
  }
}
</style>
