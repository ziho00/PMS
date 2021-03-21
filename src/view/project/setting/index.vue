<template>
  <a-card class="page-card" :bodyStyle="{ padding: '16px 0' }">
    <div class="project-settings-main">
      <a-menu
        :style="{ width: '224px', minHeight: '400px' }"
        v-model:openKeys="openKeys"
        v-model:selectedKeys="selectedKeys"
        mode="inline"
      >
        <a-menu-item key="info">项目信息</a-menu-item>
        <a-menu-item key="member">项目成员</a-menu-item>
      </a-menu>
      <div class="project-settings-container">
        <Info v-if="selectedKeys.includes('info')" />
        <Member v-if="selectedKeys.includes('member')" />
      </div>
    </div>
  </a-card>
</template>

<script lang="ts">
import { ref } from "vue";
import Info from "./info/index.vue";
import Member from "./members/index.vue";

export default {
  components: {
    Info,
    Member,
  },
  setup() {
    const openKeys = ref([]);
    const selectedKeys = ref(["info"]);

    return {
      openKeys,
      selectedKeys,
    };
  },
};
</script>

<style lang="scss" scoped>
.project-settings-main {
  display: flex;
  .project-settings-container {
    padding: 0 10px;
    width: calc(100% - 224px);
  }
}
</style>
