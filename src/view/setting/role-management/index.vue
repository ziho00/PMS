<template>
  <a-page-header
    style="border: 1px solid rgb(235, 237, 240)"
    title="角色管理"
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
      <z-query-form-item label="角色名称">
        <a-input
          v-model:value="queryFormData.name"
          placeholder="角色名称关键字"
        />
      </z-query-form-item>
    </z-query-form>

    <!-- create & delete operator -->
    <div class="table-operator">
      <a-button @click="handleCreateItem" type="primary"
        ><PlusOutlined /> 创建</a-button
      >
      <a-button
        @click="handleDeleteItems"
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
      rowKey="role_id"
      @change="handleTableChange"
      :row-selection="{
        selectedRowKeys: selectedRowKeys,
        onChange: onSelectChange,
      }"
    >
      <template #operation="{ record }">
        <a-button type="link" size="small" @click="handleEdit(record)"
          >编辑</a-button
        >
        <span style="color: var(--remark-color)">|</span>
        <a-popconfirm
          title="确认删除？"
          ok-text="是"
          cancel-text="否"
          @confirm="handleDeleteItem(record)"
        >
          <a-button type="link" size="small"> 删除 </a-button>
        </a-popconfirm>
      </template>
    </a-table>
  </a-card>

  <!-- 创建/编辑 Form -->
  <a-modal
    :title="isEdit ? `编辑角色【${role.role_id}】` : '创建角色'"
    width="500px"
    v-model:visible="visible"
    :confirm-loading="confirmLoading"
    @ok="handleSubmit"
  >
    <a-form
      ref="roleForm"
      :rules="rules"
      :model="role"
      :label-col="{ span: 5 }"
      :wrapper-col="{ span: 16 }"
    >
      <a-form-item v-if="isEdit" label="ID" name="role_id">
        <a-input v-model:value="role.role_id" disabled />
      </a-form-item>
      <a-form-item label="名称" name="role_name">
        <a-input v-model:value="role.role_name" placeholder="角色名称" />
      </a-form-item>
      <a-form-item label="角色权限" name="promission">
        <a-checkbox-group
          v-model:value="role.promission"
          :options="authorityItems"
        />
      </a-form-item>
    </a-form>
  </a-modal>
</template>

<script lang="ts">
import { onBeforeMount, createVNode, ref } from "vue";
import { useModal, useTable, useQueryForm, useForm } from "./hooks";
import { Modal } from "ant-design-vue";
import { ExclamationCircleOutlined, PlusOutlined } from "@ant-design/icons-vue";
import ZQueryForm from "/@/components/QueryForm/index.vue";
import ZQueryFormItem from "/@/components/QueryForm/QueryFormItem.vue";
import { api } from "/@/http/api";

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
    breadcrumbName: "角色管理",
  },
];

export default {
  components: {
    ZQueryForm,
    ZQueryFormItem,
    PlusOutlined,
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
      role,
      visible,
      confirmLoading,
      selectorLoading,
      isEdit,
      handleSubmit,
    } = useModal();

    const { rules } = useForm();

    const authorityItems = ref<Array<any>>([]);

    onBeforeMount(async () => {
      await refresh();
      await getAuthorityItems();
    });

    const getAuthorityItems = async () => {
      const res = await api.authorityManagement.getAuthoritys();
      authorityItems.value = res.data.data.map((authority) => ({
        label: authority.name,
        value: authority.token,
      }));
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
      queryFormData.name = "";
      console.log(queryFormData);
      setTimeout(() => {
        queryLoading.reset = false;
      }, 1000);
    };

    // 创建
    const handleCreateItem = () => {
      Object.keys(role).map((key) => {
        role[key] = "";
      });
      visible.value = true;
      isEdit.value = false;
      console.log(authorityItems.value);
    };

    // 批量删除
    const handleDeleteItems = () => {
      Modal.confirm({
        title: "确定删除选中的权限项?",
        icon: createVNode(ExclamationCircleOutlined),
        onOk: async () => {
          console.log(selectedRowKeys.value);
        },
      });
    };

    // 单独删除
    const handleDeleteItem = (record) => {
      console.log(record);
      // todo
    };

    // 点击编辑
    const handleEdit = (record) => {
      isEdit.value = true;
      Object.keys(role).map((key) => {
        role[key] = record[key];
      });
      visible.value = true;
    };

    return {
      routes,
      queryFormData,
      queryLoading,
      handleSearch,
      handleReset,
      handleCreateItem,
      handleDeleteItems,
      handleDeleteItem,
      handleEdit,
      columns,
      dataSource,
      loading,
      pagination,
      selectedRowKeys,
      onSelectChange,
      handleTableChange,
      refresh,
      role,
      visible,
      confirmLoading,
      selectorLoading,
      isEdit,
      handleSubmit,
      authorityItems,
      rules,
    };
  },
};
</script>

<style></style>
