<template>
  <div style="padding: 0 25px">
    <div style="width: 600px">
      <h2>项目信息</h2>
      <a-form
        layout="vertical"
        ref="form"
        :rules="rules"
        :model="formState"
        :label-col="labelCol"
        :wrapper-col="wrapperCol"
      >
        <a-form-item label="项目名" name="name">
          <a-input
            v-model:value="formState.name"
            placeholder="请输入真实姓名"
          />
        </a-form-item>
        <a-form-item required ref="planDate" label="项目日期" name="planDate">
          <a-range-picker
            :disabled-date="disabledDate"
            v-model:value="formState.planDate"
            :show-time="{
              hideDisabledOptions: true,
              defaultValue: [
                moment('00:00:00', 'HH:mm:ss'),
                moment('23:59:59', 'HH:mm:ss'),
              ],
            }"
            format="YYYY-MM-DD HH:mm:ss"
          />
        </a-form-item>
        <a-form-item label="项目描述" name="desc">
          <a-textarea
            v-model:value="formState.desc"
            placeholder="请输入项目描述"
            :rows="4"
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
        <div class="ant-upload-text">选择项目 LOGO</div>
      </div>
    </a-upload>
  </div>
</template>

<script>
import { useForm } from "./hook";
export default {
  setup() {
    const {
      loading,
      fileList,
      labelCol,
      wrapperCol,
      handleSubmit,
      formState,
      handleChange,
      disabledDate,
      beforeUpload,
      submiting,
      rules,
      moment,
    } = useForm();

    return {
      loading,
      fileList,
      labelCol,
      wrapperCol,
      handleSubmit,
      formState,
      handleChange,
      disabledDate,
      beforeUpload,
      submiting,
      rules,
      moment,
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
