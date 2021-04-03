<template>
  <a-card class="page-card" :bodyStyle="{ padding: '16px 0' }">
    <a-menu
      :style="{ width: '224px', minHeight: '400px' }"
      v-model:selectedKeys="selectedKeys"
      mode="inline"
    >
      <a-menu-item key="task">任务报表</a-menu-item>
      <a-menu-item key="requirement">需求报表</a-menu-item>
      <a-menu-item key="bug">缺陷报表</a-menu-item>
    </a-menu>
  </a-card>
</template>

<script lang="ts">
import { ref } from "vue";
export default {
  setup() {
    const selectedKeys = ref(["task"]);
    return {
      selectedKeys,
    };
  },
};
</script>

<style lang="scss" scoped></style>
