<template>
  <a-dropdown v-if="user && user.name" placement="bottomRight">
    <span class="ant-pro-account-avatar">
      <a-avatar
        size="small"
        src="https://gw.alipayobjects.com/zos/antfincdn/XAosXuNZyF/BiazfanxmamNRoxxVxka.png"
        class="antd-pro-global-header-index-avatar"
      />
      <span class="avatar-name">{{ user.name }}</span>
    </span>
    <template v-slot:overlay>
      <a-menu class="ant-pro-drop-down menu" :selected-keys="[]">
        <a-menu-item v-if="menu" key="settings" @click="handleToSettings">
          <SettingOutlined />
          个人设置
        </a-menu-item>
        <a-menu-divider v-if="menu" />
        <a-menu-item key="logout" @click="handleLogout">
          <PoweroffOutlined />
          退出登录
        </a-menu-item>
      </a-menu>
    </template>
  </a-dropdown>
  <span v-else>
    <a-spin size="small" :style="{ marginLeft: 8, marginRight: 8 }" />
  </span>
</template>

<script>
import { Modal } from "ant-design-vue";
import { useRouter } from "vue-router";
import { useStore } from "vuex";
import { SettingOutlined, PoweroffOutlined } from "@ant-design/icons-vue";
export default {
  name: "AvatarDropdown",
  components: {
    SettingOutlined,
    PoweroffOutlined,
  },
  props: {
    user: {
      type: Object,
      default: () => null,
    },
    menu: {
      type: Boolean,
      default: true,
    },
  },
  setup() {
    const router = useRouter();
    const store = useStore();

    const handleToSettings = () => {
      router.push({ path: "/account/settings" });
    };
  
    const handleLogout = (e) => {
      Modal.confirm({
        title: "信息",
        content: "确定要退出登录吗?",
        onOk: () => {
          return new Promise((resolve, reject) => {
            store
              .dispatch("Logout")
              .then(() => {
                resolve();
                router.push({ path: "/login" });
              })
              .catch((err) => {
                reject(err);
              });
          });
        },
        onCancel() {},
      });
    };

    return {
      handleToSettings,
      handleLogout,
    };
  },
};
</script>

<style lang="scss" scoped>
.avatar-name {
  font-size: 12px;
  margin-left: 8px;
  min-width: 120px;
}
</style>
