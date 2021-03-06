import { reactive, ref, onBeforeMount, getCurrentInstance, VNode } from "vue";
import { api } from "/@/http/api";
import { useRoute, useRouter } from "vue-router";
import moment from "moment";
import router from "/@/router";

// Table.vue query state & handler
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

// Table.vue table state & handler
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
  const route = useRoute();
  const router = useRouter();
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
    const { projectId } = route.params;
    router.push(`/${projectId}/task/detail/${record.task_id}`);
  };

  // 编辑
  const handleEdit = (record) => {
    const { projectId } = route.params;
    router.push(`/${projectId}/task/edit/${record.task_id}`);
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
    handleEdit,
  };
}

// Edit.vue State & handler
function useForm() {
  const status = [
    {
      label: "未开始",
      key: "0",
    },
    {
      label: "进行中",
      key: "1",
    },
    {
      label: "已关闭",
      key: "2",
    },
    {
      label: "已结束",
      key: "3",
    },
  ];

  const priority = [
    {
      label: "低",
      key: "0",
    },
    {
      label: "中",
      key: "1",
    },
    {
      label: "高",
      key: "2",
    },
    {
      label: "紧急",
      key: "3",
    },
  ];

  const vm = getCurrentInstance();
  const route = useRoute();
  const router = useRouter();

  const title = ref<string>("");
  const taskInfo = reactive({
    title: "",
    desc: "",
    requirement: null,
    status: "0",
    priority: "0",
    planWorkload: null,
    planStartDate: null,
    planEndDate: null,
    handler: null,
  });

  onBeforeMount(async () => {
    const { taskId } = route.params;
    if (taskId === "create") {
      title.value = "创建任务";
    } else {
      title.value = `编辑任务【ID:${taskId}】`;
      const res = await api.task.getTaskById({ task_id: taskId });
      Object.keys(taskInfo).map((key) => {
        if (key === "planStartDate" || key === "planEndDate") {
          taskInfo[key] = moment(res.data[key]);
        } else {
          taskInfo[key] = res.data[key];
        }
      });
      console.log(taskInfo.desc);
    }
  });

  // 确认回调
  const handleConfirm = () => {
    const desc: any = (vm.refs.richEditor as any).content;
    (vm.refs.form as any).validate();
    taskInfo.desc = desc;
    console.log(taskInfo);
  };

  // 取消回调
  const handleCancel = () => {
    router.back();
  };

  // 预计开始日期的不可选区域
  const disabledStartDate = (current) => {
    return (
      current &&
      taskInfo.planEndDate &&
      current > taskInfo.planEndDate.endOf("day")
    );
  };

  // 预计结束日期的不可选区域
  const disabledEndDate = (current) => {
    return (
      current &&
      taskInfo.planStartDate &&
      current < taskInfo.planStartDate.day(0).endOf("day")
    );
  };

  const rules = {
    planWorkload: [
      {
        required: true,
        message: "请填写预计花费工时",
        trigger: "blur",
        type: "number",
      },
    ],
    handler: [
      {
        required: true,
        message: "请选择处理人",
        trigger: "change",
        type: "object",
      },
    ],
    planStartDate: [
      {
        required: true,
        message: "请选择计划开始日期",
        trigger: "change",
        type: "object",
      },
    ],
    planEndDate: [
      {
        required: true,
        message: "请选择计划结束日期",
        trigger: "change",
        type: "object",
      },
    ],
  };

  return {
    status,
    priority,
    title,
    taskInfo,
    rules,
    handleCancel,
    handleConfirm,
    disabledStartDate,
    disabledEndDate,
  };
}

function useTask() {
  const route = useRoute();
  const router = useRouter();
  const { projectId, taskId } = route.params;
  const title = ref("");
  const taskInfo = reactive({
    requierment: null,
    title: "",
    desc: "",
    planStartDate: "",
    planEndDate: "",
    planWorkload: 0,
    priority: 0,
    status: 0,
    task_id: "",
    workload: 0,
    handler: null,
  });

  onBeforeMount(async () => {
    const res = await api.task.getTaskById({ task_id: taskId });
    console.log(res);
    Object.keys(taskInfo).map((key) => {
      taskInfo[key] = res.data[key];
    });
    title.value = `【ID：${taskInfo.task_id}】 ${taskInfo.title}`;
  });

  const toEdit = () => {
    router.push(`/${projectId}/task/edit/${taskId}`);
  };

  const goBack = () => {
    router.back();
  };

  return {
    title,
    taskInfo,
    toEdit,
    goBack,
  };
}

function useWrokload() {
  const dataSource = ref([]);
  const isEdit = ref(false);
  const visible = ref(false);
  const workloadInfo = reactive({
    workload_id: "",
    desc: "",
    workload: 0,
  });

  onBeforeMount(async () => {
    const res = await api.task.getWorkloadRecords();
    dataSource.value = res.data;
  });

  const handleAdd = () => {
    isEdit.value = false;
    visible.value = true;
  };

  const handleEdit = (record) => {
    visible.value = true;
    isEdit.value = true;
    Object.keys(workloadInfo).map((key) => {
      workloadInfo[key] = record[key];
    });
  };

  const handleDelete = (record) => {
    console.log(record);
  };
  return {
    isEdit,
    visible,
    dataSource,
    handleAdd,
    handleEdit,
    handleDelete,
    workloadInfo,
  };
}

export { useQueryForm, useTable, useForm, useTask, useWrokload };
