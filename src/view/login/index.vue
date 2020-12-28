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
          <a-input
            :style="{ fontSize: '20px' }"
            v-model:value="accountInfo.password"
            type="password"
            placeholder="请输入登录密码"
            @focus="clearTips"
          >
            <template #prefix
              ><LockOutlined style="color: rgba(0, 0, 0, 0.25)"
            /></template>
          </a-input>
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
      <a-button type="link">注册账号</a-button>
      <a-button :style="{ float: 'right', padding: 0 }" type="link"
        >忘记密码?</a-button
      >
    </div>
  </div>
  <div class="login_bg"></div>
</template>

<script lang="ts">
import { reactive, ref, getCurrentInstance } from "vue";
import { UserOutlined, LockOutlined } from "@ant-design/icons-vue";
import { message } from "ant-design-vue";
export default {
  components: {
    UserOutlined,
    LockOutlined,
  },
  setup() {
    const accountInfo = reactive({ account: "", password: "" });
    const errorTips = ref<string>("");
    const vm = getCurrentInstance();

    const handleSubmit = (e) => {
      console.log(accountInfo.account, accountInfo.password);
    };

    const clearTips = () => {
      errorTips.value = "";
    };

    return {
      accountInfo,
      handleSubmit,
      errorTips,
      clearTips,
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
  position: absolute;
  min-width: 1200px;
  z-index: -10;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background: url("/@public/images/login-page-background.png") no-repeat;
}
</style>
