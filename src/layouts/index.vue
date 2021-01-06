<template>
  <a-layout
    id="components-layout-demo-custom-trigger"
    style="min-height: 100vh"
  >
    <a-layout-sider v-model:collapsed="collapsed" :trigger="null" collapsible>
      <div class="logo" />
      <Menu :menus="menus" />
    </a-layout-sider>
    <a-layout>
      <a-layout-header
        :style="{
          background: '#fff',
          padding: '0',
          boxShadow: '0 1px 4px 0 rgba(0, 21, 41, 0.08)',
        }"
      >
        <MenuUnfoldOutlined
          v-if="collapsed"
          class="trigger ant-pro-global-header-index-action"
          @click="toggleSetCollapsed"
        />
        <MenuFoldOutlined
          v-else
          class="trigger ant-pro-global-header-index-action"
          @click="toggleSetCollapsed"
        />
        <GobalHeader />
      </a-layout-header>
      <router-view />
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
import GobalHeader from "/@/components/GobalHeader/index.vue";
import Menu from "/@/components/Menu/index.vue";
import { ref, Ref, computed, onBeforeMount } from "vue";
import { useStore } from "vuex";
export default {
  components: {
    LaptopOutlined,
    ReadOutlined,
    SettingOutlined,
    MenuUnfoldOutlined,
    MenuFoldOutlined,
    GobalHeader,
    Menu,
  },
  setup() {
    const store = useStore();
    const collapsed = ref<boolean>(true);
    // 动态菜单
    const menus = computed(
      () =>
        (store.state.permission.asyncRoutes &&
          store.state.permission.asyncRoutes[0].children) ||
        []
    );

    const toggleSetCollapsed = () => {
      collapsed.value = !collapsed.value;
    };

    return {
      collapsed,
      toggleSetCollapsed,
      menus,
    };
  },
};
</script>

<style scoped>
#components-layout-demo-custom-trigger .trigger {
  font-size: 18px;
  line-height: 64px;
}

#components-layout-demo-custom-trigger .logo {
  height: 32px;
  background: rgba(255, 255, 255, 0.2);
  margin: 16px;
}
</style>
