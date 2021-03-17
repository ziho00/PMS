<template>
  <a-card class="page-card">
    <!-- query form -->
    <z-query-form
      :model="queryFormData"
      @onSearch="handleSearch"
      @onReset="handleReset"
      @toggleShowMore="toggleShowMore"
      :searching="queryLoading.search"
      :reseting="queryLoading.reset"
      more
    >
      <z-query-form-item label="标题">
        <a-input
          v-model:value="queryFormData.title"
          placeholder="需求标题关键字"
        />
      </z-query-form-item>
      <z-query-form-item label="处理人">
        <a-input
          v-model:value="queryFormData.handler"
          placeholder="处理人姓名"
        />
      </z-query-form-item>
      <template #more="{ show }">
        <z-query-form-item v-show="show" label="状态">
          <a-select
            mode="multiple"
            :value="queryFormData.status"
            style="width: 250px"
            @change="handleChangeSelectStauts"
          >
            <a-select-option
              v-for="item in status"
              :key="item.key"
              :value="item.key"
              >{{ item.label }}</a-select-option
            >
          </a-select>
        </z-query-form-item>
        <z-query-form-item v-show="show" label="优先级">
          <a-select
            mode="multiple"
            :value="queryFormData.priority"
            style="width: 250px"
            @change="handleChangeSelectPriority"
          >
            <a-select-option
              v-for="item in priority"
              :key="item.key"
              :value="item.key"
              >{{ item.label }}</a-select-option
            >
          </a-select>
        </z-query-form-item>
      </template>
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
      size="small"
      rowKey="requirement_id"
      @change="handleTableChange"
      :row-selection="{
        selectedRowKeys: selectedRowKeys,
        onChange: onSelectChange,
      }"
      :scroll="{ x: 1500 }"
    >
      <template #title="{ text, record }">
        <a :title="text" @click="toDetailPage(record)">{{ text }}</a>
      </template>
      <template #status="{ text }">
        <StateTag mode="requirement" :value="text" />
      </template>
      <template #priority="{ text }">
        <PriorityTag mode="requirement" :value="text" />
      </template>
      <template #handler="{ text }">
        {{ text?.username }}
      </template>
      <template #creater="{ text }">
        {{ text?.username }}
      </template>
      <template #version="{ text }">
        <Tag>
          {{ text?.version_num }}
        </Tag>
      </template>
      <template #operation="{ record }">
        <a-button type="link" size="small" @click="handleEdit(record)"
          >编辑</a-button
        >
        <span style="color: var(--remark-color)">|</span>
        <a-dropdown>
          <a-button type="link" size="small">更多<DownOutlined /></a-button>
          <template #overlay>
            <a-menu>
              <a-menu-item>
                <a href="javascript:;" @click="toDetailPage(record)">详情</a>
              </a-menu-item>
              <a-menu-item>
                <a href="javascript:;" @click="handleDeleteItem(record)"
                  >删除</a
                >
              </a-menu-item>
            </a-menu>
          </template>
        </a-dropdown>
      </template>
    </a-table>
  </a-card>
</template>

<script lang="ts">
import { createVNode, onBeforeMount } from "vue";
import { useRouter, useRoute } from "vue-router";
import ZQueryForm from "/@/components/QueryForm/index.vue";
import ZQueryFormItem from "/@/components/QueryForm/QueryFormItem.vue";
import StateTag from "/@/components/StateTag/index.vue";
import PriorityTag from "/@/components/PriorityTag/index.vue";
import { useQueryForm, useTable } from "./hooks";
import {
  ExclamationCircleOutlined,
  PlusOutlined,
  DownOutlined,
} from "@ant-design/icons-vue";
import { Modal, Tag } from "ant-design-vue";

export default {
  name: "task",
  components: {
    ZQueryForm,
    ZQueryFormItem,
    ExclamationCircleOutlined,
    PlusOutlined,
    StateTag,
    PriorityTag,
    DownOutlined,
    Tag,
  },
  setup() {
    const router = useRouter();
    const route = useRoute();

    const {
      status,
      priority,
      queryLoading,
      queryFormData,
      toggleShowMore,
      handleChangeSelectStauts,
      handleChangeSelectPriority,
    } = useQueryForm();

    const {
      loading,
      dataSource,
      pagination,
      handleTableChange,
      selectedRowKeys,
      onSelectChange,
      refresh,
      columns,
      toDetailPage,
    } = useTable(queryFormData);

    onBeforeMount(() => {
      refresh();
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
      queryFormData.title = "";
      queryFormData.handler = "";
      queryFormData.status = [];
      queryFormData.priority = [];
      console.log(queryFormData);
      refresh(true);
      setTimeout(() => {
        queryLoading.reset = false;
      }, 1000);
    };

    // 创建
    const handleCreateItem = () => {
      const { projectId } = route.params;
      router.push(`/${projectId}/requirement/edit/create`);
    };

    // 编辑
    const handleEdit = (record) => {
      const { projectId } = route.params;
      router.push(`/${projectId}/requirement/edit/${record.requirement_id}`);
    };

    // 删除
    const handleDeleteItem = (record) => {
      Modal.confirm({
        title: `确定删除需求【ID:${record.requirement_id}】?`,
        icon: createVNode(ExclamationCircleOutlined),
        onOk: async () => {
          console.log(record);
        },
      });
    };

    // 批量删除
    const handleDeleteItems = () => {
      Modal.confirm({
        title: "确定删除选中的缺陷?",
        icon: createVNode(ExclamationCircleOutlined),
        onOk: async () => {
          console.log(selectedRowKeys.value);
        },
      });
    };

    return {
      status,
      priority,
      queryLoading,
      queryFormData,
      toggleShowMore,
      handleChangeSelectStauts,
      handleChangeSelectPriority,
      loading,
      dataSource,
      pagination,
      handleTableChange,
      selectedRowKeys,
      onSelectChange,
      refresh,
      columns,
      toDetailPage,
      handleSearch,
      handleReset,
      handleCreateItem,
      handleEdit,
      handleDeleteItem,
      handleDeleteItems,
    };
  },
};
</script>

<style lang="scss" scoped></style>
