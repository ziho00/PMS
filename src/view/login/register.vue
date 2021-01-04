<template>
  <a-modal
    title="注册账号"
    :visible="showRegisterModal"
    :confirm-loading="loading"
    @ok="handleSubmit"
    @cancel="handleCancel"
  >
    <a-form
      name="register-form"
      ref="registerForm"
      :model="userInfo"
      :rules="rules"
      v-bind="layout"
    >
      <a-form-item required label="姓名" name="name">
        <a-input v-model:value="userInfo.name" type="text" autocomplete="off" />
      </a-form-item>
      <a-form-item required label="手机号码" name="phone">
        <a-input
          v-model:value="userInfo.phone"
          type="text"
          autocomplete="off"
        />
      </a-form-item>
      <a-form-item required label="邮箱" name="email">
        <a-input
          v-model:value="userInfo.email"
          type="email"
          autocomplete="off"
        />
      </a-form-item>
      <a-form-item required label="密码" name="password">
        <a-input-password
          v-model:value="userInfo.password"
          type="password"
          autocomplete="off"
        />
      </a-form-item>
      <a-form-item required label="确认密码" name="checkPassword">
        <a-input-password
          v-model:value="userInfo.checkPassword"
          type="password"
          autocomplete="off"
        />
      </a-form-item>
    </a-form>
  </a-modal>
</template>

<script lang="ts">
import { reactive, ref, getCurrentInstance } from "vue";
import { message } from "ant-design-vue";
import { FormProps } from "ant-design-vue/lib/form/Form";
export default {
  props: {
    showRegisterModal: {
      type: Boolean,
      default: false,
    },
  },
  setup(props) {
    const loading = ref<boolean>(false);
    const userInfo = reactive({
      phone: "",
      email: "",
      password: "",
      checkPassword: "",
      name: "",
    });

    /**
     * 校验名称
     */
    const checkName = async (rule, value: string) => {
      if (!value) {
        return Promise.reject("请输入姓名");
      }
      const validNameReg = /^[\u4E00-\u9FA5|a-z|A-Z|\s]+$/;
      if (!validNameReg.test(value)) {
        return Promise.reject("该姓名不合法，请输入正确的姓名");
      }
      return Promise.resolve();
    };

    /**
     * 校验手机号码
     */
    const checkPhone = async (rule, value: string) => {
      if (!value) {
        return Promise.reject("请输入手机号码");
      }
      const validPhoneReg = /^1[3|5|7|8]\d{9}$/g;
      if (value.length !== 11 || !validPhoneReg.test(value)) {
        return Promise.reject("请输入正确的手机号码");
      }
      return Promise.resolve();
    };

    /**
     * 校验邮箱地址
     */
    const checkEmail = async (rule, value: string) => {
      if (!value) {
        return Promise.reject("请输入邮箱地址");
      }
      const validEmailReg = /^[a-z0-9]+([._\\-]*[a-z0-9])*@([a-z0-9]+[-a-z0-9]*[a-z0-9]+.){1,63}[a-z0-9]+$/g;
      if (!validEmailReg.test(value)) {
        return Promise.reject("请输入正确的邮箱地址");
      }
      return Promise.resolve();
    };

    /**
     * 校验密码
     */
    const validatePassword = async (rule, value) => {
      if (!value) {
        return Promise.reject("请输入账号密码");
      }
      if (userInfo.checkPassword !== "") {
        (vm.refs.registerForm as any).validateField("checkPassword");
      }
      return Promise.resolve();
    };

    /**
     * 校验再次输入密码
     */
    const checkPassword = async (rule, value) => {
      if (!value) {
        return Promise.reject("请再次输入账号密码");
      }
      if (value !== userInfo.password) {
        return Promise.reject("输入的密码不一致");
      }
      return Promise.resolve();
    };

    // 当前 vue 实例
    const vm = getCurrentInstance();

    /**
     * 提交注册信息
     */
    const handleSubmit = () => {
      (vm.refs.registerForm as any)
        .validate()
        .then(() => {
          loading.value = true;
          setTimeout(() => {
            loading.value = false;
            message.success("注册成功");
            vm.emit("setShowRegisterModalState", false);
            (vm.refs.registerForm as any).resetFields();
          }, 1000);
        })
        .catch((error) => {
          console.log(error);
        });
    };

    /**
     * 取消注册
     */
    const handleCancel = () => {
      (vm.refs.registerForm as any).resetFields();
      vm.emit("setShowRegisterModalState", false);
    };

    const rules = {
      name: [{ validator: checkName, trigger: "change" }],
      phone: [{ validator: checkPhone, trigger: "change" }],
      email: [{ validator: checkEmail, trigger: "change" }],
      password: [{ validator: validatePassword, trigger: "change" }],
      checkPassword: [{ validator: checkPassword, trigger: "change" }],
    };

    const layout = {
      labelCol: { span: 7 },
      wrapperCol: { span: 14 },
    };

    return {
      loading,
      handleSubmit,
      handleCancel,
      rules,
      userInfo,
      layout,
    };
  },
};
</script>

<style lang="scss"></style>
