<template>
  <a-page-header
    style="border: 1px solid rgb(235, 237, 240)"
    title="权限项管理"
    :breadcrumb="{ routes }"
  />
  <a-card class="page-card">
    <!-- query form -->
    <z-query-form
      :model="queryFormData"
      @onSearch="handleSearch"
      @onReset="handleReset"
      :searching="queryLoading.search"
      :reseting="queryLoading.reset"
    >
      <z-query-form-item label="权限项名称">
        <a-input v-model:value="queryFormData.name" placeholder="权限项名称" />
      </z-query-form-item>
    </z-query-form>

    <!-- create & delete operator -->
    <div class="table-operator">
      <a-button @click="handleCreateAuthorytyItem" type="primary"
        ><PlusOutlined /> 创建</a-button
      >
      <a-button
        @click="handleDeleteAuthorytyItems"
        :style="{ marginLeft: '24px' }"
        type="danger"
      >
        删除</a-button
      >
    </div>

    <!-- table -->
    <a-table
      :columns="columns"
      :data-source="dataSource"
      :pagination="pagination"
      :loading="loading"
      rowKey="authority_id"
      @change="handleTableChange"
      :row-selection="{
        selectedRowKeys: selectedRowKeys,
        onChange: onSelectChange,
      }"
    >
      <template #token="{ text }">
        <a-tag>{{ text }}</a-tag>
      </template>
      <template #operation="{ record }">
        <a-button type="link" @click="handleEdit(record)">编辑</a-button>
        <span style="color: var(--remark-color)">|</span>
        <a-popconfirm
          title="确认删除？"
          ok-text="是"
          cancel-text="否"
          @confirm="handleDeleteAuthorytyItem(record)"
        >
          <a-button type="link"> 删除 </a-button>
        </a-popconfirm>
      </template>
    </a-table>
  </a-card>

  <!-- 创建/编辑 Form -->
  <a-modal
    :title="
      isEdit ? `编辑权限项【${authorityItem.authority_id}】` : '创建权限项'
    "
    width="500px"
    v-model:visible="visible"
    :confirm-loading="confirmLoading"
    @ok="handleSubmit"
  >
    <a-form
      ref="userForm"
      :model="authorityItem"
      :label-col="{ span: 5 }"
      :wrapper-col="{ span: 16 }"
    >
      <a-form-item v-if="isEdit" label="ID" name="user_id">
        <a-input v-model:value="authorityItem.authority_id" disabled />
      </a-form-item>
      <a-form-item label="名称" name="name">
        <a-input v-model:value="authorityItem.name" placeholder="权限项名称" />
      </a-form-item>
      <a-form-item label="秘钥" name="token">
        <a-input v-model:value="authorityItem.token" placeholder="权限项秘钥" />
      </a-form-item>
    </a-form>
  </a-modal>
</template>

<script lang="ts">
import { reactive, ref, onBeforeMount, createVNode } from "vue";
import ZQueryForm from "/@/components/QueryForm/index.vue";
import ZQueryFormItem from "/@/components/QueryForm/QueryFormItem.vue";
import { api } from "/@/http/api";
import { useForm, useModal, useQueryForm, useTable } from "./hooks";
import { Modal } from "ant-design-vue";
import {
  PlusOutlined,
  DeleteOutlined,
  ExclamationCircleOutlined,
} from "@ant-design/icons-vue";
const routes = [
  {
    path: "/",
    breadcrumbName: "主页",
  },
  {
    path: "/setting",
    breadcrumbName: "设置",
  },
  {
    path: "/role",
    breadcrumbName: "权限项管理",
  },
];
export default {
  name: "AuthorityManagement",
  components: {
    ZQueryForm,
    ZQueryFormItem,
    PlusOutlined,
    DeleteOutlined,
  },
  setup() {
    const { queryFormData, queryLoading } = useQueryForm();

    const {
      columns,
      dataSource,
      loading,
      pagination,
      selectedRowKeys,
      onSelectChange,
      handleTableChange,
      refresh,
    } = useTable(queryFormData);

    const {
      visible,
      confirmLoading,
      selectorLoading,
      authorityItem,
      isEdit,
      handleSubmit,
    } = useModal();

    const {} = useForm();

    onBeforeMount(async () => {
      await refresh();
    });

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
      queryFormData.name = "";
      console.log(queryFormData);
      setTimeout(() => {
        queryLoading.reset = false;
      }, 1000);
    };

    // 创建
    const handleCreateAuthorytyItem = () => {
      Object.keys(authorityItem).map((key) => {
        authorityItem[key] = "";
      });
      visible.value = true;
      isEdit.value = false;
    };

    // 批量删除
    const handleDeleteAuthorytyItems = () => {
      Modal.confirm({
        title: "确定删除选中的权限项?",
        icon: createVNode(ExclamationCircleOutlined),
        onOk: async () => {
          console.log(selectedRowKeys.value);
        },
      });
    };

    // 单独删除
    const handleDeleteAuthorytyItem = (record) => {
      console.log(record);
      // todo
    };

    // 点击编辑
    const handleEdit = (record) => {
      isEdit.value = true;
      Object.keys(authorityItem).map((key) => {
        authorityItem[key] = record[key];
      });
      visible.value = true;
    };

    return {
      routes,
      queryFormData,
      queryLoading,
      handleSearch,
      handleReset,
      columns,
      dataSource,
      loading,
      pagination,
      handleTableChange,
      refresh,
      selectedRowKeys,
      onSelectChange,
      handleCreateAuthorytyItem,
      handleEdit,
      handleDeleteAuthorytyItems,
      handleDeleteAuthorytyItem,
      visible,
      confirmLoading,
      selectorLoading,
      authorityItem,
      isEdit,
      handleSubmit,
    };
  },
};
</script>

<style></style>
