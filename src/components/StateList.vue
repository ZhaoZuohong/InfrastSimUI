<template>
  <n-timeline>
    <n-timeline-item v-for="item in items" :key="item.id" @dblclick="() => enableEditing(item.id)">
      <template #header>
        <div v-if="editingId === item.id">
          <!-- 为输入框添加一个ref -->
          <input
            id="editingStateTitle"
            type="text"
            v-model="item.title"
            @blur="disableEditing"
            @keyup.enter="disableEditing"
          >
        </div>
        <div v-else>
          {{ item.title }}
        </div>
      </template>
      <n-time format="yyyy-MM-dd HH:mm" />
    </n-timeline-item>
  </n-timeline>
</template>

<script setup>
import { ref, nextTick } from 'vue';

const items = ref(Array.from({ length: 100 }, (_, i) => ({ id: i + 1, title: `Item ${i + 1}` })));
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
