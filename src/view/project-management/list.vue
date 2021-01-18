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
          placeholder="项目名称"
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
    <ModalForm ref="modalForm"></ModalForm>
  </a-modal>
</template>

<script lang="ts">
import { reactive, ref, onBeforeMount, getCurrentInstance } from "vue";
import ZQueryForm from "/@/components/QueryForm/index.vue";
import ZQueryFormItem from "/@/components/QueryForm/QueryFormItem.vue";
import Ellipsis from "/@/components/Ellipsis/index.vue";
import ModalForm from "./Form.vue";
import { PlusOutlined } from "@ant-design/icons-vue";
import { api } from "/@/http/api";
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
    ModalForm,
  },
  setup() {
    const vm = getCurrentInstance();

    const queryFormData = reactive({ projectName: "", createUserName: "" });
    const queryLoading = reactive({ search: false, reset: false });

    const loading = ref<boolean>(false);
    const data = ref<Array<any>>([]);
    const visible = ref<boolean>(false);
    const confirmLoading = ref<boolean>(false);

    onBeforeMount(() => {
      getProjects();
    });

    const getProjects = async () => {
      console.log(queryFormData);
      const res = await api.project.getProjects();
      data.value = [{}].concat(res.data);
      console.log(res.data);
    };

    // 查询项目
    const handleSearch = (formData) => {
      queryLoading.search = true;
      console.log(formData);
      setTimeout(() => {
        queryLoading.search = false;
      }, 1000);
    };

    // 重置搜索表单数据
    const handleReset = () => {
      queryLoading.reset = true;
      queryFormData.projectName = "";
      queryFormData.createUserName = "";
      console.log(queryFormData);
      setTimeout(() => {
        queryLoading.reset = false;
      }, 1000);
    };

    // 创建项目
    const handleCreateProject = () => {
      visible.value = true;
    };

    // 提交创建
    const handleSubmit = () => {
      confirmLoading.value = true;
      const formData = (vm.refs.modalForm as any).projectInfo;
      const form = (vm.refs.modalForm as any).$refs.ruleForm;
      console.log(formData);
      setTimeout(() => {
        confirmLoading.value = false;
        form.resetFields();
        visible.value = false;
      }, 1000);
    };

    // 跳转到项目页
    const toProjectPage = (record) => {
      console.log(record);
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
