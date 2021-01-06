<template>
  <div class="ant-pro-global-header-index-right">
    <AvatarDropdown :menu="showMenu" :user="userInfo" :class="prefixCls" />
  </div>
</template>

<script lang="ts">
import AvatarDropdown from "./AvatarDropdownView.vue";
import { onMounted, ref, reactive, computed } from "vue";
import { useStore } from "vuex";
export default {
  name: "RightContent",
  components: {
    AvatarDropdown,
  },
  props: {
    prefixCls: {
      type: String,
      default: "ant-pro-global-header-index-action",
    },
    isMobile: {
      type: Boolean,
      default: () => false,
    },
  },
  setup() {
    const store = useStore();
    const showMenu = ref<boolean>(true);
    const userInfo = computed(() => store.state.user.userInfo);

    return {
      showMenu,
      userInfo,
    };
  },
};
</script>

<style lang="scss" scoped>
.ant-pro-global-header-index-right {
  float: right;
  height: 100%;
  margin-left: auto;
  overflow: hidden;
  margin-right: 8px;
  .ant-pro-global-header-index-action {
    display: inline-block;
    height: 100%;
  }
}
</style>
