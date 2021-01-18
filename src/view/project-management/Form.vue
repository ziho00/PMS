<template>
  <a-form
    :rules="rules"
    ref="ruleForm"
    :model="projectInfo"
    :label-col="{ span: 5 }"
    :wrapper-col="{ span: 16 }"
  >
    <a-form-item ref="logo" label="项目 LOGO" name="logo">
      <a-upload
        v-model:fileList="projectInfo.logoFile"
        name="avatar"
        list-type="picture-card"
        class="avatar-uploader"
        :show-upload-list="false"
        action=""
        :before-upload="beforeUpload"
        @change="handleChange"
      >
        <img
          v-if="projectInfo.logoUrl"
          :src="projectInfo.logoUrl"
          alt="avatar"
        />
        <div v-else>
          <loading-outlined v-if="uploading" />
          <plus-outlined v-else />
          <div class="ant-upload-text">选择图片</div>
        </div>
      </a-upload>
    </a-form-item>
    <a-form-item required ref="name" label="项目名" name="name">
      <a-input v-model:value="projectInfo.name" placeholder="请输入项目名称" />
    </a-form-item>
    <a-form-item required ref="planDate" label="项目日期" name="planDate">
      <a-range-picker
        :disabled-date="disabledDate"
        v-model:value="projectInfo.planDate"
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
    <a-form-item ref="desc" label="项目描述" name="desc">
      <a-textarea
        v-model:value="projectInfo.desc"
        placeholder="请输入项目描述"
        :rows="4"
      />
    </a-form-item>
  </a-form>
</template>

<script lang="ts">
import { PlusOutlined, LoadingOutlined } from "@ant-design/icons-vue";
import { reactive, ref } from "vue";
import moment from "moment";

export default {
  components: {
    PlusOutlined,
    LoadingOutlined,
  },
  setup() {
    const projectInfo = reactive({
      logoFile: null,
      logoUrl: "",
      name: "",
      desc: "",
      planDate: [],
    });

    const uploading = ref<boolean>(false);

    const disabledDate = (current) => {
      return current && current <= moment().endOf("day");
    };

    const handleChange = (info) => {
      console.log(info);
    };

    const beforeUpload = (file) => {
      console.log(file);
    };

    const checkDate = async (rule, value) => {
      if (value.length >> 0 === 0) {
        return Promise.reject("请选择项目计划日期");
      } else {
        return Promise.resolve();
      }
    };

    const rules = {
      name: [
        {
          required: true,
          message: "请输入项目名称",
          trigger: "blur",
        },
        {
          min: 3,
          max: 32,
          message: "长度应在3到32之间",
          trigger: "blur",
        },
      ],
      planDate: [{ validator: checkDate, trigger: "blur" }],
    };

    return {
      projectInfo,
      moment,
      disabledDate,
      uploading,
      handleChange,
      beforeUpload,
      rules,
    };
  },
};
</script>

<style scoped>
.avatar-uploader {
  margin-left: 15px;
}
.avatar-uploader > .ant-upload {
  width: 128px;
  height: 128px;
}
.ant-upload-select-picture-card i {
  font-size: 32px;
  color: #999;
}

.ant-upload-select-picture-card .ant-upload-text {
  margin-top: 8px;
  color: #666;
}
</style>
