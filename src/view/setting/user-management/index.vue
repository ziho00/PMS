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
    :title="`编辑用户【${userInfo.user_id}】`"
    width="650px"
    v-model:visible="visible"
    :confirm-loading="confirmLoading"
    @ok="handleSubmit"
  >
    <a-form
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
import { api } from "/@/http/api";
import { useModal, useQueryForm, useTable } from "./hooks";

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
      refresh,
    } = useTable(queryFormData);

    const {
      userInfo,
      visible,
      confirmLoading,
      handleSubmit,
      selectorLoading,
      handleChangeSelector,
    } = useModal(roles);

    // 获取角色信息
    const getRoles = async () => {
      selectorLoading.value = true;
      const res = await api.roleManagement.getRoles();
      roles.value = res.data.data;
      selectorLoading.value = false;
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

    // 点击 Table 编辑按钮
    const handleEdit = async (record) => {
      Object.keys(userInfo).map((key) => {
        userInfo[key] = record[key];
      });
      visible.value = true;
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
      handleChangeSelectRoles,
    };
  },
};
</script>

<style></style>
