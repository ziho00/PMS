<template>
  <div class="login-view">
    <div class="login-form">
      <div class="welcome">欢迎使用 PMS</div>
      <div class="error-tips">{{ errorTips }}</div>
      <a-form layout="vertical" :model="accountInfo" @submit="handleSubmit">
        <a-form-item>
          <a-input
            :style="{ fontSize: '20px' }"
            v-model:value="accountInfo.account"
            placeholder="请输入邮箱或账号"
            @focus="clearTips"
          >
            <template #prefix
              ><UserOutlined style="color: rgba(0, 0, 0, 0.25)"
            /></template>
          </a-input>
        </a-form-item>
        <a-form-item>
          <a-input-password
            :style="{ fontSize: '20px' }"
            v-model:value="accountInfo.password"
            type="password"
            placeholder="请输入登录密码"
            @focus="clearTips"
          >
            <template #prefix
              ><LockOutlined style="color: rgba(0, 0, 0, 0.25)"
            /></template>
          </a-input-password>
        </a-form-item>
        <a-form-item>
          <a-button
            type="primary"
            html-type="submit"
            :disabled="
              accountInfo.account === '' || accountInfo.password === ''
            "
            :style="{ width: '100%', height: '40px' }"
            >登录</a-button
          >
        </a-form-item>
      </a-form>
    </div>
    <div class="regester-tip">
      还没有账号?
      <a-button type="link" @click="handleRegister">注册账号</a-button>
      <!-- <a-button :style="{ float: 'right', padding: 0 }" type="link"
        >忘记密码?</a-button
      > -->
    </div>
  </div>
  <div class="login_bg"></div>
  <SVGImage1 class="svg_image1" />
  <RegisterModal
    :showRegisterModal="showRegisterModal"
    @setShowRegisterModalState="setShowRegisterModalState"
  />
</template>

<script lang="ts">
import SVGImage1 from "./svg_image1.vue";
import RegisterModal from "./register.vue";
import { reactive, ref, getCurrentInstance } from "vue";
import { UserOutlined, LockOutlined } from "@ant-design/icons-vue";
import { notification } from "ant-design-vue";
import { useStore } from "vuex";
import { useRouter } from "vue-router";
import { getTimeZone } from "/@/utils";
export default {
  components: {
    UserOutlined,
    LockOutlined,
    SVGImage1,
    RegisterModal,
  },
  setup() {
    const accountInfo = reactive({ account: "", password: "" });
    const errorTips = ref<string>("");
    const showRegisterModal = ref<boolean>(false);
    const vm = getCurrentInstance();
    const store = useStore();
    const router = useRouter();

    const handleSubmit = () => {
      store
        .dispatch("Login", {
          account: accountInfo.account,
          password: accountInfo.password,
        })
        .then((res) => {
          const time = new Date().getHours();
          notification.success({
            message: `欢迎`,
            description: `${getTimeZone()}好,欢迎回来`,
          });
          router.push("/");
        })
        .catch((err) => {
          errorTips.value = err.msg;
        });
    };

    const clearTips = () => {
      errorTips.value = "";
    };

    const handleRegister = () => {
      setShowRegisterModalState(true);
    };

    const setShowRegisterModalState = (val: boolean) => {
      showRegisterModal.value = val;
    };

    return {
      accountInfo,
      handleSubmit,
      errorTips,
      clearTips,
      showRegisterModal,
      handleRegister,
      setShowRegisterModalState,
    };
  },
};
</script>

<style lang="scss" scoped>
.login-view {
  overflow: hidden;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, calc(-50% - 100px));
  margin: auto;
  background: #fff;
  border-radius: 2px;
  box-shadow: 2px 2px 12px 0 rgba($color: #000000, $alpha: 0.1),
    2px 2px 16px 0 rgba($color: #000000, $alpha: 0.08);

  .login-form {
    width: 400px;
    padding: 15px 25px;

    .welcome {
      margin-top: 25px;
      font-weight: 500;
      font-size: 26px;
      line-height: 30px;
    }

    .ant-form-item {
      margin-bottom: 15px;
    }

    .error-tips {
      height: 35px;
      line-height: 35px;
      color: #ff4d4f;
    }
  }
  .regester-tip {
    padding: 10px 25px;
    background: #f1f5f8;
    font-size: 14px;
  }
}
.ant-form-vertical .ant-form-item {
  padding-bottom: 0;
}
.login_bg {
  overflow: hidden;
  position: absolute;
  min-width: 1200px;
  z-index: -10;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background: url("/@public/images/login-page-background.png") no-repeat;
}
.svg_image1 {
  overflow: hidden;
  position: absolute;
  width: 500px;
  height: 500px;
  right: 100px;
  bottom: 50px;
  z-index: -8;
}
</style>
