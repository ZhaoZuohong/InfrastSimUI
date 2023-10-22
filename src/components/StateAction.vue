<template>
  <div class="action-bar">
    <div class="delete-label">删除</div>
    <n-button>更早</n-button>
    <n-button>当前</n-button>
    <n-button>更晚</n-button>
    <n-button>全部</n-button>
  </div>
</template>

<style scoped>
.action-bar {
  padding: 4px;
  display: flex;
  gap: 2px;
  align-items: center;
  justify-content: flex-end;
  border-top: 1px solid rgb(239, 239, 245);
}

.n-button {
  padding: 0 4px;
}

.delete-label {
  margin-right: 4px;
}
</style>
