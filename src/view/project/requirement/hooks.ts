import { reactive, ref, onBeforeMount, getCurrentInstance } from "vue";
import { useRoute, useRouter } from "vue-router";
import { api } from "/@/http/api";
import moment from "moment";
import router from "/@/router";
const status = [
  {
    label: "待评审",
    key: "0",
  },
  {
    label: "开发确认",
    key: "1",
  },
  {
    label: "开发中",
    key: "2",
  },
  {
    label: "已实现",
    key: "3",
  },
  {
    label: "已关闭",
    key: "4",
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

function useQueryForm() {
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
      dataIndex: "requirement_id",
      key: "requirement_id",
      width: 80,
      fixed: "left",
    },
    {
      title: "标题",
      dataIndex: "title",
      key: "title",
      width: 300,
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
      width: 150,
      ellipsis: true,
      slots: { customRender: "creater" },
    },
    {
      title: "处理人",
      dataIndex: "handler",
      key: "handler",
      width: 150,
      ellipsis: true,
      slots: { customRender: "handler" },
    },
    {
      title: "关联版本",
      dataIndex: "version",
      key: "version",
      width: 100,
      slots: { customRender: "version" },
    },
    {
      title: "预估工时(h)",
      dataIndex: "planWorkload",
      key: "planWorkload",
      width: 200,
    },
    {
      title: "预计开始",
      dataIndex: "planStartDate",
      key: "planStartDate",
      width: 200,
    },
    {
      title: "预计结束",
      dataIndex: "planEndDate",
      key: "planEndDate",
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
    const res = await api.requirement.getRequirements();
    pagination.total = res.data.total;
    console.log(res.data.data);
    dataSource.value = res.data.data;
  };

  const toDetailPage = (record) => {
    const { projectId } = route.params;
    router.push(`/${projectId}/requirement/detail/${record.requirement_id}`);
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

  return {
    versionList,
    versionOptions,
    getVersions,
  };
}

function useForm() {
  const vm = getCurrentInstance();
  const route = useRoute();
  const router = useRouter();

  const title = ref<string>("");
  const requirementInfo = reactive({
    title: "",
    desc: "",
    requirement: null,
    status: "0",
    priority: "0",
    handler: null,
    version_id: "",
    planWorkload: null,
    planStartDate: null,
    planEndDate: null,
  });

  const { projectId } = route.params;
  const { versionOptions } = useVersion(projectId);

  onBeforeMount(async () => {
    const { requirementId } = route.params;
    if (requirementId === "create") {
      title.value = "创建需求";
    } else {
      title.value = `编辑需求【ID:${requirementId}】`;
      const res = await api.requirement.getRequirementById({
        requirement_id: requirementId,
      });
      Object.keys(requirementInfo).map((key) => {
        if (key === "planStartDate" || key === "planEndDate") {
          requirementInfo[key] = moment(res.data[key]);
        } else {
          requirementInfo[key] = res.data[key];
        }
      });
    }
  });

  // 预计开始日期的不可选区域
  const disabledStartDate = (current) => {
    return (
      current &&
      requirementInfo.planEndDate &&
      current > requirementInfo.planEndDate.endOf("day")
    );
  };

  // 预计结束日期的不可选区域
  const disabledEndDate = (current) => {
    return (
      current &&
      requirementInfo.planStartDate &&
      current < requirementInfo.planStartDate.day(0).endOf("day")
    );
  };

  // 确认回调
  const handleConfirm = () => {
    const desc: any = (vm.refs.richEditor as any).content;
    (vm.refs.form as any).validate();
    requirementInfo.desc = desc;
    console.log(requirementInfo);
  };

  // 取消回调
  const handleCancel = () => {
    router.back();
  };

  const rules = {
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
    rules,
    requirementInfo,
    versionOptions,
    disabledStartDate,
    disabledEndDate,
    handleConfirm,
    handleCancel,
  };
}

function useRequirement() {
  const route = useRoute();
  const router = useRouter();
  const { projectId, requirementId } = route.params;
  const title = ref("");
  const requirement = reactive({
    title: "",
    desc: "",
    planStartDate: "",
    planEndDate: "",
    planWorkload: 0,
    priority: 0,
    status: 0,
    requirement_id: "",
    workload: 0,
    handler: null,
    creater: null,
    version_id: "",
    version: "",
    createTime: "",
    updateTime: "",
  });

  const stateOptions = ref([
    {
      key: "0",
      label: "未评审",
    },
    {
      key: "1",
      label: "开发确认",
    },
    {
      key: "2",
      label: "开发中",
    },
    {
      key: "3",
      label: "已实现",
    },
    {
      key: "4",
      label: "已关闭",
    },
  ]);

  onBeforeMount(async () => {
    const res = await api.requirement.getRequirementById({
      requirement_id: requirementId,
    });
    Object.keys(requirement).map((key) => {
      requirement[key] = res.data[key];
    });
    title.value = `【ID：${requirementId}】 ${requirement.title}`;
  });

  const toEdit = () => {
    router.push(`/${projectId}/requirement/edit/${requirementId}`);
  };

  const goBack = () => {
    router.back();
  };
  return {
    title,
    requirement,
    stateOptions,
    toEdit,
    goBack,
  };
}

export { useQueryForm, useTable, useForm, useRequirement };
