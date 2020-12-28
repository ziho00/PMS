<template>
  <a-config-provider :locale="local">
    <router-view />
  </a-config-provider>
</template>

<script>
import zhCN from "ant-design-vue/es/locale/zh_CN";
export default {
  name: "App",
  setup() {
    return {
      local: zhCN,
    };
  },
};
</script>
