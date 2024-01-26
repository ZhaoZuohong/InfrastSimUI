<template>
  <template v-for="cp in stateManager.cp_list.value" :key="cp.name">
    <n-timeline>
      <n-timeline-item :id="`cp-${cp.name}`">
        <template #icon>
          <n-icon size="40" @dblclick="() => stateManager.switch_cp(cp)">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100">
              <circle v-if="stateManager.cur_cp.value.name == cp.name" cx="50" cy="50" r="21" fill="#409eff" />
              <circle v-else cx="50" cy="50" r="21" fill="none" stroke="#409eff" stroke-width="5" />
            </svg>
          </n-icon>
        </template>
        <!-- 显示 CP 名称 -->
        <template #header>
          <div v-if="editingId === cp.name">
            <input id="editingStateTitle" type="text" v-model="cp.tag" @blur="disableEditing"
              @keyup.enter="disableEditing">
          </div>
          <div v-else @dblclick="() => enableEditing(cp.name)">
            {{ cp.tag || cp.name }}
          </div>
        </template>
      </n-timeline-item>

      <!-- 遍历并显示每个 CP 对应的 states -->
      <n-timeline-item v-for="(state, index) in stateManager.cp_simus.value[cp.name]" :key="`${cp.name}-${index}`">
        <template #icon>
          <n-icon size="40" @dblclick="() => stateManager.switch_simu(state)">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100">
              <circle v-if="stateManager.cur_simu.value.id == state.id" cx="50" cy="50" r="16" fill="#67c23a" />
              <circle v-else cx="50" cy="50" r="16" fill="none" stroke="#67c23a" stroke-width="5" />
            </svg>
          </n-icon>
        </template>
        <template #header>
          <div v-if="editingId === state.id">
            <input id="editingStateTitle" type="text" v-model="state.title" @blur="disableEditing"
              @keyup.enter="disableEditing">
          </div>
          <div v-else @dblclick="() => enableEditing(state.id)">
            {{ state.title || '#' + state.id }}
          </div>
        </template>
        <n-time format="yyyy-MM-dd HH:mm" :time="new Date(state.get_data().time)" />
      </n-timeline-item>
    </n-timeline>
  </template>
</template>

<script setup>
import { ref, inject, nextTick } from 'vue';

const stateManager = inject('state_manager');
const editingId = ref(null);

const enableEditing = async (id) => {
  editingId.value = id;
  await nextTick();
  var textbox = document.getElementById("editingStateTitle")
  textbox && textbox.focus()
};

const disableEditing = () => {
  editingId.value = null;
};

</script>


<style scoped>
.n-timeline {
  padding: 8px 12px;
}
</style>
