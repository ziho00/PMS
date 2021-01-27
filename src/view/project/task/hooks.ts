import { reactive, ref } from "vue";
import { api } from "/@/http/api";

function useQueryForm() {
  const status = [
    {
      label: "未开始",
      key: 0,
    },
    {
      label: "进行中",
      key: 1,
    },
    {
      label: "已关闭",
      key: 2,
    },
    {
      label: "已结束",
      key: 3,
    },
  ];

  const priority = [
    {
      label: "低",
      key: 0,
    },
    {
      label: "中",
      key: 1,
    },
    {
      label: "高",
      key: 2,
    },
    {
      label: "紧急",
      key: 3,
    },
  ];

  const queryLoading = reactive({ search: false, reset: false });
  const queryFormData = reactive({
    title: "",
    handler: "",
    status: [],
    priority: [],
  });
  // 切换 queryForm 的展开/收拾状态
  const toggleShowMore = (show: boolean) => {
    if (!show) {
      queryFormData.status = [];
      queryFormData.priority = [];
    }
  };

  const handleChangeSelectStauts = (value) => {
    queryFormData.status = value;
  };

  const handleChangeSelectPriority = (value) => {
    queryFormData.priority = value;
  };

  return {
    status,
    priority,
    queryLoading,
    queryFormData,
    toggleShowMore,
    handleChangeSelectStauts,
    handleChangeSelectPriority,
  };
}

function useTable(queryFormData) {
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
    {
      title: "操作",
      dataIndex: "operation",
      key: "operation",
      slots: { customRender: "operation" },
    },
  ];
  const loading = ref<boolean>(false);
  const dataSource = ref<Array<any>>([]);
  const selectedRowKeys = ref<Array<any>>([]);
  const pagination = reactive({
    current: 1,
    pageSize: 10,
    defaultPageSize: 10,
    total: 0,
    showSizeChanger: true,
  });

  const onSelectChange = (selected) => {
    selectedRowKeys.value = selected;
  };

  // 页码器变更
  const handleTableChange = (pager) => {
    pagination.current = pager.current;
    pagination.pageSize = pager.pageSize;
    refresh();
  };

  // 刷新 Table
  const refresh = async (isToFirstPage?: boolean) => {
    console.log(queryFormData, pagination);
    if (isToFirstPage) {
      pagination.current = 1;
    }
    const res = await api.task.getTasks();
    pagination.total = res.data.total;
    console.log(res.data.data);
    dataSource.value = res.data.data;
  };

  const toDetailPage = (record) => {
    console.log(record);
  };

  return {
    loading,
    dataSource,
    pagination,
    handleTableChange,
    selectedRowKeys,
    onSelectChange,
    refresh,
    columns,
    toDetailPage,
  };
}

export { useQueryForm, useTable };
