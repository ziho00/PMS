<template>
  <a-page-header
    style="border: 1px solid rgb(235, 237, 240)"
    title="用户管理"
    :breadcrumb="{ routes }"
  />

  <a-card class="page-card">
    <z-query-form
      :model="queryFormData"
      @onSearch="handleSearch"
      @onReset="handleReset"
      @toggleShowMore="toggleShowMore"
      :searching="queryLoading.search"
      :reseting="queryLoading.reset"
      more
    >
      <z-query-form-item label="用户名">
        <a-input v-model:value="queryFormData.username" placeholder="用户名" />
      </z-query-form-item>
      <z-query-form-item label="手机号码">
        <a-input v-model:value="queryFormData.phone" placeholder="手机号码" />
      </z-query-form-item>
      <template #more="{ show }">
        <z-query-form-item v-show="show" label="用户角色">
          <a-input v-model:value="queryFormData.phone" placeholder="手机号码" />
        </z-query-form-item>
      </template>
    </z-query-form>

    <div class="table-operator"></div>

    <!-- 用户列表 -->
    <a-table
      :columns="columns"
      :data-source="dataSource"
      :pagination="pagination"
      :loading="loading"
      rowKey="user_id"
      @change="handleTableChange"
      :scroll="{ x: 1300 }"
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
        <a-button type="link" @click="handleEdit(record)">编辑</a-button>
      </template>
    </a-table>
  </a-card>

  <!-- 编辑用户信息 Modal -->
  <a-modal
    :title="`编辑用户【${userInfo.username}】`"
    width="650px"
    v-model:visible="visible"
    :confirm-loading="confirmLoading"
    @ok="handleSubmit"
    ><a-form
      ref="userForm"
      :model="userInfo"
      :label-col="{ span: 5 }"
      :wrapper-col="{ span: 16 }"
    >
      <a-form-item label="头像" name="avatar">
        <a-avatar
          :style="{ marginLeft: '15px' }"
          shape="square"
          :size="64"
          :src="userInfo.avatarUrl"
        >
          {{ userInfo.username }}
        </a-avatar>
      </a-form-item>
      <a-form-item label="ID" name="user_id">
        <a-input v-model:value="userInfo.user_id" disabled />
      </a-form-item>
      <a-form-item label="姓名" name="username">
        <a-input v-model:value="userInfo.username" disabled />
      </a-form-item>
      <a-form-item label="手机号码" name="phone">
        <a-input v-model:value="userInfo.phone" disabled />
      </a-form-item>
      <a-form-item label="邮箱地址" name="email">
        <a-input v-model:value="userInfo.email" disabled />
      </a-form-item>
      <a-form-item label="岗位/角色" name="role">
        <a-select
          :value="userInfo.role.role_id"
          style="width: 250px"
          :loading="selectorLoading"
          @change="handleChangeSelector"
        >
          <a-select-option
            v-for="role in roles"
            :key="role.role_id"
            :value="role.role_id"
            >{{ role.role_name }}</a-select-option
          >
        </a-select>
      </a-form-item>
    </a-form>
  </a-modal>
</template>

<script lang="ts">
import { reactive, ref, onBeforeMount } from "vue";
import ZQueryForm from "/@/components/QueryForm/index.vue";
import ZQueryFormItem from "/@/components/QueryForm/QueryFormItem.vue";
import { PlusOutlined } from "@ant-design/icons-vue";
import { api } from "/@/http/api";
import user from "/@/store/modules/user";
import { useModal, useQueryForm, useTable } from "./hook";

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
  },
  setup() {
    const {
      queryLoading,
      queryFormData,
      handleSearch,
      handleReset,
      toggleShowMore,
    } = useQueryForm();

    const {
      columns,
      dataSource,
      pagination,
      loading,
      handleTableChange,
    } = useTable(queryFormData);

    const {
      roles,
      getRoles,
      userInfo,
      visible,
      confirmLoading,
      handleSubmit,
      selectorLoading,
      handleChangeSelector,
    } = useModal();

    onBeforeMount(() => {
      getUsers();
    });

    // 获取用户列表信息
    const getUsers = async () => {
      const res = await api.userManagement.getUsers();
      pagination.total = res.data.total;
      dataSource.value = res.data.data;
      console.log(dataSource.value);
    };

    // 点击 Table 编辑按钮
    const handleEdit = async (record) => {
      Object.keys(userInfo).map((key) => {
        userInfo[key] = record[key];
      });
      visible.value = true;
      await getRoles();
    };

    return {
      routes,
      queryFormData,
      queryLoading,
      handleSearch,
      handleReset,
      toggleShowMore,
      columns,
      dataSource,
      handleTableChange,
      loading,
      pagination,
      userInfo,
      handleSubmit,
      handleEdit,
      visible,
      confirmLoading,
      roles,
      selectorLoading,
      handleChangeSelector,
    };
  },
};
</script>

<style></style>
