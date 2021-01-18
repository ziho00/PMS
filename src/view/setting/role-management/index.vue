<template>
  <a-page-header
    style="border: 1px solid rgb(235, 237, 240)"
    title="角色管理"
    :breadcrumb="{ routes }"
  />
  <a-card class="page-card"> 角色管理 </a-card>
</template>

<script lang="ts">
const routes = [
  {
    path: "/",
    breadcrumbName: "主页",
  },
  {
    path: "/setting",
    breadcrumbName: "设置",
  },
  {
    path: "/role",
    breadcrumbName: "角色管理",
  },
];
export default {
  setup() {
    return {
      routes,
    };
  },
};
</script>

<style></style>
