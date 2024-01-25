<template>
    <div class="editor-container">
        <n-input placeholder="" type="textarea" v-model:value="scripts" style="flex= 1;" />
        <div class="action-bar">
            <n-select></n-select>
            <n-button @click="() => state_manager.create_cp()">创建分支</n-button>
            <n-button @click="execute">执行代码</n-button>
        </div>
    </div>
</template>
  
<script setup>
import { ref, watch, inject } from 'vue';

const state_manager = inject('state_manager');
const simulator = inject('simulator');
const state = inject('state');
const scripts = ref('');

watch(state, () => {
    scripts.value = simulator.value.scripts;
});

async function execute() {
    const scripts_cache = scripts.value
    await state_manager.switch_cp(state_manager.cur_cp.value)
    state_manager.cur_simu.value.execute_script(scripts_cache)
    
}
</script>
  
<style scoped>
.editor-container {
    display: flex;
    flex-direction: column;
}

.n-input {
    height: 100%;
}

.action-bar {
    padding: 4px;
    display: flex;
    gap: 2px;
    align-items: center;
    justify-content: flex-end;
    border-top: 1px solid rgb(239, 239, 245);
    flex: none;
    height: auto;
}
</style>
  