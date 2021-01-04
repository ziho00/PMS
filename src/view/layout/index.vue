<template>
  <a-layout
    id="components-layout-demo-custom-trigger"
    style="min-height: 100vh"
  >
    <a-layout-sider v-model:collapsed="collapsed" :trigger="null" collapsible>
      <div class="logo" />
      <a-menu theme="dark" v-model:selectedKeys="selectedKeys" mode="inline">
        <a-menu-item key="my_worktable">
          <LaptopOutlined />
          <span>工作台</span>
        </a-menu-item>
        <a-menu-item key="project">
          <ReadOutlined />
          <span>项目</span>
        </a-menu-item>
        <a-sub-menu key="setting">
          <template #title>
            <span> <SettingOutlined /><span>系统设置</span> </span>
          </template>
          <a-menu-item key="user_management">用户管理</a-menu-item>
          <a-menu-item key="role_management">角色管理</a-menu-item>
          <a-menu-item key="Authority_management">权限管理</a-menu-item>
          <a-menu-item key="system_info">公司信息设置</a-menu-item>
        </a-sub-menu>
      </a-menu>
    </a-layout-sider>
    <a-layout>
      <a-layout-header style="background: #fff; padding: 0">
        <MenuUnfoldOutlined
          v-if="collapsed"
          class="trigger"
          @click="toggleSetCollapsed"
        />
        <MenuFoldOutlined v-else class="trigger" @click="toggleSetCollapsed" />
        <GobalHeader />
      </a-layout-header>
      <a-layout-content style="margin: 0 16px">
        <div style="margin: 16px 0 0"></div>
        <a-card style="minheight: 360px"> home page </a-card>
      </a-layout-content>
      <a-layout-footer style="text-align: center">
        项目管理系统 ©2021 Created by Zeng Zihao
      </a-layout-footer>
    </a-layout>
  </a-layout>
</template>
<script lang="ts">
import {
  LaptopOutlined,
  ReadOutlined,
  SettingOutlined,
  MenuUnfoldOutlined,
  MenuFoldOutlined,
} from "@ant-design/icons-vue";
import GobalHeader from "../../components/GobalHeader/index.vue";
import { ref, Ref } from "vue";

export default {
  components: {
    LaptopOutlined,
    ReadOutlined,
    SettingOutlined,
    MenuUnfoldOutlined,
    MenuFoldOutlined,
    GobalHeader,
  },

  setup() {
    const collapsed = ref<boolean>(true);
    const selectedKeys = ref<Array<string | number>>(["1"]);

    const toggleSetCollapsed = () => {
      collapsed.value = !collapsed.value;
    };

    return {
      collapsed,
      selectedKeys,
      toggleSetCollapsed,
    };
  },
};
</script>

<style scoped>
#components-layout-demo-custom-trigger .trigger {
  font-size: 18px;
  line-height: 64px;
  padding: 0 24px;
  cursor: pointer;
  transition: color 0.3s;
}

#components-layout-demo-custom-trigger .trigger:hover {
  color: #1890ff;
}

#components-layout-demo-custom-trigger .logo {
  height: 32px;
  background: rgba(255, 255, 255, 0.2);
  margin: 16px;
}
</style>
