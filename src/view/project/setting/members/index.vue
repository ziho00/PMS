<template>
  <z-query-form
    :model="queryFormData"
    @onSearch="handleSearch"
    @onReset="handleReset"
    @toggleShowMore="toggleShowMore"
    :searching="queryLoading.search"
    :reseting="queryLoading.reset"
    more
  >
    <z-query-form-item label="姓名">
      <a-input
        v-model:value="queryFormData.username"
        placeholder="姓名关键字"
      />
    </z-query-form-item>
    <z-query-form-item label="联系方式">
      <a-input
        v-model:value="queryFormData.phone"
        placeholder="联系方式关键字"
      />
    </z-query-form-item>
    <template #more="{ show }">
      <z-query-form-item v-show="show" label="用户角色">
        <a-select
          mode="multiple"
          :value="queryFormData.roles"
          style="width: 250px"
          :loading="selectorLoading"
          @change="handleChangeSelectRoles"
        >
          <a-select-option
            v-for="role in roles"
            :key="role.role_id"
            :value="role.role_id"
            >{{ role.role_name }}</a-select-option
          >
        </a-select>
      </z-query-form-item>
    </template>
  </z-query-form>

  <div class="table-operator">
    <a-button type="primary"><PlusOutlined />添加</a-button>
    <a-button
      @click="handleRemoveItems"
      :style="{ marginLeft: '24px' }"
      type="danger"
    >
      移除</a-button
    >
  </div>

  <!-- 用户列表 -->
  <a-table
    :columns="columns"
    :data-source="dataSource"
    :pagination="pagination"
    :loading="loading"
    rowKey="user_id"
    size="small"
    @change="handleTableChange"
    :scroll="{ x: 1300 }"
    :row-selection="{
      selectedRowKeys: selectedRowKeys,
      onChange: onSelectChange,
    }"
  >
    <template #avatar="{ text, record }">
      <a-avatar shape="square" :size="48" :src="text">{{
        record.username
      }}</a-avatar>
    </template>
    <template #role="{ record }">
      <a-tag>{{ record["role"]["role_name"] }}</a-tag>
    </template>
    <template #operation="{ record }">
      <a-popconfirm
        title="确认移除该成员？"
        ok-text="是"
        cancel-text="否"
        @confirm="handleRemoveItem(record)"
      >
        <a-button type="link" size="small"> 移除 </a-button>
      </a-popconfirm>
    </template>
  </a-table>
</template>

<script lang="ts">
import { reactive, ref, onBeforeMount, createVNode } from "vue";
import ZQueryForm from "/@/components/QueryForm/index.vue";
import ZQueryFormItem from "/@/components/QueryForm/QueryFormItem.vue";
import { api } from "/@/http/api";
import { useQueryForm, useTable } from "./hooks";
import { ExclamationCircleOutlined, PlusOutlined } from "@ant-design/icons-vue";
import { Modal } from "ant-design-vue";

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
    path: "/users",
    breadcrumbName: "用户管理",
  },
];

export default {
  name: "UserManagement",
  components: {
    ZQueryForm,
    ZQueryFormItem,
    PlusOutlined,
    ExclamationCircleOutlined,
  },
  setup() {
    const roles = ref<Array<any>>([]);
    const {
      queryLoading,
      queryFormData,
      toggleShowMore,
      handleChangeSelectRoles,
    } = useQueryForm();

    const {
      columns,
      dataSource,
      pagination,
      loading,
      handleTableChange,
      selectedRowKeys,
      onSelectChange,
      refresh,
    } = useTable(queryFormData);

    // 获取角色信息
    const getRoles = async () => {
      const res = await api.roleManagement.getRoles();
      roles.value = res.data.data;
    };

    onBeforeMount(async () => {
      await refresh();
      await getRoles();
    });

    // 查询项目
    const handleSearch = (formData) => {
      queryLoading.search = true;
      console.log(formData);
      refresh();
      setTimeout(() => {
        queryLoading.search = false;
      }, 1000);
    };

    // 重置搜索表单数据
    const handleReset = () => {
      queryLoading.reset = true;
      queryFormData.username = "";
      queryFormData.phone = "";
      queryFormData.roles = [];
      console.log(queryFormData);
      refresh(true);
      setTimeout(() => {
        queryLoading.reset = false;
      }, 1000);
    };

    const handleRemoveItems = () => {
      Modal.confirm({
        title: "确定移除选中的成员?",
        icon: createVNode(ExclamationCircleOutlined),
        onOk: async () => {
          console.log(selectedRowKeys.value);
        },
      });
    };

    const handleRemoveItem = (record) => {
      console.log(record);
    };

    return {
      routes,
      queryFormData,
      queryLoading,
      handleSearch,
      handleReset,
      selectedRowKeys,
      onSelectChange,
      toggleShowMore,
      columns,
      dataSource,
      handleTableChange,
      loading,
      pagination,
      roles,
      handleChangeSelectRoles,
      handleRemoveItem,
      handleRemoveItems,
    };
  },
};
</script>

<style></style>
