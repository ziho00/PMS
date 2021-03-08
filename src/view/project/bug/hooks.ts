import { reactive, ref, onBeforeMount } from "vue";
import { api } from "/@/http/api";

function useQueryForm() {
  const status = [
    {
      label: "开发确认",
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
      label: "已修复",
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
      dataIndex: "bug_id",
      key: "bug_id",
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
      title: "创建人",
      dataIndex: "creater",
      key: "creater",
      slots: { customRender: "creater" },
    },
    {
      title: "处理人",
      dataIndex: "handler",
      key: "handler",
      slots: { customRender: "handler" },
    },
    {
      title: "发现版本",
      dataIndex: "version",
      key: "version",
      slots: { customRender: "version" },
    },
    {
      title: "功能模块",
      dataIndex: "module",
      key: "module",
    },
    {
      title: "更新时间",
      dataIndex: "updateTime",
      key: "updateTime",
      width: 200,
    },
    {
      title: "操作",
      dataIndex: "operation",
      key: "operation",
      slots: { customRender: "operation" },
      width: 150,
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
    const res = await api.bug.getBugs();
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

function useVersion(projectId) {
  const versionList = ref<object[]>([]);
  const versionOptions = ref<object[]>([]);
  onBeforeMount(() => {
    getVersions();
  });

  const getVersions = async () => {
    const res = await api.version.getVersions();
    versionList.value = res.data.data;
    versionOptions.value = res.data.data.map((version) => ({
      label: version.version_num,
      key: version.version_id,
    }));
  };

  return { versionList, versionOptions, getVersions };
}

export { useQueryForm, useTable, useVersion };
