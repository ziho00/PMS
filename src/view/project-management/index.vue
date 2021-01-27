<template>
  <a-page-header
    style="border: 1px solid rgb(235, 237, 240)"
    title="项目列表"
    :breadcrumb="{ routes }"
  >
  </a-page-header>
  <a-card :bordered="false" :style="{ margin: '24px' }">
    <z-query-form
      :model="queryFormData"
      @onSearch="handleSearch"
      @onReset="handleReset"
      :searching="queryLoading.search"
      :reseting="queryLoading.reset"
    >
      <z-query-form-item label="项目名称">
        <a-input
          v-model:value="queryFormData.projectName"
          placeholder="项目名称关键字"
        />
      </z-query-form-item>
      <z-query-form-item label="创建人">
        <a-input
          v-model:value="queryFormData.createUserName"
          placeholder="创建人姓名"
        />
      </z-query-form-item>
    </z-query-form>
  </a-card>

  <div>
    <a-list
      :style="{ padding: '0 24px' }"
      :loading="loading"
      :data-source="data"
      :grid="{ gutter: 24, xl: 4, lg: 3, md: 3, sm: 2, xs: 1 }"
    >
      <template #renderItem="{ item }">
        <a-list-item v-if="!item || item.project_id === undefined">
          <a-button @click="handleCreateProject" class="new-btn" type="dashed">
            <PlusOutlined />
            新增项目
          </a-button>
        </a-list-item>
        <a-list-item v-else>
          <a-card hoverable @click="toProjectPage(item)">
            <template #cover>
              <div
                class="project-logo"
                :style="{ backgroundImage: `url(${item.picUrl})` }"
              />
            </template>
            <a-card-meta :title="item.name">
              <template #description>
                <div :style="{ height: '44px' }">
                  <ellipsis :length="64">{{ item.desc }}</ellipsis>
                </div>
              </template>
            </a-card-meta>
          </a-card>
        </a-list-item>
      </template>
    </a-list>
  </div>

  <!-- model -->
  <a-modal
    title="创建项目"
    width="650px"
    v-model:visible="visible"
    :confirm-loading="confirmLoading"
    @ok="handleSubmit"
  >
    <a-form
      :rules="rules"
      ref="projectForm"
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
        <a-input
          v-model:value="projectInfo.name"
          placeholder="请输入项目名称"
        />
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
  </a-modal>
</template>

<script lang="ts">
import { reactive, ref, onBeforeMount, getCurrentInstance } from "vue";
import { useRouter } from "vue-router";
import ZQueryForm from "/@/components/QueryForm/index.vue";
import ZQueryFormItem from "/@/components/QueryForm/QueryFormItem.vue";
import Ellipsis from "/@/components/Ellipsis/index.vue";
import { PlusOutlined, LoadingOutlined } from "@ant-design/icons-vue";
import { api } from "/@/http/api";
import { useModal, useQueryForm, useForm } from "./hooks";

const routes = [
  {
    path: "/",
    breadcrumbName: "主页",
  },
  {
    path: "/project",
    breadcrumbName: "项目列表",
  },
];

export default {
  components: {
    ZQueryForm,
    ZQueryFormItem,
    Ellipsis,
    PlusOutlined,
    LoadingOutlined,
  },
  setup() {
    const vm = getCurrentInstance();
    const router = useRouter();

    const {
      queryLoading,
      queryFormData,
      handleSearch,
      handleReset,
    } = useQueryForm();

    const { visible, confirmLoading } = useModal();

    const {
      rules,
      projectInfo,
      beforeUpload,
      handleChange,
      disabledDate,
      uploading,
      moment,
    } = useForm();

    const loading = ref<boolean>(false);
    const data = ref<Array<any>>([]);

    onBeforeMount(() => {
      getProjects();
    });

    // 获取项目列表
    const getProjects = async () => {
      console.log(queryFormData);
      const res = await api.project.getProjects();
      data.value = [{}].concat(res.data);
      console.log(res.data);
    };

    // 创建项目
    const handleCreateProject = () => {
      visible.value = true;
    };

    // 跳转到项目页
    const toProjectPage = (record) => {
      router.push(`/${record.project_id}`);
    };

    // 提交创建
    const handleSubmit = () => {
      confirmLoading.value = true;
      const formData = projectInfo;
      const form = vm.refs.projectForm as any;
      console.log(formData);
      setTimeout(() => {
        confirmLoading.value = false;
        form.resetFields();
        visible.value = false;
      }, 1000);
    };

    return {
      queryFormData,
      routes,
      handleSearch,
      handleReset,
      queryLoading,
      loading,
      data,
      handleCreateProject,
      visible,
      confirmLoading,
      handleSubmit,
      toProjectPage,
      rules,
      projectInfo,
      beforeUpload,
      handleChange,
      disabledDate,
      uploading,
      moment,
    };
  },
};
</script>

<style>
.form-item-label {
  line-height: 32px;
  padding-right: 8px;
  width: auto;
}
.project-logo {
  height: 240px;
  overflow: hidden;
  background-position: center center;
  background-repeat: no-repeat;
  -webkit-background-size: cover;
  -moz-background-size: cover;
  background-size: cover;
}
.new-btn {
  background-color: #fff;
  border-radius: 2px;
  width: 100%;
  height: 200px;
}
</style>
