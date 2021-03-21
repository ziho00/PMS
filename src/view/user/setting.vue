<template>
  <a-card class="page-card" :style="{ padding: '0 50px' }">
    <div style="width: 600px">
      <h2>基本信息</h2>
      <a-form
        layout="vertical"
        ref="form"
        :rules="rules"
        :model="formState"
        :label-col="labelCol"
        :wrapper-col="wrapperCol"
      >
        <a-form-item label="姓名" name="name">
          <a-input
            v-model:value="formState.name"
            placeholder="请输入真实姓名"
          />
        </a-form-item>
        <a-form-item label="联系方式" name="phone">
          <a-input
            v-model:value="formState.phone"
            placeholder="请输入联系方式"
          />
        </a-form-item>
        <a-form-item label="邮箱地址" name="email">
          <a-input
            v-model:value="formState.email"
            placeholder="请输入常用邮箱地址"
          />
        </a-form-item>
        <a-form-item>
          <a-button type="primary" @click="handleSubmit" :loading="submiting"
            >更新信息</a-button
          >
        </a-form-item>
      </a-form>
    </div>
    <a-upload
      v-model:file-list="fileList"
      name="avatar"
      list-type="picture-card"
      class="avatar-uploader"
      :show-upload-list="false"
      action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
      :before-upload="beforeUpload"
      @change="handleChange"
    >
      <img v-if="imageUrl" :src="formState.avatarUrl" alt="avatar" />
      <div v-else>
        <loading-outlined v-if="loading"></loading-outlined>
        <plus-outlined v-else></plus-outlined>
        <div class="ant-upload-text">选择头像</div>
      </div>
    </a-upload>
  </a-card>
</template>

<script>
import { useForm } from "./hook";
export default {
  setup() {
    const {
      labelCol,
      formState,
      loading,
      fileList,
      handleChange,
      beforeUpload,
      wrapperCol,
      handleSubmit,
      submiting,
      rules,
    } = useForm();

    return {
      rules,
      labelCol,
      formState,
      wrapperCol,
      handleSubmit,
      loading,
      fileList,
      handleChange,
      beforeUpload,
      submiting,
    };
  },
};
</script>

<style lang="scss" scoped>
.avatar-uploader {
  width: 125px;
  display: flex;
  position: absolute;
  top: 75px;
  right: 125px;
}
</style>
