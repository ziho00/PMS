import { ref, reactive } from "vue";
import { api } from "/@/http/api";

function useQueryForm() {
  const queryLoading = reactive({ search: false, reset: false });
  const queryFormData = reactive({ name: "" });

  return {
    queryFormData,
    queryLoading,
  };
}

function useTable(queryFormData) {
  const columns = [
    {
      title: "#",
      dataIndex: "version_id",
      key: "version_id",
    },
    {
      title: "版本号",
      dataIndex: "version_num",
      key: "version_num",
    },
    {
      title: "计划开始",
      dataIndex: "planStartDate",
      key: "planStartDate",
    },
    {
      title: "计划结束",
      dataIndex: "planEndDate",
      key: "planEndDate",
    },
    {
      title: "操作",
      dataIndex: "operation",
      slots: { customRender: "operation" },
    },
  ];
  const dataSource = ref<Array<any>>([]);
  const selectedRowKeys = ref<Array<any>>([]);
  const loading = ref<boolean>(false);
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

  const handleTableChange = (pager) => {
    pagination.current = pager.current;
    pagination.pageSize = pager.pageSize;
    refresh();
  };

  const refresh = async (isToFirstPage?: boolean) => {
    console.log(queryFormData, pagination);
    if (isToFirstPage) {
      pagination.current = 1;
    }
    const res = await api.version.getVersions();
    dataSource.value = res.data.data;
  };

  return {
    columns,
    dataSource,
    loading,
    pagination,
    selectedRowKeys,
    onSelectChange,
    handleTableChange,
    refresh,
  };
}

function useModal() {
  const visible = ref<boolean>(false);
  const confirmLoading = ref<boolean>(false);
  const isEdit = ref<boolean>(false);
  const selectorLoading = ref<boolean>(false);
  const version = reactive({
    version_id: "",
    version_num: "",
    desc: "",
    planDate: [],
  });

  // 提交编辑
  const handleSubmit = () => {
    console.log(version);
    if (isEdit) {
      // todo...
    } else {
      // todo...
    }
  };

  return {
    visible,
    confirmLoading,
    selectorLoading,
    version,
    isEdit,
    handleSubmit,
  };
}

function useForm() {
  const rules = {
    version_num: [
      {
        required: true,
        message: "请输入版本号",
        trigger: "blur",
      },
      {
        min: 1,
        max: 32,
        message: "长度应在 1 到 32 之间",
        trigger: "blur",
      },
    ],
  };
  return {
    rules,
  };
}

export { useForm, useModal, useTable, useQueryForm };
