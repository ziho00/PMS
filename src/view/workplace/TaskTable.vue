<template>
  <a-table
    :columns="columns"
    :data-source="dataSource"
    :pagination="pagination"
    :loading="loading"
    size="small"
    rowKey="task_id"
    @change="handleTableChange"
    :scroll="{ x: 1300 }"
  >
    <template #title="{ text, record }">
      <a :title="text" @click="toDetailPage(record)">{{ text }}</a>
    </template>
    <template #status="{ text }">
      <StateTag mode="task" :value="text" />
    </template>
    <template #priority="{ text }">
      <PriorityTag mode="task" :value="text" />
    </template>
    <template #handler="{ text }">
      {{ text?.username }}
    </template>
  </a-table>
</template>

<script lang="ts">
import { reactive, ref, onBeforeMount, getCurrentInstance, watch } from "vue";
import { api } from "/@/http/api";
import PriorityTag from "/@/components/PriorityTag/index.vue";
import StateTag from "/@/components/StateTag/index.vue";

const columns = [
  {
    title: "ID",
    dataIndex: "task_id",
    key: "task_id",
    width: 80,
    fixed: "left",
  },
  {
    title: "标题",
    dataIndex: "title",
    key: "title",
    width: 350,
    slots: { customRender: "title" },
    fixed: "left",
    ellipsis: true,
  },
  {
    title: "状态",
    dataIndex: "status",
    key: "status",
    slots: { customRender: "status" },
    width: 100,
  },
  {
    title: "优先级",
    dataIndex: "priority",
    slots: { customRender: "priority" },
    key: "priority",
    width: 100,
  },
  {
    title: "处理人",
    dataIndex: "handler",
    key: "handler",
    slots: { customRender: "handler" },
  },
  {
    title: "预估工时",
    dataIndex: "planWorkload",
    key: "planWorkload",
    width: 100,
  },
  {
    title: "花费",
    dataIndex: "workload",
    key: "workload",
    width: 100,
  },
  {
    title: "预计开始",
    dataIndex: "planStartDate",
    key: "planStartDate",
    ellipsis: true,
  },
  {
    title: "预计结束",
    dataIndex: "planEndDate",
    key: "planEndDate",
    ellipsis: true,
  },
];

export default {
  name: "TasksTable",
  components: {
    PriorityTag,
    StateTag,
  },
  props: {
    activeTabKey: {
      type: String,
    },
  },
  setup(props) {
    const vm = getCurrentInstance();

    const loading = ref<boolean>(false);
    const dataSource = ref<Array<any>>([]);
    const pagination = reactive({
      current: 1,
      pageSize: 10,
      defaultPageSize: 10,
      total: 0,
      showSizeChanger: true,
    });

    onBeforeMount(async () => {
      await toggleGetTodoData();
    });

    watch(
      () => props.activeTabKey,
      (newVal) => {
        pagination.current = 1;
        toggleGetTodoData();
      }
    );

    // 点击标题触发
    const toDetailPage = (record) => {
      console.log(record);
    };

    // 获取 代办/已办/创建 任务列表
    const toggleGetTodoData = async () => {
      loading.value = true;
      await {
        my_todo: async () => {
          const todoRes = await api.workplace.getTasks();
          dataSource.value = todoRes.data.data;
          pagination.total = todoRes.data.total;
        },
        my_done: async () => {
          const todoRes = await api.workplace.getTasks();
          dataSource.value = todoRes.data.data;
          pagination.total = todoRes.data.total;
        },
        my_created: async () => {
          const todoRes = await api.workplace.getTasks();
          dataSource.value = todoRes.data.data;
        },
      }[props.activeTabKey]();
      loading.value = false;
    };

    // 页码器变更
    const handleTableChange = (pager, filters, sorter) => {
      pagination.current = pager.current;
      pagination.pageSize = pager.pageSize;
      console.log(pagination);
      toggleGetTodoData();
    };

    return {
      columns,
      loading,
      dataSource,
      pagination,
      toDetailPage,
      toggleGetTodoData,
      handleTableChange,
    };
  },
};
</script>

<style></style>
