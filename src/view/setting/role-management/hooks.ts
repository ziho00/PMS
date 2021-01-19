import { reactive, ref } from "vue";
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
      dataIndex: "role_id",
      key: "role_id",
    },
    {
      title: "角色名称",
      dataIndex: "role_name",
      key: "role_name",
    },
    {
      title: "创建时间",
      dataIndex: "createTime",
      key: "createTime",
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
    const res = await api.roleManagement.getRoles();
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
  const role = reactive({
    role_id: "",
    name: "",
    promission: [],
  });

  // 提交编辑
  const handleSubmit = () => {
    console.log(role);
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
    role,
    isEdit,
    handleSubmit,
  };
}

function useForm() {
  const rules = {
    role_name: [
      {
        required: true,
        message: "请输入角色名称",
        trigger: "blur",
      },
      {
        min: 3,
        max: 32,
        message: "长度应在 3 到 32 之间",
        trigger: "blur",
      },
    ],
  };
  return {
    rules,
  };
}

export { useModal, useQueryForm, useTable, useForm };
