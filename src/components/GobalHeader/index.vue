<template>
  <div class="ant-pro-global-header-index-right">
    <AvatarDropdown :menu="showMenu" :user="userInfo" :class="prefixCls" />
  </div>
</template>

<script lang="ts">
import AvatarDropdown from "./AvatarDropdownView.vue";
import { onMounted, ref, reactive } from "vue";
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
    const userInfo = reactive({
      name: "",
    });

    userInfo.name = store.state.user.userInfo?.username;

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
    padding: 0 12px;
    cursor: pointer;
    -webkit-transition: all 0.3s;
    transition: all 0.3s;

    box-sizing: border-box;

    &:hover {
      background: rgba(0, 0, 0, 0.025);
    }
  }
}
</style>
